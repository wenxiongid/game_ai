import gdi from "../misc/cgdi";
import Vector2D, { vec2dNormalize } from "./Vector2D";

export default class Wall2D {
  protected m_vA: Vector2D
  protected m_vB: Vector2D
  protected m_vN: Vector2D = new Vector2D(0, 0)
  protected calculateNormal() {
    const temp = vec2dNormalize(this.m_vB.add(this.m_vA.getReverse()))
    this.m_vN.x = -temp.y
    this.m_vN.y = temp.x
  }
  constructor(a: Vector2D, b: Vector2D, n?: Vector2D) {
    this.m_vA = a
    this.m_vB = b
    if(n) {
      this.m_vN = n
    } else {
      this.calculateNormal()
    }
  }
  render(renderNomals: boolean = false) {
    gdi.line(this.m_vA, this.m_vB)
    if(renderNomals) {
      const midX = (this.m_vA.x + this.m_vB.x) / 2
      const midY = (this.m_vA.y + this.m_vB.y) / 2
      gdi.line(new Vector2D(midX, midY), new Vector2D(midX + this.m_vN.x * 5, midY + this.m_vN.y * 5))
    }
  }
  from() { return this.m_vA }
  setFrom(v: Vector2D) { this.m_vA = v; this.calculateNormal() }
  to() { return this.m_vB }
  setTo(v: Vector2D) { this.m_vB = v; this.calculateNormal() }
  normal() { return this.m_vN }
  setNormal(n: Vector2D) { this.m_vN = n }
  center() { return this.m_vA.add(this.m_vB).crossNum(1 / 2) }
}