import PlayerBase, {
	PLAYERROLE
} from './player_base';
import StateMachine from './common/fsm/state_machine';
import PRM from './params';
import {
	enforceNonPenetrationConstraint
} from './entity_function_templates';
import AutoList from './common/misc/autolist';
import Vector2D, {
	vec2dNormalize,
	vec2DDistanceSq
} from './common/2d/vector2d';
import {
	TEAM_COLOR
} from './soccer_team';
import gdi from './common/misc/cgdi';
import {
	vec2dRotateAroundOrigin,
	worldTransform
} from './common/2d/transformations';
import {
	GlobalKeeperState,
	TendGoal,
	InterceptBall,
	ReturnHome,
	PutBallBackInPlay
} from './goalkeeper_state';

class GoalKeeper extends PlayerBase{
	constructor(homeTeam, homeRegion, startState, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale) {
		super(homeTeam, homeRegion, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, PLAYERROLE.goalKeeper);
		this.m_pStateMachine = new StateMachine(this);
		this.m_pStateMachine.setCurrentState(startState);
		this.m_pStateMachine.setPreviousState(startState);
		this.m_pStateMachine.setGlobalState(GlobalKeeperState);
		this.m_pStateMachine.currentState().enter(this);
	}
	getFSM(){
		return this.m_pStateMachine;
	}
	handleMessage(msg){
		return this.m_pStateMachine.handleMessage(msg);
	}
	update(timeElapsed){
		this.m_pStateMachine.update();
		let steeringForce = this.m_pSteering.calculate();
		let acceleration = steeringForce.crossNum(1 / this.m_dMass);
		this.m_vVelocity = this.m_vVelocity.add(acceleration);
		this.m_vVelocity.truncate(this.m_dMaxSpeed);
		this.m_vPos = this.m_vPos.add(this.m_vVelocity);
		if(PRM.bNonPenetrationConstraint){
			enforceNonPenetrationConstraint(this, AutoList.getAllMembers());
		}
		if(!this.m_vVelocity.isZero()){
			this.m_vHeading = vec2dNormalize(this.m_vVelocity);
			this.m_vSide = this.m_vHeading.perp();
		}
		if(!this.pitch().goalKeeperHasBall()){
			this.m_vLookAt = vec2dNormalize(this.ball().pos().add(this.pos().getReverse()));
		}
	}
	render(){
		if(this.team().teamColor() == TEAM_COLOR.blue){
			gdi.bluePen();
		}else{
			gdi.redPen();
		}
		this.m_vecPlayerVBTrans = worldTransform(this.m_vecPlayerVB, this.pos(), this.m_vLookAt, this.m_vLookAt.perp(), this.scale());
		gdi.closedShape(this.m_vecPlayerVBTrans);
		gdi.brownBrush();
		gdi.circle(this.pos(), 6);
		if(PRM.ViewIDs){
			gdi.textColor('rgb(0, 170, 0)');
			gdi.textAtPos(this.pos().x - 20, this.pos().y - 20, this.id());
		}
		if(PRM.ViewStates){
			gdi.textColor('rgb(0, 170, 0)');
			gdi.transparentText();
			gdi.textAtPos(this.pos().x, this.pos().y - 20, this.m_pStateMachine.getNameOfCurrentState());
		}
	}
	ballWithinRangeForIntercept(){
		return vec2DDistanceSq(this.team().homeGoal().center(), this.ball().pos()) <= PRM.GoalKeeperInterceptRangeSq;
	}
	tooFarFromGoalMouth(){
		return vec2DDistanceSq(this.pos(), this.getRearInterposeTarget()) > PRM.GoalKeeperInterceptRangeSq;
	}
	getRearInterposeTarget(){
		let xPosTarget = this.team().homeGoal().center().x;
		let yPosTarget = this.pitch().playingArea().center().y - PRM.GoalWidth * 0.5 + this.ball().pos().y / this.pitch().playingArea().height() * PRM.GoalWidth;
		return new Vector2D(xPosTarget, yPosTarget);
	}
}

export {
	GoalKeeper as default
};