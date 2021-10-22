import { distToLineSegment } from "../common/2D/geometry";
import Vector2D, { vec2DDistanceSq } from "../common/2D/Vector2D";
import MovingEntity from "../common/game/moving_entity";
import { MaxFloat } from "../common/misc/utils";
import IRaven_Bot from "../Raven_Bot/index.d";
import Raven_Game from "../raven_game";

export default class Raven_Projectile extends MovingEntity {
  m_iShooterID: number
  m_vTarget: Vector2D
  m_pWorld: Raven_Game
  m_vOrigin: Vector2D
  m_iDamageInflicted: number
  m_bDead: boolean
  m_bImpacted: boolean
  m_vImpactPoint: Vector2D
  m_dTimeOfCreation: number
  getClosestIntersectingBot(from: Vector2D, to: Vector2D): IRaven_Bot {
    let closestIntersectingBot: IRaven_Bot = null
    let closestSoFar = MaxFloat
    for (const curBot of this.m_pWorld.getAllBots()) {
      if(curBot.id() !== this.m_iShooterID) {
        if(distToLineSegment(from, to, curBot.pos()) < curBot.bRadius()) {
          const dist = vec2DDistanceSq(curBot.pos(), this.m_vOrigin)
          if(dist < closestSoFar) {
            closestSoFar = dist
            closestIntersectingBot = curBot
          }
        }
      }
    }
    return closestIntersectingBot
  }
  getListOfIntersectingBots(from: Vector2D, to: Vector2D): IRaven_Bot[] {
    const hits: IRaven_Bot[] = []
    for (const curBot of this.m_pWorld.getAllBots()) {
      if(curBot.id() !== this.m_iShooterID) {
        if(distToLineSegment(from, to, curBot.pos()) < curBot.bRadius()) {
          hits.push(curBot)
        }
      }
    }
    return hits
  }
  constructor(
    target: Vector2D,
    world: Raven_Game,
    shooterID: number,
    origin: Vector2D,
    heading: Vector2D,
    damage: number,
    scale: number,
    maxSpeed: number,
    mass: number,
    maxForce: number
  ) {
    super(
      origin,
      scale,
      new Vector2D(0, 0),
      maxSpeed,
      heading,
      mass,
      new Vector2D(scale, scale),
      0,
      maxForce
    )
    this.m_vTarget = target
    this.m_bDead = false
    this.m_bImpacted = false
    this.m_pWorld = world
    this.m_iDamageInflicted = damage
    this.m_vOrigin = origin
    this.m_iShooterID = shooterID
    this.m_dTimeOfCreation = (new Date()).getTime()
  }
  update() {}
  render() {}
  isDead() { return this.m_bDead }
  hasImpacted() { return this.m_bImpacted }
}