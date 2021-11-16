import { getLineSegmentCircleClosestIntersectionPoint } from "../common/2D/geometry";
import Vector2D, { vec2dNormalize } from "../common/2D/Vector2D";
import { findClosestPointOfIntersectionWithWalls } from "../common/2D/WallIntersectionTests";
import message_dispatcher from "../common/messaging/message_dispatcher";
import gdi from "../common/misc/cgdi";
import { Pellet_Damage, Pellet_Mass, Pellet_MaxForce, Pellet_MaxSpeed, Pellet_Persistance, Pellet_Scale } from "../config";
import IRaven_Bot from "../Raven_Bot/index.d";
import message_type from "../Raven_Messages";
import Raven_Projectile from "./Raven_Projectile";

export default class Pellet extends Raven_Projectile {
  m_dTimeShotIsVisible: number
  testForImpact() {
    // 开枪点到墙的撞击点
    const { result, ip } = findClosestPointOfIntersectionWithWalls(
      this.m_vOrigin,
      this.m_vPos,
      this.m_pWorld.getMap().getWalls()
    )
    this.m_vImpactPoint = ip
    this.m_bImpacted = result
    // 开枪到当前位置是否有bot中抢
    const hit = this.getClosestIntersectingBot(this.m_vOrigin, this.m_vPos)
    if(!hit) return
    
    if(result) {
      // 从开枪点到墙，是否打中最近的bot
      const { result: hitResult, intersectionPoint } = getLineSegmentCircleClosestIntersectionPoint(
        this.m_vOrigin,
        ip,
        hit.pos(),
        hit.bRadius()
      )
      if(hitResult) {
        this.m_vImpactPoint = intersectionPoint
        this.m_bImpacted = hitResult
        message_dispatcher.dispatchMessage(
          0,
          this.m_iShooterID,
          hit.id(),
          message_type.Msg_TakeThatMF,
          this.m_iDamageInflicted
        )
      }
    }
  }
  isVisibleToPlayer() {
    return (new Date()).getTime() < this.m_dTimeOfCreation + this.m_dTimeShotIsVisible * 1000
  }
  constructor(shooter: IRaven_Bot, target: Vector2D) {
    super(
      target,
      shooter.getWorld(),
      shooter.id(),
      shooter.pos(),
      shooter.facing(),
      Pellet_Damage,
      Pellet_Scale,
      Pellet_MaxSpeed,
      Pellet_Mass,
      Pellet_MaxForce
    )
    this.m_dTimeShotIsVisible = Pellet_Persistance
  }
  update() {
    if(!this.hasImpacted()) {
      const desiredVelocity = vec2dNormalize(this.m_vTarget.add(this.pos().getReverse())).crossNum(this.maxSpeed())
      const sf = desiredVelocity.add(this.velocity().getReverse())
      const accel = sf.crossNum(1 / this.m_dMass)
      this.m_vVelocity = this.m_vVelocity.add(accel)
      this.m_vVelocity.truncate(this.m_dMaxSpeed)
      this.m_vPos = this.m_vPos.add(this.m_vVelocity)
      this.testForImpact()
    } else if(!this.isVisibleToPlayer()) {
      this.m_bDead = true
    }
  }
  render() {
    if(this.isVisibleToPlayer() && this.m_bImpacted) {
      gdi.yellowPen()
      gdi.line(this.m_vOrigin, this.m_vImpactPoint)

      gdi.brownBrush()
      gdi.circle(this.m_vImpactPoint, 3)
    }
  }
}