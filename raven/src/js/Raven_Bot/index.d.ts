import IVector2D from "../common/2D/Vector2D/index.d";
import IMovingEntity from "../common/game/moving_entity.d";
import Regulator from "../common/time/regulator";
import IRaven_PathPlanner from "../navigation/Raven_PathPlanner.d";
import IRaven_Game from "../raven_game.d";
import { IRaven_SensoryMemory } from "../Raven_SensoryMemory.d";
import IRaven_TargetingSystem from "../Raven_TargetingSystem.d";
import IRaven_WeaponSystem from "../Raven_WeaponSystem.d";

export enum BotStatus {
  alive,
  dead,
  spawning
}

export default interface IRaven_Bot extends IMovingEntity {
  m_Status: BotStatus
  m_pWorld: IRaven_Game
  m_pBrain
  m_pSensoryMem: IRaven_SensoryMemory
  m_pSteering
  m_pPathPlanner: IRaven_PathPlanner
  m_pTargSys: IRaven_TargetingSystem
  m_pWeaponSys: IRaven_WeaponSystem
  m_pWeaponSelectionRegulator: Regulator
  m_pGoalArbitrationRegulator: Regulator
  m_pTargetSelectionRegulator: Regulator
  m_pTriggerTestRegulator: Regulator
  m_pVisionUpdateRegulator: Regulator
  m_iHealth: number
  m_iMaxHealth: number
  m_iScore: number
  m_vFacing: IVector2D
  m_dFieldOfView: number
  m_iNumUpdatesHitPersistant: number
  m_bPossessed: boolean
  m_vecBotVB: IVector2D[]
  m_vecBotVBTrans: IVector2D[]
  updateMovement(): void
  setUpVertexBuffer(): void
  rotateFacingTowardPosition(target: IVector2D): boolean

  health(): number
  maxHealth(): number
  reduceHealth(val: number): void
  increaseHealth(val: number): void
  restoreHealthToMaximun(): void

  score(): number
  incrementScore(): void

  facing(): IVector2D
  fieldOfView(): number

  isPossessed(): boolean
  isDead(): boolean
  isAlive(): boolean
  isSpawning(): boolean

  setSpawning(): void
  setDead(): void
  setAlive(): void

  calculateTimeToReachPosition(pos: IVector2D): number

  isAtPosition(pos: IVector2D): boolean

  fireWeapon(pos: IVector2D): void
  changeWeapon(type: number): void
  takePossession(): void
  exorcise(): void

  spawn(pos: IVector2D): void

  isReadyForTriggerUpdate(): boolean

  hasLOSto(pos: IVector2D): boolean

  canWalkTo(pos: IVector2D): boolean

  canWalkBetween(from: IVector2D, to: IVector2D): boolean

  canStepLeft(posOfStep: IVector2D): boolean
  canStepRight(posOfStep: IVector2D): boolean
  canStepForward(posOfStep: IVector2D): boolean
  canStepBackward(posOfStep: IVector2D): boolean

  getWorld(): IRaven_Game
  getSteering()
  getPathPlanner(): IRaven_PathPlanner
  getBrain()
  getTargetSys(): IRaven_TargetingSystem
  getTargetBot(): IRaven_Bot
  getWeaponSys(): IRaven_WeaponSystem
  getSensoryMem(): IRaven_SensoryMemory
}