import IVector2D from "../2D/Vector2D/index.d"

export default class GraphNode {
  m_iIndex: number
  m_vPosition: IVector2D
  m_ExtraInfo: any
  constructor(idx?: number, pos?: IVector2D, extraInfo?: any) {
    this.m_iIndex = typeof idx === 'undefined' ? -1 : idx
    this.m_vPosition = pos || null
    this.m_ExtraInfo = extraInfo || null
  }
  index(): number {
    return this.m_iIndex
  }
  setIndex(idx: number) {
    this.m_iIndex = idx
  }
  pos(): IVector2D {
    return this.m_vPosition
  }
  setPos(pos: IVector2D) {
    this.m_vPosition = pos
  }
  extraInfo() {
    return this.m_ExtraInfo
  }
  setExtraInfo(extraInfo: any) {
    this.m_ExtraInfo = extraInfo || null
  }
}