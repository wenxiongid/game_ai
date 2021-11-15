import IVector2D from "../common/2D/Vector2D/index.d";
import Regulator from "../common/time/regulator";
import IRaven_Game from "../raven_game.d";
import { IRaven_SensoryMemory } from "../Raven_SensoryMemory.d";
import IRaven_TargetingSystem from "../Raven_TargetingSystem.d";
import IRaven_WeaponSystem from "../Raven_WeaponSystem.d";
import MovingEntity from "../common/game/moving_entity";
import IRaven_PathPlanner from '../navigation/Raven_PathPlanner.d'
import IRaven_Bot from "./index.d";
import Goal_Think from "../goals/Goal_Think";
import Raven_Steering from "../Raven_SteeringBehaviors";
import Vector2D, { vec2DDistance, vec2DDistanceSq, vec2dNormalize } from "../common/2D/Vector2D";
import { Bot_AimAccuracy, Bot_AimPersistance, Bot_FOV, Bot_GoalAppraisalUpdateFreq, Bot_Mass, Bot_MaxForce, Bot_MaxHeadTurnRate, Bot_MaxHealth, Bot_MaxSpeed, Bot_MemorySpan, Bot_ReactionTime, Bot_Scale, Bot_TargetingUpdateFreq, Bot_TriggerUpdateFreq, Bot_VisionUpdateFreq, Bot_WeaponSelectionFrequency, HitFlashTime } from "../config";
import { frameRate } from "../constant";
import { clamp, degsToRads } from "../common/misc/utils";
import TYPE from "../raven_objectEnumerations";
import Raven_PathPlanner from "../navigation/Raven_PathPlanner";
import Raven_TargetingSystem from "../Raven_TargetingSystem";
import Raven_WeaponSystem from "../Raven_WeaponSystem";
import Raven_SensoryMemory from "../Raven_SensoryMemory";
import ITelegram from "../common/messaging/telegram.d";
import message_type from "../Raven_Messages";
import message_dispatcher from "../common/messaging/message_dispatcher";
import C2DMatrix from "../common/2D/c2dmatrix";
import gdi from "../common/misc/cgdi";
import { worldTransform } from "../common/2D/transformation";
import userOptions from "../Raven_UserOptions";

export enum BotStatus {
  alive,
  dead,
  spawning
}

export default class Raven_Bot extends MovingEntity implements IRaven_Bot {
  m_Status: BotStatus
  m_pWorld: IRaven_Game
  m_pBrain: Goal_Think
  m_pSensoryMem: IRaven_SensoryMemory
  m_pSteering: Raven_Steering
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
  m_bHit: boolean
  m_bPossessed: boolean
  m_vecBotVB: IVector2D[]
  m_vecBotVBTrans: IVector2D[]
  constructor(world: IRaven_Game, pos: Vector2D) {
    super(
      pos,
      Bot_Scale,
      new Vector2D(0, 0),
      Bot_MaxSpeed,
      new Vector2D(1, 0),
      Bot_Mass,
      new Vector2D(Bot_Scale, Bot_Scale),
      Bot_MaxHeadTurnRate,
      Bot_MaxForce
    )
    this.m_iMaxHealth = Bot_MaxHealth
    this.m_iHealth = Bot_MaxHealth
    this.m_pSteering = null
    this.m_pWorld = world
    this.m_iNumUpdatesHitPersistant = frameRate * HitFlashTime
    this.m_bHit = false
    this.m_iScore = 0
    this.m_Status = BotStatus.spawning
    this.m_bPossessed = false
    this.m_dFieldOfView = degsToRads(Bot_FOV)

    this.setEntityType(TYPE.type_bot)
    this.setUpVertexBuffer()
    this.m_vFacing = this.m_vHeading
    this.m_pPathPlanner = new Raven_PathPlanner(this)
    this.m_pSteering = new Raven_Steering(world, this)

    this.m_pWeaponSelectionRegulator = new Regulator(Bot_WeaponSelectionFrequency)
    this.m_pGoalArbitrationRegulator = new Regulator(Bot_GoalAppraisalUpdateFreq)
    this.m_pTargetSelectionRegulator = new Regulator(Bot_TargetingUpdateFreq)
    this.m_pTriggerTestRegulator = new Regulator(Bot_TriggerUpdateFreq)
    this.m_pVisionUpdateRegulator = new Regulator(Bot_VisionUpdateFreq)

    this.m_pBrain = new Goal_Think(this)
    this.m_pTargSys = new Raven_TargetingSystem(this)
    this.m_pWeaponSys = new Raven_WeaponSystem(this, Bot_ReactionTime, Bot_AimAccuracy, Bot_AimPersistance)
    this.m_pSensoryMem = new Raven_SensoryMemory(this, Bot_MemorySpan)
  }
  updateMovement(): void {
    const force = this.m_pSteering.calculate()
    if(force.isZero()) {
      const brakingRate = 0.8
      this.m_vVelocity = this.m_vVelocity.crossNum(brakingRate)
    }
    // F = m * a
    const accel = force.crossNum(1 / this.m_dMass)
    this.m_vVelocity = this.m_vVelocity.add(accel)
    this.m_vVelocity.truncate(this.m_dMaxSpeed)
    this.m_vPos = this.m_vPos.add(this.m_vVelocity)
    if(!this.m_vVelocity.isZero()) {
      this.m_vHeading = vec2dNormalize(this.m_vVelocity)
      this.m_vSide = this.m_vHeading.perp()
    }
  }
  setUpVertexBuffer(): void {
    this.m_vecBotVB = []
    const bot = [
      new Vector2D(-3, 8),
      new Vector2D(3, 10),
      new Vector2D(3, -10),
      new Vector2D(-3, -8)
    ]
    this.m_dBoundingRadius = 0
    const scale = Bot_Scale
    for (let vtx = 0; vtx < bot.length; vtx++) {
      const v = bot[vtx];
      this.m_vecBotVB.push(v)
      if(Math.abs(v.x) * scale > this.m_dBoundingRadius) {
        this.m_dBoundingRadius = Math.abs(v.x) * scale
      }
      if(Math.abs(v.y) * scale > this.m_dBoundingRadius) {
        this.m_dBoundingRadius = Math.abs(v.y) * scale
      }
    }
  }
  // 面向转到给定位置，返回是否已转完
  rotateFacingTowardPosition(target: IVector2D): boolean {
    const toTarget = vec2dNormalize(target.add(this.m_vPos.getReverse()))
    let dot = this.m_vFacing.dot(target)
    dot = clamp(dot, -1, 1)
    let angle = Math.acos(dot)
    const weaponAimTolerance = 0.01
    if(angle < weaponAimTolerance) {
      this.m_vFacing = toTarget
      return true
    }

    if(angle > this.m_dMaxTurnRate) angle = this.m_dMaxTurnRate

    const rotationMatrix = new C2DMatrix()
    rotationMatrix.rotate(this.m_vFacing.sign(toTarget) * angle)
    rotationMatrix.transformVector2D(this.m_vFacing)
    return false
  }

