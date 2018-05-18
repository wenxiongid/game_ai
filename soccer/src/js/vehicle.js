import gdi from './common/misc/cgdi';
import MovingEntity from './common/game/moving_entity';
import SteeringBehavior from './steering_behavior';
import Vector2D, { vec2dNormalize, wrapAround } from './common/2d/vector2d';
import PRM from './params';
import { worldTransform } from './common/2d/transformations';
import Smoother from './common/misc/smoother';

class Vehicle extends MovingEntity{
	constructor(
		world,
		position,
		rotation,
		velocity,
		mass,
		maxForce,
		maxSpeed,
		maxTurnRate,
		scale
	) {
		super(position, scale, velocity, maxSpeed, new Vector2D(Math.sin(rotation), -Math.cos(rotation)), mass, new Vector2D(scale, scale), maxTurnRate, maxForce);
		this.m_pWorld = world;
		this.m_vSmoothedHeading = new Vector2D(0, 0);
		this.m_bSmoothingOn = false;
		this.m_dTimeElapsed = 0;
		this.m_vecVehicleVB = [];
		this.initializeBuffer();
		this.m_pSteering = new SteeringBehavior(this);
		this.m_pHeadingSmoother = new Smoother(PRM.NumsamplesForSmoothing, new Vector2D(0, 0));
	}
	initializeBuffer(){
		this.m_vecVehicleVB = [new Vector2D(-4.0, 2.4), new Vector2D(4.0, 0.0), new Vector2D(-4.0, -2.4)];
	}
	update(time_elapsed){
		this.m_dTimeElapsed = time_elapsed;
		let oldPos = this.pos();
		let steeringForce = this.m_pSteering.calculate();
		let acceleration = steeringForce.crossNum(1 / this.m_dMass);
		this.m_vVelocity = this.m_vVelocity.add(acceleration.crossNum(time_elapsed));
		this.m_vVelocity.truncate(this.m_dMaxSpeed);
		this.m_vPos = this.m_vPos.add(this.m_vVelocity.crossNum(time_elapsed));
		if(this.m_vVelocity.lengthSq() > 0.00000001){
			this.m_vHeading = vec2dNormalize(this.m_vVelocity);
			this.m_vSide = this.m_vHeading.perp();
		}
		wrapAround(this.m_vPos, this.m_pWorld.cxClient(), this.m_pWorld.cyClient());
		if(this.steering().isSpacePartitioningOn()){
			this.world().cellSpace().updateEntity(this, oldPos);
		}
		if(this.isSmoothingOn()){
			this.m_vSmoothedHeading = this.m_pHeadingSmoother.update(this.heading());
		}
	}
	render(){
		let m_vecVehicleVBTrans = [];
		if(this.m_pWorld.renderNeighbors()){
			if(this.id() === 0){
				gdi.redPen();
			}else if(this.isTagged()){
				gdi.greenPen();
			}else{
				gdi.bluePen();
			}
		}else{
			gdi.bluePen();
		}

		if(this.steering().isInterposeOn()){
			gdi.redPen();
		}

		if(this.steering().isHideOn()){
			gdi.greenPen();
		}

		if(this.isSmoothingOn()){
			m_vecVehicleVBTrans = worldTransform(this.m_vecVehicleVB, this.pos(), this.smoothedHeading(), this.smoothedHeading().perp(), this.scale());
		}else{
			m_vecVehicleVBTrans = worldTransform(this.m_vecVehicleVB, this.pos(), this.heading(), this.side(), this.scale());
		}

		gdi.closedShape(m_vecVehicleVBTrans);

		if(this.id() === 0 && this.m_pWorld.viewKeys()){
			this.steering().renderAids();
		}
	}
	steering(){
		return this.m_pSteering;
	}
	world(){
		return this.m_pWorld;
	}
	smoothedHeading(){
		return this.m_vSmoothedHeading;
	}
	isSmoothingOn(){
		return this.m_bSmoothingOn;
	}
	smoothingOn(){
		this.m_bSmoothingOn = true;
	}
	smoothingOff(){
		this.m_bSmoothingOn = false;
	}
	toggleSmoothing(){
		this.m_bSmoothingOn = !this.m_bSmoothingOn;
	}
	timeElapsed(){
		return this.m_dTimeElapsed;
	}
}

export {
	Vehicle as default
};