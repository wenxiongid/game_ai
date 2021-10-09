import { INVALID_NODE_INDEX } from "./constant"

export default class SparseGraph {
  m_Nodes = []
  m_Edges = []
  m_bDigraph = false
  m_iNextNodeIndex = 0
  constructor(digraph) {
    this.m_bDigraph = digraph
  }
  getNode(idx) {
    return this.m_Nodes[idx]
  }
  getEdge(from, to) {
    // 
  }
  getNextFreeNodeIndex() {
    return this.m_iNextNodeIndex
  }
  addNode(node) {
    this.m_Nodes[this.m_iNextNodeIndex] = node
    return this.m_iNextNodeIndex++
  }
  removeNode(idx) {
    const node = this.getNode(idx)
    node.m_iIndex = INVALID_NODE_INDEX
  }
  addEdge(edge) {}
  removeEdge(from, to) {}
}