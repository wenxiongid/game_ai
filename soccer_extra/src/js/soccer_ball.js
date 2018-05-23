import MovingEntity from './common/game/moving_entity';
import Vector2D, {
	vec2dNormalize,
	vec2DDistance,
	vec2DDistanceSq
} from './common/2d/vector2d';
import {
	randomClamped,
	MaxFloat
} from './common/misc/utils';
import { vec2dRotateAroundOrigin } from './common/2d/transformations';
import {
	whereIsPoint,
	distanceToRayPlaneIntersection,
	lineIntersection2D
} from './common/2d/geometry';
import PRM from './params';
import gdi from './common/misc/cgdi';

function addNoiseToKick(ballPos, ballTarget){
	let displacement = Math.PI * (1 - PRM.PlayerKickingAccuracy) * randomClamped();
	let toTarget = ballTarget.add(ballPos.getReverse());
	vec2dRotateAroundOrigin(toTarget, displacement);
	return ballPos.add(toTarget);
}

class SoccerBall extends MovingEntity{
	constructor(pos, ballSize, mass, pitchBoundary) {
		super(pos, ballSize, new Vector2D(), -1, new Vector2D(0, 1), mass, new Vector2D(1, 1), 0, 0);
		this.m_vOldPos = pos;
		this.m_PitchBoundary = pitchBoundary;
	}
	testCollisionWithWalls(walls){
		let idxClosest = -1;
		let velNormal = vec2dNormalize(this.m_vVelocity);
		let intersectionPoint = new Vector2D();
		let collisionPoint = new Vector2D();
		let distToIntersection = MaxFloat;
		for(let w = 0; w < walls.length; w++){
			let thisCollisionPoint = this.pos().add(walls[w].normal().crossNum(this.bRadius()).getReverse());
			let distToWall = 0;
			if(whereIsPoint(thisCollisionPoint, walls[w].from(), walls[w].normal()) == 'PLANE_BACKSIDE'){
				distToWall = distanceToRayPlaneIntersection(thisCollisionPoint, walls[w].normal(), walls[w].from(), walls[w].normal());
				intersectionPoint = thisCollisionPoint.add(walls[w].normal().crossNum(distToWall));
			}else{
				distToWall = distanceToRayPlaneIntersection(thisCollisionPoint, velNormal, walls[w].from(), walls[w].normal());
				intersectionPoint = thisCollisionPoint.add(velNormal.crossNum(distToWall));
			}
			let onLineSegment = false;
			let intersectionInfo = lineIntersection2D(
				walls[w].from(),
				walls[w].to(),
				thisCollisionPoint.add(walls[w].normal().crossNum(20).getReverse()),
				thisCollisionPoint.add(walls[w].normal().crossNum(20))
			);
			if(intersectionInfo.result){
				onLineSegment = true;
			}
			let distSq = vec2DDistanceSq(thisCollisionPoint, intersectionPoint);
			if(distSq <= this.m_vVelocity.lengthSq() && distSq < distToIntersection && onLineSegment){
				distToIntersection = distSq;
				idxClosest = w;
				collisionPoint = intersectionPoint;
			}
		}
		if(idxClosest >= 0 && velNormal.dot(walls[idxClosest].normal()) < 0){
			this.m_vVelocity.reflect(walls[idxClosest].normal());
		}
	}
	update(timeElapsed){
		this.m_vOldPos = this.m_vPos;
		this.testCollisionWithWalls(this.m_PitchBoundary);
		if(this.m_vVelocity.lengthSq() > PRM.Friction * PRM.Friction){
			this.m_vVelocity = this.m_vVelocity.add(vec2dNormalize(this.m_vVelocity).crossNum(PRM.Friction));
			this.m_vPos = this.m_vPos.add(this.m_vVelocity);
			this.m_vHeading = vec2dNormalize(this.m_vVelocity);
		}
	}
	render(){
		gdi.blackBrush();
		gdi.circle(this.m_vPos, this.m_dBoundingRadius);
	}
	handleMessage(msg){
		return false;
	}
	kick(direction, force){
		direction.normalize();
		let acceleration = direction.crossNum(force / this.m_dMass);
		this.m_vVelocity = acceleration;
	}
	timeToCoverDistance(A, B, force){
		let speed = force / this.m_dMass;
		let distanceToCover = vec2DDistance(A, B);
		let term = speed * speed + 2 * distanceToCover * PRM.Friction;
		if(term <= 0){
			return -1;
		}
		let v = Math.sqrt(term);
		return (v - speed) / PRM.Friction;
	}
	futurePosition(time){
		let ut = this.m_vVelocity.crossNum(time);
		let half_a_t_squared = 0.5 * PRM.Friction * time * time;
		let scalarToVector = vec2dNormalize(this.m_vVelocity).crossNum(half_a_t_squared);
		return this.pos().add(ut).add(scalarToVector);
	}
	trap(){
		this.m_vVelocity.zero();
	}
	oldPos(){
		return this.m_vOldPos;
	}
	placeAtPosition(newPos){
		this.m_vPos = newPos;
		this.m_vOldPos = this.m_vPosition;
		this.m_vVelocity.zero();
	}
}

export {
	SoccerBall as default,
	addNoiseToKick
};