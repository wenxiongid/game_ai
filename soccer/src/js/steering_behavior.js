import gdi from './common/misc/cgdi';
import PRM from './params';
import Vector2D, {
	vec2dNormalize,
	vec2DDistance,
	vec2DDistanceSq
} from './common/2d/vector2d';
import {
	pointToWorldSpace,
	pointToLocalSpace,
	vec2dRotateAroundOrigin,
	worldTransform,
	vectorToWorldSpace
} from './common/2d/transformations';
import { lineIntersection2D } from './common/2d/geometry';
import {
	clamp,
	MaxDouble,
	randomClamped
} from './common/misc/utils';
import AutoList from './common/misc/autolist';

const slow = 3;
const normal = 2;
const fast = 1;
const WanderRad = 1.2;
const WanderDist = 2;
const WanderJitterPerSec = 80;
const WaypointSeekDist = 20;
const BehaviorType = {
	none              : 0x0000,
  seek              : 0x0001,
  arrive            : 0x0002,
  separation        : 0x0004,
  pursuit           : 0x0008,
  interpose         : 0x0010
};

class SteeringBehavior{
	constructor(agent, world, ball) {
		this.m_pPlayer = agent;
		this.m_iFlags = 0;
		this.m_dMultSeparation = PRM.SeparationCoefficient;
		this.bTagged = false;
		this.m_dViewDistance = PRM.ViewDistance;
		this.m_pBall = ball;
		this.m_dInterposeDist = 0;
		this.m_vSteeringForce = new Vector2D();
		this.m_Antenna = [new Vector2D(), new Vector2D(), new Vector2D(), new Vector2D(), new Vector2D()];
	}
	force(){
		return this.m_vSteeringForce;
	}
	target(){
		return this.m_vTarget;
	}
	setTarget(t){
		this.m_vTarget = t;
	}
	interposeDistance(){
		return this.m_dInterposeDist;
	}
	setInterposeDistance(d){
		this.m_dInterposeDist = d;
	}
	tagged(){
		return this.m_bTagged;
	}
	tag(){
		this.m_bTagged = true;
	}
	unTag(){
		this.m_bTagged = false;
	}
	on(bt){
		return (this.m_iFlags & bt) == bt;
	}
	seekOn(){
		this.m_iFlags |= BehaviorType.seek;
	}
	seekOff(){
		if(this.on(BehaviorType.seek)){
			this.m_iFlags ^= BehaviorType.seek;
		}
	}
	seekIsOn(){
		return this.on(BehaviorType.seek);
	}
	arriveOn(){
		this.m_iFlags |= BehaviorType.arrive;
	}
	arriveOff(){
		if(this.on(BehaviorType.arrive)){
			this.m_iFlags ^= BehaviorType.arrive;
		}
	}
	arriveIsOn(){
		return this.on(BehaviorType.arrive);
	}
	pursuitOn(){
		this.m_iFlags |= BehaviorType.pursuit;
	}
	pursuitOff(){
		if(this.on(BehaviorType.pursuit)){
			this.m_iFlags ^= BehaviorType.pursuit;
		}
	}
	pursuitIsOn(){
		return this.on(BehaviorType.pursuit);
	}
	separationOn(){
		this.m_iFlags |= BehaviorType.separation;
	}
	separationOff(){
		if(this.on(BehaviorType.separation)){
			this.m_iFlags ^= BehaviorType.separation;
		}
	}
	separationIsOn(){
		return this.on(BehaviorType.separation);
	}
	interposeOn(d){
		this.m_iFlags |= BehaviorType.interpose;
		this.m_dInterposeDist = d;
	}
	interposeOff(){
		if(this.on(BehaviorType.interpose)){
			this.m_iFlags ^= BehaviorType.interpose;
		}
	}
	interposeIsOn(){
		return this.on(BehaviorType.interpose);
	}
	accumulateForce(steeringForce, forceToAdd){
		let returnForce = new Vector2D();
		let result = false;
		let magnitudeSoFar = steeringForce.length();
		let magnitudeRemaining = this.m_pPlayer.maxForce() - magnitudeSoFar;
		if(magnitudeRemaining <= 0){
			return {
				result,
				returnForce
			};
		}
		let magnitudeToAdd = forceToAdd.length();
		if(magnitudeToAdd > magnitudeRemaining){
			magnitudeToAdd = magnitudeRemaining;
		}
		returnForce = steeringForce.add(vec2dNormalize(forceToAdd).crossNum(magnitudeToAdd));
		result = true;
		return {
			result,
			returnForce
		};
	}
	calculate(){
		this.m_vSteeringForce.zero();
		this.m_vSteeringForce = this.sumForces();
		this.m_vSteeringForce.truncate(this.m_pPlayer.maxForce());
		return this.m_vSteeringForce;
	}
	sumForces(){
		let force = new Vector2D();
		let accumulateForceInfo = null;
		if(this.on(BehaviorType.separation)){
			force = force.add(this.separation().crossNum(this.m_dMultSeparation));
			accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
			if(accumulateForceInfo.result){
				this.m_vSteeringForce = accumulateForceInfo.returnForce;
			}else{
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.seek)){
			force = force.add(this.seek(this.m_vTarget));
			accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
			if(accumulateForceInfo.result){
				this.m_vSteeringForce = accumulateForceInfo.returnForce;
			}else{
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.arrive)){
			force = force.add(this.arrive(this.m_vTarget, fast));
			accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
			if(accumulateForceInfo.result){
				this.m_vSteeringForce = accumulateForceInfo.returnForce;
			}else{
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.pursuit)){
			force = force.add(this.pursuit(this.m_pBall));
			accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
			if(accumulateForceInfo.result){
				this.m_vSteeringForce = accumulateForceInfo.returnForce;
			}else{
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.interpose)){
			force = force.add(this.interpose(this.m_pBall, this.m_vTarget, this.m_dInterposeDist));
			accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
			if(accumulateForceInfo.result){
				this.m_vSteeringForce = accumulateForceInfo.returnForce;
			}else{
				return this.m_vSteeringForce;
			}
		}
		return this.m_vSteeringForce;
	}
	forwardComponent(){
		return this.m_pPlayer.heading().dot(this.m_vSteeringForce);
	}
	sideComponent(){
		return this.m_pPlayer.side().dot(this.m_vSteeringForce) * this.m_pPlayer.maxTurnRate();
	}
	seek(targetPos){
		let desiredVelocity = vec2dNormalize(targetPos.add(this.m_pPlayer.pos().getReverse())).crossNum(this.m_pPlayer.maxSpeed());
		return desiredVelocity.add(this.m_pPlayer.velocity().getReverse());
	}
	arrive(targetPos, deceleration){
		let toTarget = targetPos.add(this.m_pPlayer.pos().getReverse());
		let dist = toTarget.length();
		if(dist > 0){
			const decelerationTweaker = 0.3;
			let speed = dist / (deceleration * decelerationTweaker);
			speed = Math.min(speed, this.m_pPlayer.maxSpeed());
			let desiredVelocity = toTarget.crossNum(speed / dist);
			return desiredVelocity.add(this.m_pPlayer.velocity().getReverse());
		}
		return new Vector2D(0, 0);
	}
	pursuit(ball){
		let toBall = ball.pos().add(this.m_pPlayer.pos().getReverse());
		let lookAheadTime = 0;
		if(ball.speed() != 0){
			lookAheadTime = toBall.length() / ball.speed();
		}
		this.m_vTarget = ball.futurePosition(lookAheadTime);
		return this.arrive(this.m_vTarget, fast);
	}
	findNeighbours(){
		let allPlayers = AutoList.getAllMembers();
		for(let i = 0; i < allPlayers.length; i++){
			let curPlayer = allPlayers[i];
			curPlayer.steering().unTag();
			let to = curPlayer.pos().add(this.m_pPlayer.pos().getReverse());
			if(to.lengthSq() < this.m_dViewDistance * this.m_dViewDistance){
				curPlayer.steering().tag();
			}
		}
	}
	separation(){
		let steeringForce = new Vector2D();
		let allPlayers = AutoList.getAllMembers();
		for(let i = 0; i < allPlayers.length; i++){
			let curPlayer = allPlayers[i];
			if(curPlayer != this.m_pPlayer && curPlayer.steering().tagged()){
				let toAgent = this.m_pPlayer.pos().add(curPlayer.pos().getReverse());
				steeringForce = steeringForce.add(vec2dNormalize(toAgent).crossNum(1 / toAgent.length()));
			}
		}
		return steeringForce;
	}
	interpose(ball, target, distFromTarget){
		return this.arrive(target.add(vec2dNormalize(ball.pos().add(target.getReverse())).crossNum(distFromTarget)), normal);
	}
	renderAids(){
		gdi.redPen();
		gdi.line(this.m_pPlayer.pos(), this.m_pPlayer.pos().add(this.m_vSteeringForce.crossNum(20)));
	}
}

export {
	SteeringBehavior as default
};