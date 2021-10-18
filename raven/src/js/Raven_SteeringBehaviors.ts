import Vector2D, { vec2dNormalize } from "./common/2D/Vector2D"
import { randFloat } from "./common/misc/utils"
import { ArriveWeight, SeekWeight, SeparationWeight, ViewDistance, WallAvoidanceWeight, WallDetectionFeelerLength, WanderWeight } from "./config"
import IRaven_Bot from "./Raven_Bot/index.d"
import Raven_Game from "./raven_game"

const WanderRad = 1.2
const WanderDist = 2.0
const WanderJitterPerSec = 40

export enum summing_method {
  weighted_average,
  prioritized,
  dithered
}

enum behavior_type {
  none               = 0x00000,
  seek               = 0x00002,
  arrive             = 0x00008,
  wander             = 0x00010,
  separation         = 0x00040,
  wall_avoidance     = 0x00200,
}

enum Deceleration {
  slow = 3,
  normal = 2,
  fast = 1
}

export default class Raven_Steering {
  private m_pRaven_Bot: IRaven_Bot
  private m_pWorld: Raven_Game

  private m_vSteeringForce: Vector2D

  private m_pTargetAgent1: IRaven_Bot
  private m_pTargetAgent2: IRaven_Bot

  private m_vTarget: Vector2D

  private m_Feelers: Vector2D[]
  private m_dWallDetectionFeelerLength: number

  private m_vWanderTarget: Vector2D

  private m_dWanderJitter: number
  private m_dWanderRadius: number
  private m_dWanderDistance: number

  private m_dWeightSeparation: number
  private m_dWeightWander: number
  private m_dWeightWallAvoidance: number
  private m_dWeightSeek: number
  private m_dWeightArrive: number

  private m_dViewDistance: number
  private m_iFlags: number
  private m_Deceleration: Deceleration
  private m_bCellSpaceOn: boolean
  private m_SummingMethod: summing_method
  private on(bt: behavior_type) { return (this.m_iFlags & bt) === bt }
  private accumulateForce(sf: Vector2D, forceToAdd: Vector2D): boolean {
    const magnitudeSoFar = sf.length()
    const magnitudeRemaining = this.m_pRaven_Bot.maxForce() - magnitudeSoFar
    if(magnitudeRemaining < 0) return false
    let magnitudeToAdd = forceToAdd.length()
    if(magnitudeToAdd < magnitudeRemaining) {
      sf.x += forceToAdd.x
      sf.y += forceToAdd.y
    } else {
      magnitudeToAdd = magnitudeRemaining
      const addForce= vec2dNormalize(forceToAdd).crossNum(magnitudeToAdd)
      sf.x += addForce.x
      sf.y += addForce.y
    }
    return true
  }
  private createFeelers() {}

  /* .......................................................

                BEGIN BEHAVIOR DECLARATIONS

  .......................................................*/

  private seek(target: Vector2D):Vector2D {}
  private arrive(target: Vector2D, decelertion: Deceleration): Vector2D {}
  private wander(): Vector2D {}
  private wallAvoidance(walls): Vector2D {}
  private Separation(agents: IRaven_Bot[]): Vector2D {}

  /* .......................................................

                    END BEHAVIOR DECLARATIONS

  .......................................................*/

  private calculatePrioritized(): Vector2D {}
  constructor(world: Raven_Game, agent: IRaven_Bot) {
    this.m_pWorld = world
    this.m_pRaven_Bot = agent
    this.m_iFlags = 0
    this.m_dWeightSeparation = SeparationWeight
    this.m_dWeightWander = WanderWeight
    this.m_dWeightWallAvoidance = WallAvoidanceWeight
    this.m_dViewDistance = ViewDistance
    this.m_dWallDetectionFeelerLength = WallDetectionFeelerLength
    this.m_Deceleration = Deceleration.normal
    this.m_pTargetAgent1 = null
    this.m_pTargetAgent2 = null
    this.m_dWanderDistance = WanderDist
    this.m_dWanderJitter = WanderJitterPerSec
    this.m_dWanderRadius = WanderRad
    this.m_dWeightSeek = SeekWeight
    this.m_dWeightArrive = ArriveWeight
    this.m_bCellSpaceOn = false
    this.m_SummingMethod = summing_method.prioritized

    const theta = randFloat() * 2 * Math.PI
    this.m_vWanderTarget = new Vector2D(this.m_dWanderRadius * Math.cos(theta), this.m_dWanderRadius * Math.sin(theta))
  }
  calculate(): Vector2D {
    this.m_vSteeringForce.zero()
    if(this.on(behavior_type.separation)) {
      this.m_pWorld.tagRaven_BotsWithinViewRange(this.m_pRaven_Bot, this.m_dViewDistance)
    }
    this.m_vSteeringForce = this.calculatePrioritized()
    return this.m_vSteeringForce
  }
  forwardComponent(): number {
    return this.m_pRaven_Bot.heading().dot(this.m_vSteeringForce)
  }
  sideComponent(): number {
    return this.m_pRaven_Bot.side().dot(this.m_vSteeringForce)
  }
  setTarget(t: Vector2D) { this.m_vTarget = t }
  target() { return this.m_vTarget }
  setTargetAgent1(agent: IRaven_Bot) { this.m_pTargetAgent1 = agent }
  setTargetAgent2(agent: IRaven_Bot) { this.m_pTargetAgent2 = agent }
  force() { return this.m_vSteeringForce }
  setSummingMethod(sm: summing_method) { this.m_SummingMethod = sm }

  seekOn() { this.m_iFlags |= behavior_type.seek }
  arriveOn() {  this.m_iFlags |= behavior_type.arrive}
  wanderOn() { this.m_iFlags |= behavior_type.wander }
  separationOn() { this.m_iFlags |= behavior_type.separation }
  wallAvoidanceOn() { this.m_iFlags |= behavior_type.wall_avoidance }

  seekOff() { if(this.on(behavior_type.seek)) this.m_iFlags ^= behavior_type.seek }
  arriveOff() { if(this.on(behavior_type.arrive)) this.m_iFlags ^= behavior_type.arrive }
  wanderOff() { if(this.on(behavior_type.wander)) this.m_iFlags ^= behavior_type.wander }
  separationOff() { if(this.on(behavior_type.separation)) this.m_iFlags ^= behavior_type.separation }
  wallAvoidanceOff() { if(this.on(behavior_type.wall_avoidance)) this.m_iFlags ^= behavior_type.wall_avoidance }

  getFeelers() { return this.m_Feelers }

  wanderJitter() { return this.m_dWanderJitter }
  wanderDistance() { return this.m_dWanderDistance }
  wanderRadius() { return this.m_dWanderRadius }

  separationWeight() { return this.m_dWeightSeparation }
}