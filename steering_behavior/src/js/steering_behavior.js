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
import { clamp } from './common/misc/utils';
import Path from './path';

const MaxDouble = 999999;

function randomClamped(){
	return 1 - (Math.random() * 2);
}

const slow = 3;
const normal = 3;
const fast = 3;
const WanderRad = 1.2;
const WanderDist = 2;
const WanderJitterPerSec = 80;
const WaypointSeekDist = 20;
const BehaviorType = {
	none              : 0x00000,
  seek              : 0x00002,
  flee              : 0x00004,
  arrive            : 0x00008,
  wander            : 0x00010,
  cohesion          : 0x00020,
  separation        : 0x00040,
  allignment        : 0x00080,
  obstacle_avoidance: 0x00100,
  wall_avoidance    : 0x00200,
  follow_path       : 0x00400,
  pursuit           : 0x00800,
  evade             : 0x01000,
  interpose         : 0x02000,
  hide              : 0x04000,
  flock             : 0x08000,
  offset_pursuit    : 0x10000
};

export default class SteeringBehavior{
	constructor(agent) {
		this.m_pVehicle = agent;
		this.m_vTarget = null;
		this.m_vOffset = null;
		this.m_vSteeringForce = new Vector2D();
		this.m_iFlags = 0;
		this.m_dDBoxLength = PRM.MinDetectionBoxLength;
		this.m_dWeightCohesion = PRM.CohesionWeight;
		this.m_dWeightAlignment = PRM.AlignmentWeight;
		this.m_dWeightSeparation = PRM.SeparationWeight;
		this.m_dWeightObstacleAvoidance = PRM.ObstacleAvoidanceWeight;
		this.m_dWeightWander = PRM.WanderWeight;
		this.m_dWeightWallAvoidance = PRM.WallAvoidanceWeight;
		this.m_dViewDistance = PRM.ViewDistance;
		this.m_dWallDetectionFeelerLength = PRM.WallDetectionFeelerLength;
		this.m_Feelers = [new Vector2D(0, 0), new Vector2D(0, 0), new Vector2D(0, 0)];
		this.m_Deceleration = normal;
		this.m_pTargetAgent1 = null;
		this.m_pTargetAgent2 = null;
		this.m_dWanderDistance = WanderDist;
		this.m_dWanderJitter = WanderJitterPerSec;
		this.m_dWanderRadius = WanderRad;
		this.m_dWaypointSeekDistSq = WaypointSeekDist * WaypointSeekDist;
		this.m_dWeightSeek = PRM.SeekWeight;
		this.m_dWeightFlee = PRM.FleeWeight;
		this.m_dWeightArrive = PRM.ArriveWeight;
		this.m_dWeightPursuit = PRM.PursuitWeight;
		this.m_dWeightOffsetPursuit = PRM.OffsetPursuitWeight;
		this.m_dWeightInterpose = PRM.InterposeWeight;
		this.m_dWeightHide = PRM.HideWeight;
		this.m_dWeightEvade = PRM.EvadeWeight;
		this.m_dWeightFollowPath = PRM.FollowPathWeight;
		this.m_bCellSpaceOn = false;
		this.m_SummingMethod = 'prioritized';
		this.theta = Math.random() * Math.PI * 2;
		this.m_vWanderTarget = new Vector2D(this.m_dWanderRadius * Math.cos(this.theta), this.m_dWanderRadius * Math.sin(this.theta));
		this.m_pPath = new Path();
		this.m_pPath.loopOn();
	}
	forwardComponent(){
		return this.m_pVehicle.heading().dot(this.m_vSteeringForce);
	}
	sideComponent(){
		return this.m_pVehicle.side().dot(this.m_vSteeringForce);
	}
	renderAids(){
		gdi.transparentText();
		gdi.textColor(gdi.GREY);
		let nextSlot = 20;
		let slotSize = 20;
		document.addEventListener('keydown', (e) => {
			switch(e.key){
				case 'PageDown':
					this.m_pVehicle.setMaxForce(this.m_pVehicle.maxForce() + 1000 * this.m_pVehicle.timeElapsed());
					break;
				case 'PageUp':
					if(this.m_pVehicle.maxForce() > 0.2){
						this.m_pVehicle.setMaxForce(this.m_pVehicle.maxForce() - 1000 * this.m_pVehicle.timeElapsed());
					}
					break;
				case 'Home':
					this.m_pVehicle.setMaxSpeed(this.m_pVehicle.maxSpeed() + 5 * this.m_pVehicle.timeElapsed());
					break;
				case 'End':
					if(this.m_pVehicle.maxSpeed() > 0.2){
						this.m_pVehicle.setMaxSpeed(this.m_pVehicle.maxSpeed() - 5 * this.m_pVehicle.timeElapsed());
					}
					break;
			}
		});
		if(this.m_pVehicle.maxForce() < 0){
			this.m_pVehicle.setMaxForce(0);
		}
		if(this.m_pVehicle.maxSpeed() < 0){
			this.m_pVehicle.setMaxSpeed(0);
		}
		if(this.m_pVehicle.id() == 0){
			gdi.textAtPos(5, nextSlot, 'MaxForce(PgUp/PgDn):');
			gdi.textAtPos(160, nextSlot, this.m_pVehicle.maxForce() / PRM.SteeringForceTweaker);
			nextSlot += slotSize;
		}
		if(this.m_pVehicle.id() == 0){
			gdi.textAtPos(5, nextSlot, 'MaxSpeed(Home/End):');
			gdi.textAtPos(160, nextSlot, this.m_pVehicle.maxSpeed());
			nextSlot += slotSize;
		}
		if(this.m_pVehicle.world().renderSteeringForce()){
			gdi.redPen();
			let F = this.m_vSteeringForce.crossNum(1 / PRM.SteeringForceTweaker * PRM.VehicleScale);
			gdi.line(this.m_pVehicle.pos(), this.m_pVehicle.pos().add(F));
		}
		if(this.on(SteeringBehavior.wander) && this.m_pVehicle.world().renderWanderCircle()){
			document.addEventListener('keydown', (e) => {
				switch(e.key){
					case 'f':
						this.m_dWanderJitter += 1 * this.m_pVehicle.timeElapsed();
						this.m_dWanderJitter = clamp(this.m_dWanderJitter, 0, 100);
						break;
					case 'v':
						this.m_dWanderJitter -= 1 * this.m_pVehicle.timeElapsed();
						this.m_dWanderJitter = clamp(this.m_dWanderJitter, 0, 100);
						break;
					case 'g':
						this.m_dWanderDistance += 2 * this.m_pVehicle.timeElapsed();
						this.m_dWanderDistance = clamp(this.m_dWanderDistance, 0, 50);
						break;
					case 'b':
						this.m_dWanderDistance -= 2 * this.m_pVehicle.timeElapsed();
						this.m_dWanderDistance = clamp(this.m_dWanderDistance, 0, 50);
						break;
					case 'h':
						this.m_dWanderRadius += 2 * this.m_pVehicle.timeElapsed();
						this.m_dWanderRadius = clamp(this.m_dWanderRadius, 0, 100);
						break;
					case 'n':
						this.m_dWanderRadius -= 2 * this.m_pVehicle.timeElapsed();
						this.m_dWanderRadius = clamp(this.m_dWanderRadius, 0, 100);
						break;
				}
			});
			if(this.m_pVehicle.id() == 0){
				gdi.textAtPos(5, nextSlot, 'Jitter(F/V): ');
				gdi.textAtPos(160, nextSlot, this.m_dWanderJitter);
				nextSlot += slotSize;
			}
			if(this.m_pVehicle.id() == 0){
				gdi.textAtPos(5, nextSlot, 'Distance(G/B): ');
				gdi.textAtPos(160, nextSlot, this.m_dWanderDistance);
				nextSlot += slotSize;
			}
			if(this.m_pVehicle.id() == 0){
				gdi.textAtPos(5, nextSlot, 'Radius(H/N): ');
				gdi.textAtPos(160, nextSlot, this.m_dWanderRadius);
				nextSlot += slotSize;
			}
			let m_vTCC = pointToWorldSpace(new Vector2D(this.m_dWanderRadius * this.m_pVehicle.bRadius(), 0), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
			gdi.greenPen();
			gdi.hollowBrush();
			gdi.circle(m_vTCC, this.m_dWanderRadius * this.m_pVehicle.bRadius());
			gdi.redPen();
			gdi.circle(pointToWorldSpace(this.m_vWanderTarget.add((new Vector2D(this.m_dWanderDistance, 0)).crossNum(this.m_pVehicle.bRadius())), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos()), 3);
		}
		if(this.m_pVehicle.world().renderDetectionBox()){
			gdi.greyPen();
			let box = [];
			let length = PRM.MinDetectionBoxLength + (this.m_pVehicle.speed() / this.m_pVehicle.maxSpeed()) * PRM.MinDetectionBoxLength;
			box[0] = new Vector2D(0, this.m_pVehicle.bRadius());
			box[1] = new Vector2D(length, this.m_pVehicle.bRadius());
			box[2] = new Vector2D(length, -this.m_pVehicle.bRadius());
			box[3] = new Vector2D(0, -this.m_pVehicle.bRadius());
			if(!this.m_pVehicle.isSmoothingOn()){
				box = worldTransform(box, this.m_pVehicle.pos(), this.m_pVehicle.heading(), this.m_pVehicle.side());
			}else{
				box = worldTransform(box, this.m_pVehicle.pos(), this.m_pVehicle.smoothedHeading(), this.m_pVehicle.smoothedHeading().perp());
			}
			gdi.closedShape(box);

			this.m_dDBoxLength = length;
			this.m_pVehicle.world().tagObstaclesWithinViewRange(this.m_pVehicle, this.m_dDBoxLength);
			let closestIntersectingObstacle = null;
			let distToClosestIP = MaxDouble;
			let localPosOfClosestObstacle = new Vector2D();
			for(let i = 0; i < this.m_pVehicle.world().obstacles().length; i++){
				let curOb = this.m_pVehicle.world().obstacles()[i];
				if(curOb.isTagged()){
					let localPos = pointToLocalSpace(curOb.pos(), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
					if(localPos.x >= 0){
						if(Math.abs(localPos.y) < curOb.bRadius() + this.m_pVehicle.bRadius()){
							gdi.thickRedPen();
							// FIXME: ???
							gdi.closedShape(box);
						}
					}
				}
			}
		}
		if(this.on(SteeringBehavior.wall_avoidance) && this.m_pVehicle.world().renderFeelers()){
			gdi.orangePen();
			for(let flr = 0; flr < this.m_Feelers.length; flr++){
				gdi.line(this.m_pVehicle.pos(), this.m_Feelers[flr]);
			}
		}
		if(this.on(SteeringBehavior.follow_path) && this.m_pVehicle.world().renderPath()){
			this.m_pPath.render();
		}
		if(this.on(SteeringBehavior.separation)){
			if(this.m_pVehicle.id() == 0){
				gdi.textAtPos(5, nextSlot, 'Separation(S/X):');
				gdi.textAtPos(160, nextSlot, this.m_dWeightSeparation / PRM.SteeringForceTweaker);
				nextSlot += slotSize;
			}
			docuemnt.addEventListener('keydown', (e) => {
				switch(e.key){
					case 's':
						this.m_dWeightSeparation += 200 * this.m_pVehicle.timeElapsed();
						this.m_dWeightSeparation = clamp(this.m_dWeightSeparation, 0, 50 * PRM.SteeringForceTweaker);
						break;
					case 'x':
						this.m_dWeightSeparation -= 200 * this.m_pVehicle.timeElapsed();
						this.m_dWeightSeparation = clamp(this.m_dWeightSeparation, 0, 50 * PRM.SteeringForceTweaker);
						break;
				}
			});
		}
		if(this.on(SteeringBehavior.allignment)){
			if(this.m_pVehicle.id() == 0){
				gdi.textAtPos(5, nextSlot, 'Alignment(A/Z):');
				gdi.textAtPos(160, nextSlot, this.m_dWeightAlignment / PRM.SteeringForceTweaker);
				nextSlot += slotSize;
			}
			docuemnt.addEventListener('keydown', (e) => {
				switch(e.key){
					case 'a':
						this.m_dWeightAlignment += 200 * this.m_pVehicle.timeElapsed();
						this.m_dWeightAlignment = clamp(this.m_dWeightAlignment, 0, 50 * PRM.SteeringForceTweaker);
						break;
					case 'z':
						this.m_dWeightAlignment -= 200 * this.m_pVehicle.timeElapsed();
						this.m_dWeightAlignment = clamp(this.m_dWeightAlignment, 0, 50 * PRM.SteeringForceTweaker);
						break;
				}
			});
		}
		if(this.on(SteeringBehavior.cohesion)){
			if(this.m_pVehicle.id() == 0){
				gdi.textAtPos(5, nextSlot, 'Cohesion(D/C):');
				gdi.textAtPos(160, nextSlot, this.m_dWeightCohesion / PRM.SteeringForceTweaker);
				nextSlot += slotSize;
			}
			docuemnt.addEventListener('keydown', (e) => {
				switch(e.key){
					case 'd':
						this.m_dWeightCohesion += 200 * this.m_pVehicle.timeElapsed();
						this.m_dWeightCohesion = clamp(this.m_dWeightCohesion, 0, 50 * PRM.SteeringForceTweaker);
						break;
					case 'c':
						this.m_dWeightCohesion -= 200 * this.m_pVehicle.timeElapsed();
						this.m_dWeightCohesion = clamp(this.m_dWeightCohesion, 0, 50 * PRM.SteeringForceTweaker);
						break;
				}
			});
		}
		if(this.on(SteeringBehavior.follow_path)){
			let sd = Math.sqrt(this.m_dWaypointSeekDistSq);
			if(this.m_pVehicle.id() == 0){
				gdi.textAtPos(5, nextSlot, 'SeekDistance(D/C):');
				gdi.textAtPos(160, nextSlot, sd);
				nextSlot += slotSize;
			}
			docuemnt.addEventListener('keydown', (e) => {
				switch(e.key){
					case 'd':
						this.m_dWaypointSeekDistSq += 1;
						break;
					case 'c':
						this.m_dWaypointSeekDistSq -= 1;
						this.m_dWaypointSeekDistSq = clamp(this.m_dWaypointSeekDistSq, 0, 400);
						break;
				}
			});
		}
	}
	setTarget(t){
		this.m_vTarget = t;
	}
	setTargetAgent1(agent){
		this.m_pTargetAgent1 = agent;
	}
	setTargetAgent2(agent){
		this.m_pTargetAgent2 = agent;
	}
	setOffset(offset){
		this.m_vOffset = offset;
	}
	getOffset(){
		return this.m_vOffset;
	}
	setPath(new_path){
		this.m_pPath.set(new_path);
	}
	createPath(num_waypoints, mx, my, cx, cy){
		this.m_pPath.createRandomPath(num_waypoints, mx, my, cx, cy);
	}
	force(){
		return this.m_vSteeringForce;
	}
	toggleSpacePartitioningOnOff(){
		this.m_bCellSpaceOn = !this.m_bCellSpaceOn;
	}
	isSpacePartitioningOn(){
		return this.m_bCellSpaceOn;
	}
	setSummingMethod(sm){
		this.m_SummingMethod = sm;
	}
	on(bt){
		return (this.m_iFlags & bt) == bt;
	}
	fleeOn(){
		this.m_iFlags |= BehaviorType.flee;
	}
	fleeOff(){
		if(this.on(BehaviorType.flee)){
			this.m_iFlags ^= BehaviorType.flee;
		}
	}
	seekOn(){
		this.m_iFlags |= BehaviorType.seek;
	}
	seekOff(){
		if(this.on(BehaviorType.seek)){
			this.m_iFlags ^= BehaviorType.seek;
		}
	}
	arriveOn(){
		this.m_iFlags |= BehaviorType.arrive;
	}
	arriveOff(){
		if(this.on(BehaviorType.arrive)){
			this.m_iFlags ^= BehaviorType.arrive;
		}
	}
	wanderOn(){
		this.m_iFlags |= BehaviorType.wander;
	}
	wanderOff(){
		if(this.on(BehaviorType.wander)){
			this.m_iFlags ^= BehaviorType.wander;
		}
	}
	pursuitOn(v){
		this.m_iFlags |= BehaviorType.pursuit;
		this.m_pTargetAgent1 = v;
	}
	pursuitOff(){
		if(this.on(BehaviorType.pursuit)){
			this.m_iFlags ^= BehaviorType.pursuit;
		}
	}
	evadeOn(v){
		this.m_iFlags |= BehaviorType.evade;
		this.m_pTargetAgent1 = v;
	}
	evadeOff(){
		if(this.on(BehaviorType.evade)){
			this.m_iFlags ^= BehaviorType.evade;
		}
	}
	cohesionOn(){
		this.m_iFlags |= BehaviorType.cohesion;
	}
	cohensionOff(){
		if(this.on(BehaviorType.cohension)){
			this.m_iFlags ^= BehaviorType.cohension;
		}
	}
	separationOn(){
		this.m_iFlags |= BehaviorType.separation;
	}
	separationOff(){
		if(this.on(BehaviorType.separation)){
			this.m_iFlags ^= BehaviorType.separation;
		}
	}
	alignmentOn(){
		this.m_iFlags |= BehaviorType.allignment;
	}
	alignmentOff(){
		if(this.on(BehaviorType.alignment)){
			this.m_iFlags ^= BehaviorType.alignment;
		}
	}
	obstacleAvoidanceOn(){
		this.m_iFlags |= BehaviorType.obstacle_avoidance;
	}
	obstacleAvoidanceOff(){
		if(this.on(BehaviorType.obstacle_avoidance)){
			this.m_iFlags ^= BehaviorType.obstacle_avoidance;
		}
	}
	wallAvoidanceOn(){
		this.m_iFlags |= BehaviorType.wall_avoidance;
	}
	wallAvoidanceOff(){
		if(this.on(BehaviorType.wall_avoidance)){
			this.m_iFlags ^= BehaviorType.wall_avoidance;
		}
	}
	followPathOn(){
		this.m_iFlags |= BehaviorType.follow_path;
	}
	followPathOff(){
		if(this.on(BehaviorType.follow_path)){
			this.m_iFlags ^= BehaviorType.follow_path;
		}
	}
	isInterposeOn(){
		return this.on(BehaviorType.interpose);
	}
	interposeOn(v1, v2){
		this.m_iFlags |= BehaviorType.interpose;
		this.m_pTargetAgent1 = v1;
		this.m_pTargetAgent2 = v2;
	}
	interposeOff(){
		if(this.on(BehaviorType.interpose)){
			this.m_iFlags ^= BehaviorType.interpose;
		}
	}
	isHideOn(){
		return this.on(BehaviorType.hide);
	}
	hideOn(v){
		this.m_iFlags |= BehaviorType.hide;
		this.m_pTargetAgent1 = v;
	}
	hideOff(){
		if(this.on(BehaviorType.hide)){
			this.m_iFlags ^= BehaviorType.hide;
		}
	}
	offsetPursuitOn(v1, offset){
		this.m_iFlags |= BehaviorType.offset_pursuit;
		this.m_pTargetAgent1 = v1;
		this.m_vOffset = offset;
	}
	offsetPursuitOff(){
		if(this.on(BehaviorType.offset_pursuit)){
			this.m_iFlags ^= BehaviorType.offset_pursuit;
		}
	}
	flockingOn(){
		this.cohesionOn();
		this.alignmentOn();
		this.separationOn();
		this.wanderOn();
	}
	flockingOff(){
		this.cohensionOff();
		this.alignmentOff();
		this.separationOff();
		this.wanderOff();
	}
	dBoxLength(){
		return this.m_dDBoxLength;
	}
	getFeelers(){
		return this.m_Feelers;
	}
	wanderJitter(){
		return this.m_dWanderJitter;
	}
	wanderDistance(){
		return this.m_dWanderDistance;
	}
	wanderRadius(){
		return this.m_dWanderRadius;
	}
	separationWeight(){
		return this.m_dWeightSeparation;
	}
	alignmentWeight(){
		return this.m_dWeightAlignment;
	}
	cohensionWeight(){
		return this.m_dWeightCohesion;
	}
	calculate(){
		this.m_vSteeringForce.zero();
		if(!this.isSpacePartitioningOn()){
			if(this.on(BehaviorType.separation) || this.on(BehaviorType.allignment) || this.on(BehaviorType.cohesion)){
				this.m_pVehicle.world().tagVehiclesWithinViewRange(this.m_pVehicle, this.m_dViewDistance);
			}
		}else{
			if(this.on(BehaviorType.separation) || this.on(BehaviorType.allignment) || this.on(BehaviorType.cohesion)){
				this.m_pVehicle.world().cellSpace().calculateNeighbors(this.m_pVehicle.pos(), this.m_dViewDistance);
			}
		}
		switch(this.m_SummingMethod){
			case 'weighted_average':
				this.m_vSteeringForce = this.calculateWeightedSum();
				break;
			case 'prioritized':
				this.m_vSteeringForce = this.calculatePrioritized();
				break;
			case 'dithered':
				this.m_vSteeringForce = this.calculateDithered();
				break;
			default:
				this.m_vSteeringForce = new Vector2D(0, 0);
		}
		return this.m_vSteeringForce;
	}
	accumulateForce(runningTot, forceToAdd){
		let magnitudeSoFar = runningTot.length();
		let magnitudeRemaining = this.m_pVehicle.maxForce() - magnitudeSoFar;
		let returnForce = new Vector2D();
		if(magnitudeRemaining <= 0){
			return false;
		}
		let magnitudeToAdd = forceToAdd.length();
		if(magnitudeToAdd < magnitudeRemaining){
			returnForce = runningTot.add(forceToAdd);
		}else{
			returnForce = runningTot.add(vec2dNormalize(forceToAdd).crossNum(magnitudeRemaining));
		}
		return returnForce;
	}
	calculatePrioritized(){
		let force = new Vector2D();
		if(this.on(BehaviorType.wall_avoidance)){
			force = this.wallAvoidance(this.m_pVehicle.world().walls()).crossNum(this.m_dWeightWallAvoidance);
			if(!this.accumulateForce(this.m_vSteeringForce, force)){
				return this.m_vSteeringForce;
			}else{
				this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
			}
		}
		if(this.on(BehaviorType.obstacle_avoidance)){
			force = this.obstacleAvoidance(this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightObstacleAvoidance);
			if(!this.accumulateForce(this.m_vSteeringForce, force)){
				return this.m_vSteeringForce;
			}else{
				this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
			}
		}
		if(this.on(BehaviorType.evade)){
			if(this.m_pTargetAgent1){
				force = this.evade(this.m_pTargetAgent1).crossNum(this.m_dWeightEvade);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
		}
		if(this.on(BehaviorType.flee)){
			force = this.flee(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightFlee);
			if(!this.accumulateForce(this.m_vSteeringForce, force)){
				return this.m_vSteeringForce;
			}else{
				this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
			}
		}
		if(!this.isSpacePartitioningOn()){
			if(this.on(BehaviorType.separation)){
				force = this.separation(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
			if(this.on(BehaviorType.allignment)){
				force = this.allignment(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
			if(this.on(BehaviorType.cohesion)){
				force = this.cohesion(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
		}else{
			if(this.on(BehaviorType.separation)){
				force = this.separationPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
			if(this.on(BehaviorType.allignment)){
				force = this.allignmentPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
			if(this.on(BehaviorType.cohesion)){
				force = this.cohesionPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
		}
		if(this.on(BehaviorType.seek)){
			force = this.seek(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightSeek);
			if(!this.accumulateForce(this.m_vSteeringForce, force)){
				return this.m_vSteeringForce;
			}else{
				this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
			}
		}
		if(this.on(BehaviorType.arrive)){
			force = this.arrive(this.m_pVehicle.world().crosshair(), this.m_Deceleration).crossNum(this.m_dWeightArrive);
			if(!this.accumulateForce(this.m_vSteeringForce, force)){
				return this.m_vSteeringForce;
			}else{
				this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
			}
		}
		if(this.on(BehaviorType.wander)){
			force = this.wander().crossNum(this.m_dWeightWander);
			if(!this.accumulateForce(this.m_vSteeringForce, force)){
				return this.m_vSteeringForce;
			}else{
				this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
			}
		}
		if(this.on(BehaviorType.pursuit)){
			if(this.m_pTargetAgent1){
				force = this.pursuit(this.m_pTargetAgent1).crossNum(this.m_dWeightPursuit);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
		}
		if(this.on(BehaviorType.offset_pursuit)){
			if(this.m_pTargetAgent1 && !this.m_vOffset.isZero()){
				force = this.offsetPursuit(this.m_pTargetAgent1, this.m_vOffset);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
		}
		if(this.on(BehaviorType.interpose)){
			if(this.m_pTargetAgent1 && this.m_pTargetAgent2){
				force = this.interpose(this.m_pTargetAgent1, this.m_pTargetAgent2).crossNum(this.m_dWeightInterpose);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
		}
		if(this.on(BehaviorType.hide)){
			if(this.m_pTargetAgent1){
				force = this.hide(this.m_pTargetAgent1, this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightHide);
				if(!this.accumulateForce(this.m_vSteeringForce, force)){
					return this.m_vSteeringForce;
				}else{
					this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
				}
			}
		}
		if(this.on(BehaviorType.follow_path)){
			force = this.followPath().crossNum(this.m_dWeightFollowPath);
			if(!this.accumulateForce(this.m_vSteeringForce, force)){
				return this.m_vSteeringForce;
			}else{
				this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
			}
		}
		return this.m_vSteeringForce;
	}
	calculateWeightedSum(){
		if(this.on(BehaviorType.wall_avoidance)){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.wallAvoidance(this.m_pVehicle.world().walls()).crossNum(this.m_dWeightWallAvoidance));
		}
		if(this.on(BehaviorType.obstacle_avoidance)){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.obstacleAvoidance(this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightObstacleAvoidance));
		}
		if(this.on(BehaviorType.evade)){
			if(this.m_pTargetAgent1){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.evade(this.m_pTargetAgent1).crossNum(this.m_dWeightEvade));
			}
		}
		if(!this.isSpacePartitioningOn()){
			if(this.on(BehaviorType.separation)){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.separation(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation));
			}
			if(this.on(BehaviorType.allignment)){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignment(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment));
			}
			if(this.on(BehaviorType.cohesion)){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesion(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion));
			}
		}else{
			if(this.on(BehaviorType.separation)){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.separationPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation));
			}
			if(this.on(BehaviorType.allignment)){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignmentPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment));
			}
			if(this.on(BehaviorType.cohesion)){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesionPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion));
			}
		}
		if(this.on(BehaviorType.wander)){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.wander().crossNum(this.m_dWeightWander));
		}
		if(this.on(BehaviorType.seek)){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.seek(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightSeek));
		}
		if(this.on(BehaviorType.flee)){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.flee(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightFlee));
		}
		if(this.on(BehaviorType.arrive)){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.arrive(this.m_pVehicle.world().crosshair(), this.m_Deceleration).crossNum(this.m_dWeightArrive));
		}
		if(this.on(BehaviorType.pursuit)){
			if(this.m_pTargetAgent1){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.pursuit(this.m_pTargetAgent1).crossNum(this.m_dWeightPursuit));
			}
		}
		if(this.on(BehaviorType.offset_pursuit)){
			if(this.m_pTargetAgent1 && !this.m_vOffset.isZero()){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.offsetPursuit(this.m_pTargetAgent1).crossNum(this.m_dWeightPursuit));
			}
		}
		if(this.on(BehaviorType.interpose)){
			if(this.m_pTargetAgent1 && this.m_pTargetAgent2){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.interpose(this.m_pTargetAgent1, this.m_pTargetAgent2).crossNum(this.m_dWeightInterpose));
			}
		}
		if(this.on(BehaviorType.hide)){
			if(this.m_pTargetAgent1){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.hide(this.m_pTargetAgent1, this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightHide));
			}
		}
		if(this.on(BehaviorType.follow_path)){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.followPath().crossNum(this.m_dWeightFollowPath));
		}
		this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
		return this.m_vSteeringForce;
	}
	calculateDithered(){
		this.m_vSteeringForce.zero();
		if(this.on(BehaviorType.wall_avoidance) && Math.random() < PRM.prWallAvoidance){
			this.m_vSteeringForce = this.wallAvoidance(this.m_pVehicle.world().walls()).crossNum(this.m_dWeightWallAvoidance / PRM.prWallAvoidance);
			if(!this.m_vSteeringForce.isZero()){
				this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.obstacle_avoidance) && Math.random() < PRM.prObstacleAvoidance){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.obstacleAvoidance(this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightObstacleAvoidance / PRM.prObstacleAvoidance));
			if(!this.m_vSteeringForce.isZero()){
				this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
				return this.m_vSteeringForce;
			}
		}
		if(this.isSpacePartitioningOn()){
			if(this.on(BehaviorType.separation) && Math.random() < PRM.prSeparation){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.separation(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation / PRM.prSeparation));
				if(!this.m_vSteeringForce.isZero()){
					this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
					return this.m_vSteeringForce;
				}
			}
			if(this.on(BehaviorType.allignment) && Math.random() < PRM.prAlignment){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignment(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment / PRM.prAlignment));
				if(!this.m_vSteeringForce.isZero()){
					this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
					return this.m_vSteeringForce;
				}
			}
			if(this.on(BehaviorType.cohesion) && Math.random() < PRM.cohesion){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesion(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion / PRM.prCohesion));
				if(!this.m_vSteeringForce.isZero()){
					this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
					return this.m_vSteeringForce;
				}
			}
		}else{
			if(this.on(BehaviorType.separation) && Math.random() < PRM.prSeparation){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.separationPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation / PRM.prSeparation));
				if(!this.m_vSteeringForce.isZero()){
					this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
					return this.m_vSteeringForce;
				}
			}
			if(this.on(BehaviorType.allignment) && Math.random() < PRM.prAlignment){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignmentPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment / PRM.prAlignment));
				if(!this.m_vSteeringForce.isZero()){
					this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
					return this.m_vSteeringForce;
				}
			}
			if(this.on(BehaviorType.cohesion) && Math.random() < PRM.cohesion){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesionPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion / PRM.prCohesion));
				if(!this.m_vSteeringForce.isZero()){
					this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
					return this.m_vSteeringForce;
				}
			}
		}
		if(this.on(BehaviorType.flee) && Math.random() < PRM.prFlee){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.flee(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightFlee / PRM.prFlee));
			if(!this.m_vSteeringForce.isZero()){
				this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.evade) && Math.random() < PRM.prEvade){
			if(this.m_pTargetAgent1){
				this.m_vSteeringForce = this.m_vSteeringForce.add(this.evade(this.m_pTargetAgent1).crossNum(this.m_dWeightEvade / PRM.prEvade));
				if(!this.m_vSteeringForce.isZero()){
					this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
					return this.m_vSteeringForce;
				}
			}
		}
		if(this.on(BehaviorType.wander) && Math.random() < PRM.prWander){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.wander().crossNum(this.m_dWeightWander / PRM.prWander));
			if(!this.m_vSteeringForce.isZero()){
				this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.seek) && Math.random() < PRM.prSeek){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.seek(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightSeek / PRM.prSeek));
			if(!this.m_vSteeringForce.isZero()){
				this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
				return this.m_vSteeringForce;
			}
		}
		if(this.on(BehaviorType.arrive) && Math.random() < PRM.prArrive){
			this.m_vSteeringForce = this.m_vSteeringForce.add(this.arrive(this.m_pVehicle.world().crosshair(), this.m_Deceleration).crossNum(this.m_dWeightArrive / PRM.prArrive));
			if(!this.m_vSteeringForce.isZero()){
				this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
				return this.m_vSteeringForce;
			}
		}
		return this.m_vSteeringForce;
	}
	seek(targetPos){
		let desiredVelocity = vec2dNormalize(targetPos.add(this.m_pVehicle.pos().getReverse())).crossNum(this.m_pVehicle.maxSpeed());
		return desiredVelocity.add(this.m_pVehicle.velocity().getReverse());
	}
	flee(targetPos){
		let panicDistanceSq = 100 * 100;
		if(targetPos.add(this.m_pVehicle.pos().getReverse()).length() > panicDistanceSq){
			return new Vector2D(0, 0);
		}else{
			let desiredVelocity = vec2dNormalize(this.m_pVehicle.pos().add(targetPos.getReverse())).crossNum(this.m_pVehicle.maxSpeed());
			return desiredVelocity.add(this.m_pVehicle.velocity().getReverse());
		}
	}
	arrive(targetPos, deceleration){
		let toTarget = targetPos.add(this.m_pVehicle.pos().getReverse());
		let dist = toTarget.length();
		if(dist > 0){
			let decelerationTweaker = 0.3;
			let speed = dist / (deceleration * decelerationTweaker);
			speed = Math.min(speed, this.m_pVehicle.maxSpeed());
			let desiredVelocity = toTarget.crossNum(speed / dist);
			return desiredVelocity.add(this.m_pVehicle.velocity().getReverse());
		}
		return new Vector2D(0, 0);
	}
	pursuit(evader){
		let toEvader = evader.pos().add(this.m_pVehicle.pos().getReverse());
		let relativeHeading = this.m_pVehicle.heading().dot(evader.heading());
		if(toEvader.dot(this.m_pVehicle.heading()) > 0 && relativeHeading < -0.95){
			return this.seek(evader.pos());
		}
		let lookAheadTime = toEvader.length() / (this.m_pVehicle.maxSpeed() + evader.speed());
		return this.seek(evader.pos().add(evader.velocity().crossNum(lookAheadTime)));
	}
	evade(pursuer){
		let toPursuer = pursuer.pos().add(this.m_pVehicle.pos().getReverse());
		let thetaRange = 100;
		if(toPursuer.lengthSq() > thetaRange * thetaRange){
			return new Vector2D(0, 0);
		}
		let lookAheadTime = toPursuer.length() / (this.m_pVehicle.maxSpeed() + pursuer.speed());
		return this.flee(pursuer.pos().add(pursuer.velocity().crossNum(lookAheadTime)));
	}
	wander(){
		let jitterThisTimeSlice = this.m_dWanderJitter * this.m_pVehicle.timeElapsed();
		this.m_vWanderTarget = this.m_vWanderTarget.add(new Vector2D(randomClamped() * jitterThisTimeSlice, randomClamped() * jitterThisTimeSlice));
		this.m_vWanderTarget.normalize();
		this.m_vWanderTarget =this.m_vWanderTarget.crossNum(this.m_dWanderRadius);
		let target = this.m_vWanderTarget.add(new Vector2D(this.m_dWanderDistance, 0));
		let Target = pointToWorldSpace(target, this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
		return Target.add(this.m_pVehicle.pos().getReverse());
	}
	obstacleAvoidance(obstacles){
		this.m_dDBoxLength = PRM.MinDetectionBoxLength + (this.m_pVehicle.speed() / this.m_pVehicle.maxSpeed()) * PRM.MinDetectionBoxLength;
		this.m_pVehicle.world().tagObstaclesWithinViewRange(this.m_pVehicle, this.m_dDBoxLength);
		let closestIntersectingObstacle = null;
		let distToclosestIP = MaxDouble;
		let localPosOfClosestObstacle = null;
		for(let i = 0; i < obstacles.length; i++){
			let curOb = obstacles[i];
			if(curOb.isTagged()){
				let localPos = pointToLocalSpace(curOb.pos(), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
				if(localPos.x >= 0){
					let expandedRadius = curOb.bRadius() + this.m_pVehicle.bRadius();
					if(Math.abs(localPos.y) < expandedRadius){
						let cx = localPos.x;
						let cy = localPos.y;
						let sqrtPart = Math.sqrt(expandedRadius * expandedRadius - cy * cy);
						let ip = cx - sqrtPart;
						if(ip <= 0){
							ip = cx + sqrtPart;
						}
						if(ip < distToclosestIP){
							distToclosestIP = ip;
							closestIntersectingObstacle = curOb;
							localPosOfClosestObstacle = localPos;
						}
					}
				}
			}
		}
		let steeringForce = new Vector2D(0, 0);
		if(closestIntersectingObstacle){
			let multiplier = 1 + (this.m_dDBoxLength - localPosOfClosestObstacle.x) / this.m_dDBoxLength;
			steeringForce.y = (closestIntersectingObstacle.bRadius() - localPosOfClosestObstacle.y) * multiplier;
			let brakingWeight = 0.2;
			steeringForce.x = (closestIntersectingObstacle.bRadius() - localPosOfClosestObstacle.x) * brakingWeight;
		}
		return vectorToWorldSpace(steeringForce, this.m_pVehicle.heading(), this.m_pVehicle.side());
	}
	wallAvoidance(walls){
		this.createFeelers();
		let distToThisIP = 0;
		let distToClosestIP = MaxDouble;
		let closestWall = -1;
		let steeringForce = new Vector2D();
		let point = new Vector2D();
		let closestPoint = new Vector2D();
		for(let flr = 0; flr < this.m_Feelers.length; flr++){
			for(let w = 0; w < walls.length; w++){
				let result = lineIntersection2D(this.m_pVehicle.pos(), this.m_Feelers[flr], walls[w].from(), walls[w].to(), distToThisIP, point);
				distToThisIP = result.dist;
				point = result.point;
				if(result.result){
					if(distToThisIP < distToClosestIP){
						distToClosestIP = distToThisIP;
						closestWall = w;
						closestPoint = point;
					}
				}
			}
			if(closestWall >= 0){
				let overShoot = this.m_Feelers[flr].add(closestPoint.getReverse());
				steeringForce = walls[closestWall].normal().crossNum(overShoot.length());
			}
		}
		return steeringForce;
	}
	separation(neighbours){
		let steeringForce = new Vector2D();
		for(let a = 0; a < neighbours.length; a++){
			if(neighbours[a] != this.m_pVehicle && neighbours[a].isTagged() && neighbours[a] != this.m_pTargetAgent1){
				let toAgent = this.m_pVehicle.pos().add(neighbours[a].pos().getReverse());
				steeringForce = steeringForce.add(vec2dNormalize(toAgent).crossNum(1 / toAgent.length()));
			}
		}
		return steeringForce;
	}
	allignment(neighbours){
		let averageHeading = new Vector2D();
		let neighbourCount = 0;
		for(let a = 0; a < neighbours.length; a++){
			if(neighbours[a] != this.m_pVehicle && neighbours[a].isTagged() && neighbours[a] != this.m_pTargetAgent1){
				averageHeading = averageHeading.add(neighbours[a].heading());
				++neighbourCount;
			}
		}
		if(neighbourCount > 0){
			averageHeading.crossNum(1 / neighbourCount);
			averageHeading = averageHeading.add(this.m_pVehicle.heading().getReverse());
		}
		return averageHeading;
	}
	cohesion(neighbours){
		let centerOfMass = new Vector2D();
		let steeringForce = new Vector2D();
		let neighbourCount = 0;
		for(let a = 0; a < neighbours.length; a++){
			if(neighbours[a] != this.m_pVehicle && neighbours[a].isTagged() && neighbours[a] != this.m_pTargetAgent1){
				centerOfMass = centerOfMass.add(neighbours[a].pos());
				++neighbourCount;
			}
		}
		if(neighbourCount > 0){
			centerOfMass.crossNum(1 / neighbourCount);
			steeringForce = this.seek(centerOfMass);
		}
		return vec2dNormalize(steeringForce);
	}
	separationPlus(neighbours){
		let steeringForce = new Vector2D();
		for(let i = 0; i < this.m_pVehicle.world().cellSpace().length; i++){
			let pV = this.m_pVehicle.world().cellSpace()[i];
			if(pV != this.m_pVehicle){
				let toAgent = this.m_pVehicle.pos().add(pv.pos().getReverse());
				steeringForce = steeringForce.add(vec2dNormalize(toAgent).crossNum(1 / toAgent.length()));
			}
		}
		return steeringForce;
	}
	allignmentPlus(neighbours){
		let averageHeading = new Vector2D();
		let neighbourCount = 0;
		for(let i = 0; i < this.m_pVehicle.world().cellSpace().length; i++){
			let pV = this.m_pVehicle.world().cellSpace()[i];
			if(pV != this.m_pVehicle){
				averageHeading = averageHeading.add(pV.heading());
				neighbourCount++;
			}
		}
		if(neighbourCount > 0){
			averageHeading = averageHeading.crossNum(1 / neighbourCount);
			averageHeading = averageHeading.add(this.m_pVehicle.heading().getReverse());
		}
		return averageHeading;
	}
	cohesionPlus(neighbours){
		let centerOfMass = new Vector2D();
		let steeringForce = new Vector2D();
		let neighbourCount = 0;
		for(let i = 0; i < this.m_pVehicle.world().cellSpace().length; i++){
			let pV = this.m_pVehicle.world().cellSpace()[i];
			if(pV != this.m_pVehicle){
				centerOfMass = centerOfMass.add(pV.pos());
				neighbourCount++;
			}
		}
		if(neighbourCount > 0){
			centerOfMass = centerOfMass.crossNum(1 / neighbourCount);
			steeringForce = this.seek(centerOfMass);
		}
		return vec2dNormalize(steeringForce);
	}
	interpose(agentA, agentB){
		let midPoint = agentA.pos().add(agentB.pos()).crossNum(1 / 2);
		let timeToReachMidPoint = vec2DDistance(this.m_pVehicle.pos(), midPoint) / this.m_pVehicle.maxSpeed();
		let aPos = agentA.pos().add(agentA.velocity().crossNum(timeToReachMidPoint));
		let bPos = agentB.pos().add(agentB.velocity().crossNum(timeToReachMidPoint));
		midPoint = aPos.add(bPos).crossNum(1 / 2);
		return this.arrive(midPoint, fast);
	}
	hide(hunter, obstacles){
		let distToClosest = MaxDouble;
		let bestHidingSpot = new Vector2D();
		let closest;
		for(let i = 0; i < obstacles.length; i++){
			let curOb = obstacles[i];
			let hidingSpot = this.getHidingPosition(curOb.pos(), curOb.bRadius(), hunter.pos());
			let dist = vec2DDistanceSq(hidingSpot, this.m_pVehicle.pos());
			if(dist < distToClosest){
				distToClosest = dist;
				bestHidingSpot = hidingSpot;
				closest = curOb;
			}
		}
		if(distToClosest == MaxDouble){
			return this.evade(hunter);
		}
		return arrive(bestHidingSpot, fast);
	}
	getHidingPosition(posOb, radiusOb, posHunter){
		const DistanceFromBoundary = 30;
		let distAway = radiusOb + DistanceFromBoundary;
		let toOb = vec2dNormalize(posOb.add(posHunter.getReverse()));
		return toOb.crossNum(distAway).add(posOb);
	}
	followPath(){
		if(vec2DDistanceSq(this.m_pPath.currentWaypoint(), this.m_pVehicle.pos()) < this.m_dWaypointSeekDistSq){
			this.m_pPath.setNextWaypoint();
		}
		if(!this.m_pPath.finished()){
			return this.seek(this.m_pPath.currentWaypoint());
		}else{
			return this.arrive(this.m_pPath.currentWaypoint(), normal);
		}
	}
	offsetPursuit(leader, offset){
		let worldOffsetPos = pointToWorldSpace(offset, leader.heading(), leader.side(), leader.pos());
		let toOffset = worldOffsetPos.add(this.m_pVehicle.pos().getReverse());
		let lookAheadTime = toOffset.length() / (this.m_pVehicle.maxSpeed() + leader.speed());
		return this.arrive(worldOffsetPos.add(leader.velocity().crossNum(lookAheadTime)), fast);
	}
	createFeelers(){
		this.m_Feelers[0] = this.m_pVehicle.pos().add(this.m_pVehicle.heading().crossNum(this.m_dWallDetectionFeelerLength));
		let temp = this.m_pVehicle.heading().clone();
		vec2dRotateAroundOrigin(temp, Math.PI * 7 / 4);
		this.m_Feelers[1] = this.m_pVehicle.pos().add(temp.crossNum(this.m_dWallDetectionFeelerLength / 2));
		temp = this.m_pVehicle.heading().clone();
		vec2dRotateAroundOrigin(temp, Math.PI * 1 / 4);
		this.m_Feelers[2] = this.m_pVehicle.pos().add(temp.crossNum(this.m_dWallDetectionFeelerLength / 2));
	}
}