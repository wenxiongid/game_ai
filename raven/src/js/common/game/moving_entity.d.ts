import IBaseGameEntity from "./base_game_entity";
import IVector2D from "../2D/Vector2D/index.d";

export default interface IMovingEntity extends IBaseGameEntity {
  m_vVelocity: IVector2D 
  m_vHeading: IVector2D
  m_vSide: IVector2D
  m_dMass: number
  m_dMaxSpeed: number
  m_dMaxForce: number
  m_dMaxTurnRate: number
  velocity(): IVector2D
  setVelocity(newVel: IVector2D): void
  mass(): number
  side(): IVector2D
  maxSpeed(): number
  setMaxSpeed(newSpeed: number): void
  maxForce(): number
  setMaxForce(mf: number): void
  speedSq(): number
  speed(): number
  isSpeedMaxOut(): boolean
  heading(): IVector2D
  setHeading(newHeading: IVector2D): void
  rotateHeadingToFacePosition(target: IVector2D): boolean
  maxTurnRate(): number
  setMaxTurnRate(val: number): void
}