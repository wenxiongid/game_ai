import { INVALID_NODE_INDEX } from "./constant";

export default class GraphEdge {
  m_iFrom = INVALID_NODE_INDEX
  m_iTo = INVALID_NODE_INDEX
  cost = 1
  constructor(from, to, cost) {
    if(typeof from === 'number') {
      this.m_iFrom = from
    }
    if(typeof to === 'number') {
      this.m_iTo = to
    }
    if(typeof cost === 'number') {
      this.cost = cost
    }
  }
}