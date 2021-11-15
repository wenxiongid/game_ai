import BaseGameEntity from './base_game_entity';
import C2DMatrix from '../2D/c2dmatrix';
import Vector2D from '../2D/Vector2D';
import {
  clamp
} from '../misc/utils'
import IVector2D from '../2D/Vector2D/index.d';
import IMovingEntity from './moving_entity.d'

class MovingEntity extends BaseGameEntity implements IMovingEntity {
  m_vVelocity: IVector2D 
  m_vHeading: IVector2D
  m_vSide: IVector2D
  m_dMass: number
  m_dMaxSpeed: number
  m_dMaxForce: number
  m_dMaxTurnRate: number
  constructor(
    pos: IVector2D,
    r: number,
    velocity: IVector2D,
    maxSpeed: number,
    heading: IVector2D,
    mass: number,
    scale: IVector2D,
    turnRate: number,
    maxForce: number
  ) {
    super(0, pos, r);
    this.m_vVelocity = velocity;
    this.m_vHeading = heading;
    this.m_vSide = heading.perp();
    this.m_dMass = mass;
    this.m_dMaxSpeed = maxSpeed;
    this.m_dMaxForce = maxForce;
    this.m_dMaxTurnRate = turnRate;
    this.m_vScale = scale;
  }
  velocity(): IVector2D{
    return this.m_vVelocity;
  }
  setVelocity(newVel: IVector2D): void{
    this.m_vVelocity = newVel;
  }
  mass(): number{
    return this.m_dMass;
  }
  side(): IVector2D{
    return this.m_vSide;
  }
  maxSpeed(): number{
    return this.m_dMaxSpeed;
  }
  setMaxSpeed(newSpeed: number): void{
    this.m_dMaxSpeed = newSpeed;
  }
  maxForce(): number{
    return this.m_dMaxForce;
  }
  setMaxForce(mf: number): void{
    this.m_dMaxForce = mf;
  }
  speedSq(): number{
    return this.m_vVelocity.lengthSq();
  }
  speed(): number{
    return this.m_vVelocity.length();
  }
  isSpeedMaxOut(): boolean{
    return this.m_dMaxSpeed * this.m_dMaxSpeed >= this.speedSq();
  }
  heading(): IVector2D{
    return this.m_vHeading;
  }
  setHeading(newHeading: IVector2D): void{
    this.m_vHeading = newHeading;
    this.m_vSide = this.m_vHeading.perp();
  }
  rotateHeadingToFacePosition(target: IVector2D): boolean{
    let heading = this.m_vHeading.clone();
    let toTarget = (new Vector2D(target.x - this.m_vPos.x, target.y - this.m_vPos.y)).normalize();
    let angle = Math.acos(clamp(this.m_vHeading.dot(toTarget), -1, 1));
    let rotationMatrix = new C2DMatrix();
    if(angle < 0.00001){
      return true;
    }
    if(angle > this.m_dMaxTurnRate){
      angle = this.m_dMaxTurnRate;
    }
    console.log('<MovingEntity>::rotate', angle, this.m_vHeading)
    rotationMatrix.rotate(angle * this.m_vHeading.sign(toTarget));
    rotationMatrix.transformVector2D(this.m_vHeading);
    rotationMatrix.transformVector2D(this.m_vVelocity);
    console.log('<MovingEntity>::rotate after', this.m_vHeading)
    this.m_vSide = this.m_vHeading.perp();
    if((this.m_vHeading.x == 0 && this.m_vHeading.y == 0) || isNaN(this.m_vHeading.x)){
      console.log(toTarget, heading, angle);
    }
    return false;
  }
  maxTurnRate(): number{
    return this.m_dMaxTurnRate;
  }
  setMaxTurnRate(val: number): void{
    this.m_dMaxTurnRate = val;
  }
}

export default MovingEntity;