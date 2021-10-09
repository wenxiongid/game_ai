import InvertedAABBox2D from "../common/2D/InvertedAABBox2D";
import IInvertedAABBox2D from "../common/2D/InvertedAABBox2D/index.d";
import Vector2D from "../common/2D/Vector2D";
import IVector2D from "../common/2D/Vector2D/index.d";
import ITriggerRegion from "./TriggerRegion.d";

export default class TriggerRegion_Rectangle implements ITriggerRegion {
  m_pTrigger: IInvertedAABBox2D
  constructor(topLeft: IVector2D, bottomRight: IVector2D) {
    this.m_pTrigger = new InvertedAABBox2D(topLeft, bottomRight)
  }
  isTouching(pos: IVector2D, entityRadius: number): boolean {
    const box = new InvertedAABBox2D(
      new Vector2D(pos.x - entityRadius, pos.y - entityRadius),
      new Vector2D(pos.x + entityRadius, pos.y + entityRadius)
    )
    return box.isOverlappedWith(this.m_pTrigger)
  }
}