  health() { return this.m_iHealth }
  maxHealth() { return this.m_iMaxHealth }
  reduceHealth(val: number) {
    this.m_iHealth -= val
    if(this.m_iHealth <= 0) {
      this.setDead()
    }
    this.m_bHit = true
    this.m_iNumUpdatesHitPersistant = frameRate * HitFlashTime
  }
  increaseHealth(val: number) {
    this.m_iHealth += val
    this.m_iHealth = clamp(this.m_iHealth, 0, this.m_iMaxHealth)
  }
  restoreHealthToMaximun() {
    this.m_iHealth = this.m_iMaxHealth
  }

  score() { return this.m_iScore }
  incrementScore() { this.m_iScore++ }

  facing(): IVector2D { return this.m_vFacing }
  fieldOfView(): number { return this.m_dFieldOfView }

  isPossessed(): boolean { return this.m_bPossessed }
  isDead(): boolean { return this.m_Status === BotStatus.dead }
  isAlive(): boolean { return this.m_Status === BotStatus.alive }
  isSpawning(): boolean { return this.m_Status === BotStatus.spawning }

  setSpawning(): void { this.m_Status = BotStatus.spawning }
  setDead(): void { this.m_Status = BotStatus.dead }
  setAlive(): void { this.m_Status = BotStatus.alive }

  calculateTimeToReachPosition(pos: IVector2D): number {
    return vec2DDistance(this.m_vPos, pos) / (this.m_dMaxSpeed * frameRate) * 2000
  }

  isAtPosition(pos: IVector2D): boolean {
    const tolerance = 10
    return vec2DDistanceSq(this.m_vPos, pos) < tolerance * tolerance
  }

  fireWeapon(pos: IVector2D): void { this.m_pWeaponSys.shootAt(pos) }
  changeWeapon(type: number): void { this.m_pWeaponSys.changeWeapon(type) }
  // 控制bot
  takePossession(): void {
    if(!(this.isSpawning() || this.isDead())) {
      this.m_bPossessed = true
      console.log(`Player Poccesses ${this.id()}`)
    }
  }
  // 释放bot
  exorcise(): void {
    this.m_bPossessed = false
    this.m_pBrain.addGoal_Explore()
    console.log(`Player is exorcised from bot ${this.id()}`)
  }

  spawn(pos: IVector2D): void {
    this.setAlive()
    this.m_pBrain.removeAllSubgoals()
    this.m_pTargSys.clearTarget()
    this.setPos(pos)
    this.m_pWeaponSys.initialize()
    this.restoreHealthToMaximun()
  }

  isReadyForTriggerUpdate(): boolean { return this.m_pTriggerTestRegulator.isReady() }

