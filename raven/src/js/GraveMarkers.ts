import { worldTransform } from "./common/2D/transformation";
import Vector2D from "./common/2D/Vector2D";
import gdi from "./common/misc/cgdi";
import { deleteItemFromArray } from "./common/misc/utils";

class GraveRecord {
  position: Vector2D
  timeCreated: number
  constructor(pos: Vector2D) {
    this.position = pos
    this.timeCreated = (new Date()).getTime()
  }
}

export default class GraveMarkers {
  m_dLifeTime: number
  m_vecRIPVB: Vector2D[]
  m_vecRIPVBTrans: Vector2D[]
  m_GraveList: GraveRecord[]
  constructor(lifetime: number) {
    this.m_dLifeTime = lifetime
    this.m_vecRIPVB = [
      new Vector2D(-4, -5),
      new Vector2D(-4, 3),
      new Vector2D(-3, 5),
      new Vector2D(-1, 6),
      new Vector2D(1, 6),
      new Vector2D(3, 5),
      new Vector2D(4, 3),
      new Vector2D(4, -5),
      new Vector2D(4, -5),
    ]
  }
  update() {
    const now = (new Date()).getTime()
    deleteItemFromArray(this.m_GraveList, (it: GraveRecord) => {
      return now - it.timeCreated > this.m_dLifeTime
    })
  }
  render() {
    const facing = new Vector2D(-1, 0)
    const scale = new Vector2D(1, 1)
    for (const it of this.m_GraveList) {
      this.m_vecRIPVBTrans = worldTransform(
        this.m_vecRIPVB,
        it.position,
        facing,
        facing.perp(),
        scale
      )
      gdi.brownPen()
      gdi.closedShape(this.m_vecRIPVBTrans)
      gdi.textColor('rgb(133, 90, 0)')
      gdi.textAtPos(it.position.x - 10, it.position.y - 5, 'RIP')
    }
  }
  addGrave(pos: Vector2D) {
    this.m_GraveList.push(new GraveRecord(pos))
  }
}