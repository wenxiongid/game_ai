import IVector2D from "../common/2D/Vector2D/index.d";
import { vec2DDistanceSq } from "../common/2D/Vector2D";
import ITriggerRegion from "./TriggerRegion.d"

export default class TriggerRegion_Circle implements ITriggerRegion {
  m_vPos: IVector2D
  m_dRadius: number
  constructor(pos: IVector2D, radius: number) {
    this.m_vPos = pos
    this.m_dRadius = radius
  }
  isTouching(pos: IVector2D, entityRadius: number) {
    return vec2DDistanceSq(pos, this.m_vPos) < (entityRadius + this.m_dRadius)
  }
}