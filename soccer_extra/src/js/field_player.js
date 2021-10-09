import PlayerBase from './player_base';
import StateMachine from './common/fsm/state_machine';
import {
	GlobalPlayerState,
	ChaseBall,
	Dribble,
	ReturnToHomeRegion,
	Wait,
	KickBall,
	ReceiveBall,
	SupportAttacker
} from './field_player_state';
import Regulator from './common/time/regulator';
import PRM from './params';
import {
	clamp
} from './common/misc/utils';
import {
	vec2dRotateAroundOrigin,
	worldTransform
} from './common/2d/transformations';
import {
	enforceNonPenetrationConstraint
} from './entity_function_templates';
import AutoList from './common/misc/autolist';
import gdi from './common/misc/cgdi';
import {
	TEAM_COLOR
} from './soccer_team';
import {
	vec2DDistanceSq
} from './common/2d/vector2d';

class FieldPlayer extends PlayerBase{
	constructor(homeTeam, homeRegion, startState, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, role) {
		super(homeTeam, homeRegion, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, role);
		this.m_pStateMachine = new StateMachine(this);
		if(startState){
			this.m_pStateMachine.setCurrentState(startState);
			this.m_pStateMachine.setPreviousState(startState);
			this.m_pStateMachine.setGlobalState(GlobalPlayerState);
			this.m_pStateMachine.currentState().enter(this);
		}
		this.m_pSteering.separationOn();
		this.m_pKickLimiter = new Regulator(PRM.PlayerKickFrequency);
	}
	update(timeElapsed){
		this.m_pStateMachine.update();
		this.m_pSteering.calculate();
		if(this.m_pSteering.force().isZero()){
			const BrakingRate = 0.8;
			this.m_vVelocity = this.m_vVelocity.crossNum(BrakingRate);
		}
		let turningForce = this.m_pSteering.sideComponent();
		turningForce = clamp(turningForce, -PRM.PlayerMaxTurnRate, PRM.PlayerMaxTurnRate);
		vec2dRotateAroundOrigin(this.m_vHeading, turningForce);
		this.m_vVelocity = this.m_vHeading.crossNum(this.m_vVelocity.length());
		this.m_vSide = this.m_vHeading.perp();
		let accel = this.m_vHeading.crossNum(this.m_pSteering.forwardComponent() / this.m_dMass);
		this.m_vVelocity = this.m_vVelocity.add(accel);
		this.m_vVelocity.truncate(this.m_dMaxSpeed);
		this.m_vPos = this.m_vPos.add(this.m_vVelocity);
		if(PRM.bNonPenetrationConstraint){
			enforceNonPenetrationConstraint(this, AutoList.getAllMembers());
		}
	}
	render(){
		gdi.transparentText();
		gdi.textColor(gdi.GREY);
		if(this.team().teamColor() == TEAM_COLOR.blue){
			gdi.bluePen();
		}else{
			gdi.redPen();
		}
		this.m_vecPlayerVBTrans = worldTransform(this.m_vecPlayerVB, this.pos(), this.heading(), this.side(), this.scale());
		gdi.closedShape(this.m_vecPlayerVBTrans);
		// threaten
		gdi.brownBrush();
		if(PRM.HighlightIfThreatened && this.team().controllingPlayer() == this && this.isThreatened()){
			gdi.yellowBrush();
		}
		gdi.circle(this.pos(), 6);
		// state
		if(PRM.ViewStates){
			gdi.textColor('rgb(0, 170, 0)');
			gdi.textAtPos(this.m_vPos.x, this.m_vPos.y - 20, this.m_pStateMachine.getNameOfCurrentState());
		}
		// id
		if(PRM.ViewIDs){
			gdi.textColor('rgb(0, 170, 0)');
			gdi.textAtPos(this.pos().x - 20, this.pos().y - 20, this.id());
		}
		if(PRM.ViewTargets){
			gdi.redBrush();
			gdi.circle(this.steering().target(), 3);
			gdi.textAtPos(this.steering().target().x, this.steering().target().y, this.id());
		}
	}
	handleMessage(msg){
		return this.m_pStateMachine.handleMessage(msg);
	}
	getFSM(){
		return this.m_pStateMachine;
	}
	isReadyFornextKick(){
		return this.m_pKickLimiter.isReady();
	}
	isToFarFromHomeRegion(){
		let distToHomeRegionSq = vec2DDistanceSq(this.pos(), this.homeRegion().center());
		const maxDist = this.team().pitch().playingArea().width() / 2;
		return distToHomeRegionSq > maxDist * maxDist;
	}
}

export {
	FieldPlayer as default
};