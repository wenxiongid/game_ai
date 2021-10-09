export class GraphEdge {
  m_iFrom: number
  m_iTo: number
  m_dCost: number
  constructor(from?: number, to?: number, cost?: number) {
    this.m_iFrom = from || -1
    this.m_iTo = to || -1
    this.m_dCost = cost || 1
  }
  from() {
    return this.m_iFrom
  }
  setFrom(newIndex: number) {
    this.m_iFrom = newIndex
  }
  to() {
    return this.m_iTo
  }
  setTo(newIndex: number) {
    this.m_iTo = newIndex
  }
  cost() {
    return this.m_dCost
  }
  setCost(newCost: number) {
    this.m_dCost = newCost
  }
  isEqual(edge: GraphEdge) {
    return this.m_iFrom === edge.m_iFrom &&
      this.m_iTo === edge.m_iTo &&
      this.m_dCost === edge.m_dCost
  }
  isNotEqual(edge: GraphEdge) {
    return !this.isEqual(edge)
  }
}

export enum NavEdgeType {
  normal            = 0,
  swim              = 1 << 0,
  crawl             = 1 << 1,
  creep             = 1 << 3,
  jump              = 1 << 3,
  fly               = 1 << 4,
  grapple           = 1 << 5,
  goes_through_door = 1 << 6
}

export default class NavGraphEdge extends GraphEdge {
  m_iFlags: number
  m_iIDofIntersectingEntity: number
  constructor(from: number, to: number, cost: number, flags: number, id: number = -1) {
    super(from, to, cost)
    this.m_iFlags = flags
    this.m_iIDofIntersectingEntity = id
  }
  flags() {
    return this.m_iFlags
  }
  setFlags(flags: number) {
    this.m_iFlags = flags
  }
  iDofIntersectingEntity() {
    return this.iDofIntersectingEntity
  }
  setIDofIntersectingEntity(id: number) {
    this.m_iIDofIntersectingEntity = id
  }
}