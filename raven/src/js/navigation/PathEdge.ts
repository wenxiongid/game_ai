import IVector2D from "../common/2D/Vector2D/index.d";

export default class PathEdge {
  m_vSource: IVector2D
  m_vDestination: IVector2D
  m_iBehavior: number
  m_iDoorID: number
  constructor(source: IVector2D, destination: IVector2D, behavior: number, doorID = 0) {
    this.m_vSource = source
    this.m_vDestination = destination
    this.m_iBehavior = behavior
    this.m_iDoorID = doorID
  }
  destination() { return this.m_vDestination }
  setDestination(newDest: IVector2D) { this.m_vDestination = newDest }
  source() { return this.m_vSource }
  setSource(newSrc: IVector2D) { this.m_vSource = newSrc }
  doorID() { return this.m_iDoorID }
  behavior() { return this.m_iBehavior }
}