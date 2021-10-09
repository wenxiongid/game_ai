import IVector2D from "../common/2D/Vector2D/index.d";
import Regulator from "../common/time/regulator";
import IRaven_Game from "../raven_game.d";
import { IRaven_SensoryMemory } from "../Raven_SensoryMemory.d";
import IRaven_TargetingSystem from "../Raven_TargetingSystem.d";
import IRaven_WeaponSystem from "../Raven_WeaponSystem.d";
import MovingEntity from "../common/game/moving_entity";
import IRaven_Bot, { BotStatus } from "./index.d";

export default class Raven_Bot extends MovingEntity implements IRaven_Bot {
  m_Status: BotStatus
  m_pWorld: IRaven_Game
  m_pBrain
  m_pSensoryMem: IRaven_SensoryMemory
  m_pSteering
  m_pPathPlanner
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
  updateMovement(): void {}
  setUpVertexBuffer(): void {}
  rotateFacingTowardPosition(target: IVector2D): boolean {}

  health() {
    return this.m_iHealth
  }
  maxHealth() {
    return this.m_iMaxHealth
  }
  reduceHealth(val: number) { }
  increaseHealth(val: number) {}
  restoreHealthToMaximun() {}

  score() {
    return this.m_iScore
  }
  incrementScore() {
    this.m_iScore++
  }

  facing(): IVector2D {
    return this.m_vFacing
  }
  fieldOfView(): number {
    return this.m_dFieldOfView
  }

  isPossessed(): boolean {
    return this.m_bPossessed
  }
  isDead(): boolean {
    return this.m_Status === BotStatus.dead
  }
  isAlive(): boolean {
    return this.m_Status === BotStatus.alive
  }
  isSpawning(): boolean {
    return this.m_Status === BotStatus.spawning
  }

  setSpawning(): void {
    this.m_Status = BotStatus.spawning
  }
  setDead(): void {
    this.m_Status = BotStatus.dead
  }
  setAlive(): void {
    this.m_Status = BotStatus.alive
  }

  calculateTimeToReachPosition(pos: IVector2D): number {}

  isAtPosition(pos: IVector2D): boolean {}

  fireWeapon(pos: IVector2D): void {}
  changeWeapon(type: number): void {}
  takePossession(): void {}
  exorcise(): void {}

  spawn(pos: IVector2D): void {}

  isReadyForTriggerUpdate(): boolean {}

  hasLOSto(pos: IVector2D): boolean {}

  canWalkTo(pos: IVector2D): boolean {}

  canWalkBetween(from: IVector2D, to: IVector2D): boolean {}

  canStepLeft(posOfStep: IVector2D): boolean {}
  canStepRight(posOfStep: IVector2D): boolean {}
  canStepForward(posOfStep: IVector2D): boolean {}
  canStepBackward(posOfStep: IVector2D): boolean {}

  getWorld(): IRaven_Game { return this.m_pWorld }
  getSteering() { return this.m_pSteering }
  getPathPlanner() { return this.m_pPathPlanner }
  getBrain() { return this.m_pBrain }
  getTargetSys(): IRaven_TargetingSystem { return this.m_pTargSys }
  getTargetBot(): IRaven_Bot { return this.m_pTargSys.getTarget() }
  getWeaponSys(): IRaven_WeaponSystem { return this.m_pWeaponSys }
  getSensoryMem(): IRaven_SensoryMemory { return this.m_pSensoryMem }

  update(){ 
    super.update()
    this.m_pBrain.process()
    this.updateMovement()
    if(!this.isPossessed()) {
      // 更新可视物的感官记忆
      if(this.m_pVisionUpdateRegulator.isReady()) {
        this.m_pSensoryMem.updateVision()
      }
      // 在角色感知记忆中检查对手，并选择一个作为目标
      if(this.m_pTargetSelectionRegulator.isReady()) {
        this.m_pTargSys.update()
      }
      // 评估仲裁所有高层次目标
      if(this.m_pGoalArbitrationRegulator.isReady()) {
        this.m_pBrain.arbitrate()
      }
      // 选择合适的武器
      if(this.m_pWeaponSelectionRegulator.isReady()) {
        this.m_pWeaponSys.selectWeapon()
      }
      this.m_pWeaponSys.takeAimAndShoot()
    }
  }
}