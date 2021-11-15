import Vector2D from "../common/2D/Vector2D";
import { findClosestPointOfIntersectionWithWalls } from "../common/2D/WallIntersectionTests";
import message_dispatcher from "../common/messaging/message_dispatcher";
import gdi from "../common/misc/cgdi";
import { Bolt_Damage, Bolt_Mass, Bolt_MaxForce, Bolt_MaxSpeed, Bolt_Scale } from "../config";
import IRaven_Bot from "../Raven_Bot/index.d";
import message_type from "../Raven_Messages";
import Raven_Projectile from "./Raven_Projectile";

export default class Bolt extends Raven_Projectile {
  testForImpact() {}
  constructor(shooter: IRaven_Bot, target: Vector2D) {
    super(
      target,
      shooter.getWorld(),
      shooter.id(),
      shooter.pos(),
      shooter.facing(),
      Bolt_Damage,
      Bolt_Scale,
      Bolt_MaxSpeed,
      Bolt_Mass,
      Bolt_MaxForce
    )
  }
  render() {
    gdi.thickGreenPen()
    gdi.line(this.pos(), this.pos().add(this.velocity().getReverse()))
  }
  update() {
    if(!this.m_bImpacted) {
      this.m_vVelocity = this.heading().crossNum(this.maxSpeed())
      this.m_vVelocity.truncate(this.m_dMaxSpeed)
      const oldPos = this.m_vPos
      const newPos = this.m_vPos.add(this.m_vVelocity)
      const hit = this.getClosestIntersectingBot(oldPos, newPos)
      this.m_vPos = newPos
      if(hit) {
        this.m_bImpacted = true
        this.m_bDead = true
        message_dispatcher.dispatchMessage(
          0,
          this.m_iShooterID,
          hit.id(),
          message_type.Msg_TakeThatMF,
          this.m_iDamageInflicted
        )
      }
      const { result, ip } = findClosestPointOfIntersectionWithWalls(oldPos, newPos, this.m_pWorld.getMap().getWalls())
      if(result) {
        this.m_bDead = true
        this.m_bImpacted = true
        this.m_vPos = ip
        return
      }
    }
  }
}