  handleMessage(msg: ITelegram): boolean {
    if(this.m_pBrain.handleMessage(msg)) return true

    switch(msg.msg) {
      // 被打到
      case message_type.Msg_TakeThatMF:
        if(this.isDead() || this.isSpawning()) return true
        this.reduceHealth(msg.extraInfo)
        if(this.isDead()) {
          message_dispatcher.dispatchMessage(0, this.id(), msg.senderID, message_type.Msg_YouGotMeYouSOB, null)
        }
        return true
      // 打死了对面
      case message_type.Msg_YouGotMeYouSOB:
        this.incrementScore()
        this.m_pTargSys.clearTarget()
        return true
      // 听到枪声
      case message_type.Msg_GunshotSound:
        this.m_pSensoryMem.updateWithSoundSource(msg.extraInfo)
        return true
      // 删除了bot
      case message_type.Msg_UserHasRemovedBot:
        const pRemovedBot = msg.extraInfo as IRaven_Bot
        this.m_pSensoryMem.removeBotFromMemory(pRemovedBot)
        if(this.m_pTargSys.getTarget().id() === pRemovedBot.id()) {
          this.m_pTargSys.clearTarget()
        }
        return true
      default:
        return false
    }
  }

  hasLOSto(pos: IVector2D): boolean {
    return this.m_pWorld.isLOSOkay(this.m_vPos, pos)
  }

  canWalkTo(pos: IVector2D): boolean {
    return !(this.m_pWorld.isPathObstructed(this.m_vPos, pos, this.bRadius()))
  }

  canWalkBetween(from: IVector2D, to: IVector2D): boolean {
    return !(this.m_pWorld.isPathObstructed(from, to, this.bRadius()))
  }

  canStepLeft(posOfStep: IVector2D): boolean {
    const stepDistance = this.bRadius() * 2
    const positionOfStep = this.pos()
      .add(this.facing().perp().crossNum(stepDistance).getReverse())
      .add(this.facing().perp().crossNum(this.bRadius()).getReverse())
    posOfStep.x = positionOfStep.x
    posOfStep.y = positionOfStep.y
    return this.canWalkTo(positionOfStep)
  }
  canStepRight(posOfStep: IVector2D): boolean {
    const stepDistance = this.bRadius() * 2
    const positionOfStep = this.pos()
      .add(this.facing().perp().crossNum(stepDistance))
      .add(this.facing().perp().crossNum(this.bRadius()))
    posOfStep.x = positionOfStep.x
    posOfStep.y = positionOfStep.y
    return this.canWalkTo(positionOfStep)
  }
  canStepForward(posOfStep: IVector2D): boolean {
    const stepDistance = this.bRadius() * 2
    const positionOfStep = this.pos()
      .add(this.facing().crossNum(stepDistance))
      .add(this.facing().crossNum(this.bRadius()))
    posOfStep.x = positionOfStep.x
    posOfStep.y = positionOfStep.y
    return this.canWalkTo(positionOfStep)
  }
  canStepBackward(posOfStep: IVector2D): boolean {
    const stepDistance = this.bRadius() * 2
    const positionOfStep = this.pos()
      .add(this.facing().crossNum(stepDistance).getReverse())
      .add(this.facing().crossNum(this.bRadius()).getReverse())
    posOfStep.x = positionOfStep.x
    posOfStep.y = positionOfStep.y
    return this.canWalkTo(positionOfStep)
  }

  getWorld(): IRaven_Game { return this.m_pWorld }
  getSteering() { return this.m_pSteering }
  getPathPlanner() { return this.m_pPathPlanner }
  getBrain() { return this.m_pBrain }
  getTargetSys(): IRaven_TargetingSystem { return this.m_pTargSys }
  getTargetBot(): IRaven_Bot { return this.m_pTargSys.getTarget() }
  getWeaponSys(): IRaven_WeaponSystem { return this.m_pWeaponSys }
  getSensoryMem(): IRaven_SensoryMemory { return this.m_pSensoryMem }

  update(){ 
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

  render() {
    this.m_iNumUpdatesHitPersistant--
    if(this.isDead() || this.isSpawning()) return

    gdi.bluePen()
    this.m_vecBotVBTrans = worldTransform(
      this.m_vecBotVB,
      this.pos(),
      this.facing(),
      this.facing().perp(),
      this.scale()
    )
    gdi.closedShape(this.m_vecBotVBTrans)

    gdi.brownBrush()
    gdi.circle(this.pos(), this.scale().x * 6)

    this.m_pWeaponSys.renderCurrentWeapon()

    if(this.m_bHit) {
      gdi.thickRedPen()
      gdi.hollowBrush()
      gdi.circle(this.pos(), this.bRadius() + 1)
      if(this.m_iNumUpdatesHitPersistant <= 0) {
        this.m_bHit = false
      }
    }

    gdi.transparentText()
    gdi.textColor(gdi.GREEN)
    if(userOptions.m_bShowBotIDs) {
      gdi.textAtPos(this.pos().x - 10, this.pos().y -20, this.id())
    }
    if(userOptions.m_bShowBotHealth) {
      gdi.textAtPos(this.pos().x - 40, this.pos().y - 5, `H: ${this.health()}`)
    }
    if(userOptions.m_bShowScore) {
      gdi.textAtPos(this.pos().x - 40, this.pos().y + 10, `Scr: ${this.score()}`)
    }
    
  }
}