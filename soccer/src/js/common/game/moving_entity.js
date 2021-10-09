import BaseGameEntity from '../game/base_game_entity';
import C2DMatrix from '../2d/c2dmatrix';
import Vector2D from '../2d/vector2d';
import {
  clamp
} from '../misc/utils';

class MovingEntity extends BaseGameEntity {
  constructor(
    pos,
    r,
    velocity,
    maxSpeed,
    heading,
    mass,
    scale,
    turnRate,
    maxForce
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
  velocity(){
    return this.m_vVelocity;
  }
  setVelocity(newVel){
    this.m_vVelocity = newVel;
  }
  mass(){
    return this.m_dMass;
  }
  side(){
    return this.m_vSide;
  }
  maxSpeed(){
    return this.m_dMaxSpeed;
  }
  setMaxSpeed(newSpeed){
    this.m_dMaxSpeed = newSpeed;
  }
  maxForce(){
    return this.m_dMaxForce;
  }
  setMaxForce(mf){
    this.m_dMaxForce = mf;
  }
  speedSq(){
    return this.m_vVelocity.lengthSq();
  }
  speed(){
    return this.m_vVelocity.length();
  }
  isSpeedMaxOut(){
    return this.m_dMaxSpeed * this.m_dMaxSpeed >= this.speedSq();
  }
  heading(){
    return this.m_vHeading;
  }
  setHeading(newHeading){
    this.m_vHeading = newHeading;
    this.m_vSide = this.m_vHeading.perp();
  }
  rotateHeadingToFacePosition(target){
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
    rotationMatrix.rotate(angle * this.m_vHeading.sign(toTarget));
    rotationMatrix.transformVector2D(this.m_vHeading);
    rotationMatrix.transformVector2D(this.m_vVelocity);
    this.m_vSide = this.m_vHeading.perp();
    if((this.m_vHeading.x == 0 && this.m_vHeading.y == 0) || isNaN(this.m_vHeading.x)){
      console.log(toTarget, heading, angle);
    }
    return false;
  }
  maxTurnRate(){
    return this.m_dMaxTurnRate;
  }
  setMaxTurnRate(val){
    this.m_dMaxTurnRate = val;
  }
}

export default MovingEntity;