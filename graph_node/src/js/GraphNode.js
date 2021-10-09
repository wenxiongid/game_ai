const { INVALID_NODE_INDEX } = require("./constant")

export default class GraphNode {
  m_iIndex = INVALID_NODE_INDEX
  constructor(idx) {
    this.setIndex(idx)
  }
  setIndex(idx) {
    if(typeof idx === "number") {
      this.m_iIndex = idx
    }
  }
}