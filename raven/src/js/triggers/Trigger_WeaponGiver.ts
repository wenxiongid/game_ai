import { worldTransform } from "../common/2D/transformation";
import Vector2D from "../common/2D/Vector2D";
import gdi from "../common/misc/cgdi";
import IRaven_Bot from "../Raven_Bot/index.d";
import TYPE from "../raven_objectEnumerations";
import Trigger_Respawning from "./Trigger_Respawning";

const numRocketVerts = 8
const rip = [
  new Vector2D(0, 3),
  new Vector2D(1, 2),
  new Vector2D(1, 0),
  new Vector2D(2, -2),
  new Vector2D(-2, -2),
  new Vector2D(-1, 0),
  new Vector2D(-1, 2),
  new Vector2D(0, 3)
]

export default class Trigger_WeaponGiver extends Trigger_Respawning {
  numRocketVerts = 8
  constructor(type: TYPE, pos: Vector2D) {
    super(type, pos, 0)
  }
  try(bot: IRaven_Bot) {
    if(this.isActive() && this.isTouchingTrigger(bot.pos(), bot.bRadius())) {
      bot.getWeaponSys().addWeapon(this.entityType())
      this.deactivate()
    }
  }
  read() {
    // TODO
  }
  render() {
    if(this.isActive()) {
      const pos = this.pos()
      switch(this.entityType()) {
        case TYPE.type_rail_gun:
          gdi.bluePen()
          gdi.blueBrush()
          gdi.circle(pos, 3)
          gdi.thickBluePen()
          gdi.line(pos, new Vector2D(pos.x, pos.y - 9))
          break
        case TYPE.type_shotgun:
          gdi.brownPen()
          gdi.blackBrush()
          const sz = 3
          gdi.circle(new Vector2D(pos.x - sz, pos.y), sz)
          gdi.circle(new Vector2D(pos.x + sz, pos.y), sz)
          break
        case TYPE.type_rocket_launcher:
          const facing = new Vector2D(-1, 0)
          const m_vecRLVBTrans = worldTransform(rip, pos, facing, facing.perp(), new Vector2D(2.5, 2.5))
          gdi.redPen()
          gdi.closedShape(m_vecRLVBTrans)
          break
      }
    }
  }
}