import Vector2D from "../common/2D/Vector2D";
import gdi from "../common/misc/cgdi";
import IRaven_Bot from "../Raven_Bot/index.d";
import TYPE from "../raven_objectEnumerations";
import Trigger_Respawning from "./Trigger_Respawning";

export default class Trigger_HealthGiver extends Trigger_Respawning {
  m_iHealthGiven: number
  constructor(pos: Vector2D) {
    super(TYPE.type_health, pos, 0)
  }
  try(bot: IRaven_Bot) {
    if(this.isActive() && this.isTouchingTrigger(bot.pos(), bot.bRadius())) {
      bot.increaseHealth(this.m_iHealthGiven)
      this.deactivate()
    }
  }
  render() {
    if(this.isActive()) {
      const pos = this.pos()
      const sz = 5
      gdi.blackPen()
      gdi.whiteBrush()
      gdi.rect(pos.x - sz, pos.y - sz, pos.x + sz + 1, pos.y + sz + 1)
      gdi.redPen()
      gdi.line(new Vector2D(pos.x, pos.y - sz), new Vector2D(pos.x, pos.y + sz + 1))
      gdi.line(new Vector2D(pos.x - sz, pos.y), new Vector2D(pos.x + sz + 1, pos.y))
    }
  }
}