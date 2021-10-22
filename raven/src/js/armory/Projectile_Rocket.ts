import Vector2D, { vec2DDistance } from "../common/2D/Vector2D";
import { findClosestPointOfIntersectionWithWalls } from "../common/2D/WallIntersectionTests";
import message_dispatcher from "../common/messaging/message_dispatcher";
import gdi from "../common/misc/cgdi";
import { Rocket_BlastRadius, Rocket_Damage, Rocket_ExplosionDecayRate, Rocket_Mass, Rocket_MaxForce, Rocket_MaxSpeed, Rocket_Scale } from "../config";
import IRaven_Bot from "../Raven_Bot/index.d";
import message_type from "../Raven_Messages";
import Raven_Projectile from "./Raven_Projectile";

export default class Rocket extends Raven_Projectile {
  m_dBlastRadius: number
  m_dCurrentBlastRadius: number
  inflictDamageOnBotsWithinBlastRadius() {
    for (const curBot of this.m_pWorld.getAllBots()) {
      if(vec2DDistance(this.pos(), curBot.pos()) < this.m_dCurrentBlastRadius + curBot.bRadius()) {
        message_dispatcher.dispatchMessage(
          0,
          this.m_iShooterID,
          curBot.id(),
          message_type.Msg_TakeThatMF,
          this.m_iDamageInflicted
        )
      }
    }
  }
  testForImpact() {
    const hit = this.getClosestIntersectingBot(
      this.m_vPos.add(this.m_vVelocity.getReverse()),
      this.m_vPos
    )
    if(hit) {
      this.m_bImpacted = true
      message_dispatcher.dispatchMessage(
        0,
        this.m_iShooterID,
        hit.id(),
        message_type.Msg_TakeThatMF,
        this.m_iDamageInflicted
      )
      this.inflictDamageOnBotsWithinBlastRadius()
    }
    const { result, distance, ip } = findClosestPointOfIntersectionWithWalls(
      this.m_vPos.add(this.m_vVelocity.getReverse()),
      this.m_vPos,
      this.m_pWorld.getMap().getWalls()
    )
    if(result) {
      this.m_bImpacted = true
      this.inflictDamageOnBotsWithinBlastRadius()
      this.m_vPos = this.m_vImpactPoint
    }
  }
  constructor(shooter: IRaven_Bot, target: Vector2D) {
    super(
      target,
      shooter.getWorld(),
      shooter.id(),
      shooter.pos(),
      shooter.facing(),
      Rocket_Damage,
      Rocket_Scale,
      Rocket_MaxSpeed,
      Rocket_Mass,
      Rocket_MaxForce
    )
    this.m_dCurrentBlastRadius = 0
    this.m_dBoundingRadius = Rocket_BlastRadius
  }
  update() {
    if(!this.m_bImpacted) {
      this.m_vVelocity = this.heading().crossNum(this.maxSpeed())
      this.m_vVelocity.truncate(this.m_dMaxSpeed)
      this.m_vPos = this.m_vPos.add(this.m_vVelocity)
      this.testForImpact()
    } else {
      this.m_dCurrentBlastRadius += Rocket_ExplosionDecayRate
      if(this.m_dCurrentBlastRadius > this.m_dBlastRadius) {
        this.m_bDead = true
      }
    }
  }
  render() {
    gdi.redPen()
    gdi.orangeBrush()
    gdi.circle(this.m_vPos, 2)

    if(this.m_bImpacted) {
      gdi.hollowBrush()
      gdi.circle(this.m_vPos, this.m_dCurrentBlastRadius)
    }
  }
}