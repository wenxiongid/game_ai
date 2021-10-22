import { IPoint } from "../2D/Vector2D/index.d";

class Mouse {
  private m_cursor: IPoint
  private handleMouseMove(e: MouseEvent) {
    this.m_cursor.x = e.pageX
    this.m_cursor.y = e.pageY
  }
  constructor() {
    this.m_cursor = {
      x: 0,
      y: 0
    }
    document.addEventListener('mousemove', this.handleMouseMove.bind(this))
  }
  pos() {
    return this.m_cursor
  }
}

export default new Mouse()