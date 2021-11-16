import Vector2D, { vec2dNormalize } from "../common/2D/Vector2D";
import { findClosestPointOfIntersectionWithWalls } from "../common/2D/WallIntersectionTests";
import message_dispatcher from "../common/messaging/message_dispatcher";
import gdi from "../common/misc/cgdi";
import { Slug_Damage, Slug_Mass, Slug_MaxForce, Slug_MaxSpeed, Slug_Persistance, Slug_Scale } from "../config";
import IRaven_Bot from "../Raven_Bot/index.d";
import message_type from "../Raven_Messages";
import Raven_Projectile from "./Raven_Projectile";

export default class Slug extends Raven_Projectile {
  m_dTimeShotIsVisible: number
  testForImpact() {
    const { result, distance: distToClosestImpact , ip  } = findClosestPointOfIntersectionWithWalls(
      this.m_vOrigin,
      this.m_vPos,
      this.m_pWorld.getMap().getWalls()
    )
    this.m_bImpacted = result
    this.m_vImpactPoint = ip
    const hits = this.getListOfIntersectingBots(
      this.m_vOrigin,
      result ? ip : this.m_vPos
    )
    if(hits.length === 0) return
    for (const bot of hits) {
      message_dispatcher.dispatchMessage(
        0,
        this.m_iShooterID,
        bot.id(),
        message_type.Msg_TakeThatMF,
        this.m_iDamageInflicted
      )
    }
  }
  isVisibleToPlayer() {
    return (new Date()).getTime() < this.m_dTimeShotIsVisible * 1000 + this.m_dTimeOfCreation
  }
  constructor(shooter: IRaven_Bot, target: Vector2D) {
    super(
      target,
      shooter.getWorld(),
      shooter.id(),
      shooter.pos(),
      shooter.facing(),
      Slug_Damage,
      Slug_Scale,
      Slug_MaxSpeed,
      Slug_Mass,
      Slug_MaxForce
    )
    this.m_dTimeShotIsVisible = Slug_Persistance
  }
  update() {
    if(!this.m_bImpacted) {
      const desiredVelocity = vec2dNormalize(this.m_vTarget.add(this.pos().getReverse())).crossNum(this.maxSpeed())
      const sf = desiredVelocity.add(this.m_vVelocity.getReverse())
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
      gdi.greenPen()
      gdi.line(this.m_vOrigin, this.m_vImpactPoint)
    }
  }
}