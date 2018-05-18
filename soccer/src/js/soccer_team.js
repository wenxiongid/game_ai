import Vector2D, {
	vec2DDistanceSq,
	vec2dNormalize
} from './common/2d/vector2d';
import StateMachine from './common/fsm/state_machine';
import {
	Attacking,
	Defending,
	PrepareForKickOff
} from './team_state';
import {
	MaxFloat,
	randInRange,
	randInt
} from './common/misc/utils';
import SupportSpotCalculator from './support_spot_calculator';
import PRM from './params';
import {
	getTangentPoints
} from './common/2d/geometry';
import {
	pointToLocalSpace
} from './common/2d/transformations';
import dispatcher from './common/messaging/message_dispatcher';
import MessageType from './soccer_messages';
import {
	GlobalKeeperState,
	TendGoal,
	InterceptBall,
	ReturnHome,
	PutBallBackInPlay
} from './goalkeeper_state';

const TEAM_COLOR = {
	blue: 'BLUE',
	red: 'RED'
};

class SoccerTeam{
	constructor(homeGoal, opponentsGoal, pitch, color) {
		this.m_Color = color;
		this.m_pPitch = pitch;
		this.m_pOpponentsGoal = opponentsGoal;
		this.m_pHomeGoal = homeGoal;
		this.m_pOpponents = null;
		this.m_pControllingPlayer = null;
		this.m_pSupportingPlayer = null;
		this.m_pReceivingPlayer = null;
		this.m_pPlayerClosestToBall = null;
		this.m_dDistSqToBallOfClosestPlayer = 0;
		this.m_pStateMachine = new StateMachine(this);
		this.m_pStateMachine.setCurrentState(Defending);
		this.m_pStateMachine.setPreviousState(Defending);
		this.m_pStateMachine.setGlobalState(null);
		this.createPlayers();
		for(let i = 0; i < this.m_Players.length; i++){
			let it = this.m_Players[i];
			it.steering().separationOn();
		}
		this.m_pSupportSpotCalc = new SupportSpotCalculator(PRM.NumSupportSpotsX, PRM.NumSupportSpotsY, this);
	}
	createPlayers(){
		if(this.teamColor() == TEAM_COLOR.blue){
			this.m_Players.push(new GoalKeeper(this,
				1,
				TendGoal,
				new Vector2D(0, 1),
				new Vector2D(0, 0),
				PRM.PlayerMass,
				PRM.PlayerMaxForce,
				PRM.PlayerMaxSpeedWithoutBall,
				PRM.PlayerMaxTurnRate,
				PRM.PlayerScale
			));
			this.m_Players.push(new FieldPlayer(this,
				6,
				Wait
			));
		}
	}
	calculateClosestPlayerToBall(){
		let closestSoFar = MaxFloat;
		for(let i = 0; i < this.m_Players.length; i++){
			let it = this.m_Players[i];
			let dist = vec2DDistanceSq(it.pos(), this.pitch().ball().pos());
			it.setDistSqToBall(dist);
			if(dist < closestSoFar){
				closestSoFar = dist;
				this.m_pPlayerClosestToBall = it;
			}
		}
		this.m_dDistSqToBallOfClosestPlayer = closestSoFar;
	}
	render(){
		for(let i = 0; i < this.m_Players.length; i++){
			this.m_Players[i].render();
		}
		if(PRM.bShowControllingTeam){
			gdi.textColor(gdi.WHITE);
			if(this.teamColor() == TEAM_COLOR.blue && this.inControl()){
				gdi.textAtPos(20, 3, 'Blue in Control');
			}else if(this.teamColor() == TEAM_COLOR.red && this.inControl()){
				gdi.textAtPos(20, 3, 'Red in Control');
			}
			if(this.m_pControllingPlayer != null){
				gdi.textAtPos(this.pitch().cxClient() - 150, 3, `Controlling Player: this.m_pControllingPlayer.id()`);
			}
		}
		if(PRM.bSupportSpots && this.inControl()){
			this.m_pSupportSpotCalc.render();
		}
	}
	update(){
		this.calculateClosestPlayerToBall();
		this.m_pStateMachine.update();
		for(let i = 0; i < this.m_Players.length; i++){
			this.m_Players[i].update();
		}
	}
	returnAllFieldPlayersToHome(){
		for(let i = 0; i < this.m_Players.length; i++){
			let it = this.m_Players[i];
			if(it.role() != PLAYERBASE.goalKeeper){
				dispatcher.dispatchMessage(0, 1, it.id(), MessageType.Msg_GoHome, null);
			}
		}
	}
	canShoot(ballPos, power){
		let shotTarget = new Vector2D();
		let numAttempts = PRM.NumAttemptsToFindValidStrike;
		while(numAttempts--){
			shotTarget = this.opponentsGoal().center();
			let minYVal = this.opponentsGoal().leftPost().y + this.pitch().ball().bRadius();
			let maxYVal = this.opponentsGoal().rightPost().y - this.pitch().ball().bRadius();
			shotTarget.y = randInt(minYVal, maxYVal);
			let time = this.pitch().ball().timeToCoverDistance(ballPos, shotTarget, power);
			if(time >= 0){
				if(isPassSafeFromAllOpponents(ballPos, shotTarget, null, power)){
					return true;
				}
			}
		}
		return false;
	}
	findPass(passer, power, minPassingDistance){
		let receiver = null;
		let result = false;
		let closestToGoalSoFar = MaxFloat;
		let target = null;
		for(let i = 0; i < this.members().length; i++){
			let curPlayer = this.members()[i];
			if(curPlayer != passer && vec2DDistanceSq(passer.pos(), curPlayer.pos()) > minPassingDistance * minPassingDistance){
				let passInfo = this.getBestPassToReceiver(passer, curPlayer, power);
				if(passInfo.result){
					let dist2Goal = Math.abs(target.x - this.opponentsGoal().center().x);
					if(dist2Goal < closestToGoalSoFar){
						closestToGoalSoFar = dist2Goal;
						receiver = curPlayer;
						target = passInfo.passTarget;
						result = true;
					}
				}
			}
		}
		return {
			result,
			target,
			receiver
		};
	}
	getBestPassToReceiver(passer, receiver, power){
		let time = this.pitch().ball().timeToCoverDistance(this.pitch().ball().pos(), receiver.pos(), power);
		if(time < 0){
			return false;
		}
		let interceptRange = time * receiver.maxSpeed();
		const ScalingFactor = 0.3;
		interceptRange *= ScalingFactor;
		let ip1 = new Vector2D();
		let ip2 = new Vector2D();
		getTangentPoints(receiver.pos(), interceptRange, this.pitch().ball().pos(), ip1, ip2);
		const NumPassesToTry = 3;
		let passes = [ip1, receiver.pos(), ip2];
		let closestSoFar = MaxFloat;
		let bResult = false;
		let passTarget = null;
		for(let pass = 0; pass < NumPassesToTry; pass++){
			let dist = Math.abs(passes[pass].x - this.opponentsGoal().center().x);
			if(dist < closestSoFar &&
				this.pitch().playingArea().inside(passes[pass]) &&
				this.isPassSafeFromAllOpponents(this.pitch().ball().pos(), passes[pass], receiver, power)
			){
				closestSoFar = dist;
				passTarget = passes[pass];
				bResult = true;
			}
		}
		return {
			passTarget,
			result: bResult
		};
	}
	isPassSafeFromOpponent(from, target, receiver, opp, passingForce){
		let toTarget = target.add(from.getReverse());
		let toTargetNormalized = vec2dNormalize(toTarget);
		let localPosOpp = pointToLocalSpace(opp.pos(), toTargetNormalized, toTargetNormalized.perp(), from);
		if(localPosOpp.x < 0){
			return true;
		}
		if(vec2DDistanceSq(from , target) < vec2DDistanceSq(opp.pos(), from)){
			if(receiver){
				if(vec2DDistanceSq(target, opp.pos()) > vec2DDistanceSq(target, receiver.pos())){
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		}
		let timeForBall = this.pitch().ball().timeToCoverDistance(new Vector2D(), new Vector2D(localPosOpp.x, 0), passingForce);
		let reach = opp.maxSpeed() * timeForBall + this.pitch().ball().bRadius() + opp.bRadius();
		if(Math.abs(localPosOpp.y) < reach){
			return false;
		}
		return true;
	}
	isPassSafeFromAllOpponents(from, target, receiver, passingForce){
		for(let i = 0; i < this.opponents().members().length; i++){
			if(!this.isPassSafeFromOpponent(from, target, receiver, this.opponents().members()[i], passingForce)){
				return false;
			}
		}
		return true;
	}
	isOpponentWithinRadius(pos, rad){}
	requestPass(requester){}
	determineBestSupportingAttacker(){
		let closestSoFar = MaxFloat;
		let bestPlayer = null;
		for(let i = 0; i < this.m_Players.length; i++){
			let it = this.m_Players[i];
			if(it.role() == PLAYERBASE.attacker && it != this.m_pControllingPlayer){
				let dist = vec2DDistanceSq(it.pos(), this.m_pSupportSpotCalc.getBestSupportingSpot());
				if(dist < closestSoFar){
					closestSoFar = dist;
					bestPlayer = it;
				}
			}
		}
		return bestPlayer;
	}
	members(){
		return this.m_Players;
	}
	getFSM(){
		return this.m_pStateMachine;
	}
	homeGoal(){
		return this.m_pHomeGoal;
	}
	opponentsGoal(){
		return this.m_pOpponentsGoal;
	}
	pitch(){
		return this.m_pPitch;
	}
	opponents(){
		return this.m_pOpponents;
	}
	setOpponents(opps){
		this.m_pOpponents = opps;
	}
	teamColor(){
		return this.m_Color;
	}
	setPlayerClosestToBall(player){
		this.m_pPlayerClosestToBall = player;
	}
	playerClosestToBall(){
		return this.m_pPlayerClosestToBall;
	}
	closestDistToBallSq(){
		return this.m_dDistSqToBallOfClosestPlayer;
	}
	getSupportSpot(){
		return this.m_pSupportSpotCalc.getBestSupportingSpot();
	}
	supportingPlayer(){
		return this.m_pSupportingPlayer;
	}
	setSupportingPlayer(player){
		this.m_pSupportingPlayer = player;
	}
	receiver(){
		return this.m_pReceivingPlayer;
	}
	setReceiver(player){
		this.m_pReceivingPlayer = player;
	}
	controllingPlayer(){
		return this.m_pControllingPlayer;
	}
	setControllingPlayer(player){
		this.m_pControllingPlayer = player;
		this.opponents().lostControl();
	}
	inControl(){
		if(this.m_pControllingPlayer){
			return true;
		}else{
			return false;
		}
	}
	lostControl(){
		this.m_pControllingPlayer = null;
	}
	getPlayerFromID(id){}
	setPlayerHomeRegion(player, region){}
	determineBestSupportingPosition(){
		this.m_pSupportSpotCalc.determineBestSupportingPosition();
	}
	updateTargetsOfWaitingPlayers(){}
	allPlayersAtHome(){}
	name(){
		if(this.m_Color == TEAM_COLOR.blue){
			return 'Blue';
		}else{
			return 'Red';
		}
	}
}

export {
	SoccerTeam as default,
	TEAM_COLOR
}