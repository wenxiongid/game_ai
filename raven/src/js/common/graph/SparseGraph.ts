import { GraphEdge } from "./GraphEdgeTypes";
import GraphNode from "./GraphNodeTypes";
import { deleteItemFromArray } from '../misc/utils'
import Vector2D from "../2D/Vector2D";

export default class SparseGraph {
  m_Nodes: GraphNode[] = []
  m_Edges: {
    [k: number]: GraphEdge[]
  } = {}
  // 是否有向图
  m_bDigraph: boolean
  m_iNextNodeIndex: number
  // 图中未有的边返回true
  uniqueEdge(from: number, to: number): boolean {
    const edges = this.m_Edges[from]
    if(edges) {
      for (const edge of edges) {
        if(edge.to() === to) {
          return false
        }
      }
      return true
    }
    return true
  }
  // 遍历所有边，删除指向不合法node的边
  cullInvalidEdges(): void {
    const check = (edge: GraphEdge) => {
      return edge.from() === -1 || edge.to() === -1
    }

    for (const from in this.m_Edges) {
      if (Object.prototype.hasOwnProperty.call(this.m_Edges, from)) {
        const edges = this.m_Edges[from]
        deleteItemFromArray(edges, check)
      }
    }
  }
  constructor(digraph: boolean) {
    this.m_iNextNodeIndex = 0
    this.m_bDigraph = digraph
  }
  getNode(idx: number): GraphNode {
    if(idx >= 0 && idx < this.m_Nodes.length) {
      return this.m_Nodes[idx]
    }
    console.error(`[SparseGraph] getNode invalid idx: ${idx}`)
    return null
  }
  getEdge(from: number, to: number): GraphEdge {
    if(to < 0 || to > this.m_Nodes.length - 1) {
      console.error(`[SparseGraph] getEdge invalid from: ${from}`)
      return null
    } else {
      const fromNode = this.m_Nodes[from]
      if(fromNode.index() === -1) {
        console.error(`[SparseGraph] getEdge invalid from: ${from}`)
        return null
      }
    }
    if(to < 0 || to > this.m_Nodes.length - 1) {
      console.error(`[SparseGraph] getEdge invalid to: ${to}`)
      return null
    } else {
      const toNode = this.m_Nodes[to]
      if(toNode.index() === -1) {
        console.error(`[SparseGraph] getEdge invalid to: ${to}`)
        return null
      }
    }
    const edges = this.m_Edges[from]
    if(edges && edges.length > 0) {
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
        if(edge.to() === to) {
          return edge
        }
      }
      console.error(`[SparseGraph] getEdge no edge to toIdx: ${to}`)
      return null
    } else {
      console.error(`[SparseGraph] getEdge no edge in fromIdx: ${from}`)
      return null
    }
  }
  getEdgeFrom(from: number): GraphEdge[] {
    return this.m_Edges[from] || []
  }
  getNextFreeNodeIndex(): number {
    return this.m_iNextNodeIndex
  }
  addNode(node: GraphNode): number {
    if(node.index() < this.m_Nodes.length) {
      if(this.m_Nodes[node.index()].index() !== -1) {
        console.error(`[SparseGraph] addNode attempting to add a node with a duplicate ID: ${node.index()}`)
      } else {
        this.m_Nodes[node.index()] = node
      }
      return this.m_iNextNodeIndex
    } else {
      if(node.index() !== this.m_iNextNodeIndex) {
        console.error(`[SparseGraph] addNode invalid index: ${node.index()} need ${this.m_iNextNodeIndex}`)
        return this.m_iNextNodeIndex
      } else {
        this.m_Nodes.push(node)
        this.m_Edges[node.index()] = []
        return this.m_iNextNodeIndex++
      }
    }
  }
  removeNode(nodeIdx: number): void {
    if(nodeIdx < 0 || nodeIdx >= this.m_Nodes.length) {
      const node = this.m_Nodes[nodeIdx]
      if(node) {
        node.setIndex(-1)
      }
      // 找到指向该node的边并删除
      if(!this.m_bDigraph) {
        const edges = this.m_Edges[nodeIdx]
        if(edges) {
          for (let i = 0; i < edges.length; i++) {
            const edge = edges[i]
            const otherEdges = this.m_Edges[edge.to()]
            deleteItemFromArray(otherEdges, (item: GraphEdge) => {
              return edge.to() === nodeIdx
            })
          }
        }
        this.m_Edges[nodeIdx] = []
      } else {
        // 单向图只能用慢的方法
        this.cullInvalidEdges()
      }
    } else {
      console.error(`[SparseGraph] removeNode invalid node index: ${nodeIdx}`)
    }
  }
  addEdge(edge: GraphEdge): void {
    const from = edge.from()
    const to = edge.to()
    if(
      from >= 0 && from < this.m_Nodes.length &&
      to >= 0 && to < this.m_Nodes.length
    ) {
      const fromNode = this.m_Nodes[from]
      const toNode = this.m_Nodes[to]
      if(fromNode && fromNode.index() >= 0 && toNode && toNode.index() >= 0) {
        if(this.uniqueEdge(from, to)) {
          if(!this.m_Edges[from]) {
            this.m_Edges[from] = []
          }
          this.m_Edges[from].push(edge)
        }
        if(!this.m_bDigraph) {
          if(this.uniqueEdge(to, from)) {
            if(!this.m_Edges[to]) {
              this.m_Edges[to] = []
            }
            const newEdge = new GraphEdge(edge.to(), edge.from(), edge.cost())
            this.m_Edges[to].push(newEdge)
          }
        }
      } else {
        console.error(`[SparseGraph] addEdge node not active from ${from} or to ${to}`)
      }
    } else {
      console.error(`[SparseGraph] addEdge invalid from ${from} or to ${to}`)
    }
  }
  removeEdge(from: number, to: number): void {
    if(
      from >= 0 && from < this.m_Nodes.length &&
      to >= 0 && to < this.m_Nodes.length
    ) {
      const edges = this.m_Edges[from]
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
        if(edge.to() === to) {
          this.m_Edges[from] = edges.splice(i, 1)
        }
      }
      if(!this.m_bDigraph) {
        const edges = this.m_Edges[to]
        for (let i = 0; i < edges.length; i++) {
          const edge = edges[i]
          if(edge.to() === from) {
            this.m_Edges[to] = edges.splice(i, 1)
          }
        }
      }
    } else {
      console.error(`[SparseGraph] addEdge invalid from ${from} or to ${to}`)
    }
  }
  setEdgeCost(from: number, to: number, cost: number): void {
    if(
      from >= 0 &&
      from < this.m_Nodes.length &&
      to >= 0 &&
      to < this.m_Nodes.length
    ) {
      const edges = this.m_Edges[from]
      if(edges) {
        for (const edge of edges) {
          if(edge.to() === to) {
            edge.setCost(cost)
            break
          }
        }
      }
    }
  }
  numNodes(): number { return this.m_Nodes.length }
  numActiveNodes(): number {
    let count = 0
    for (const node of this.m_Nodes) {
      if(node.index() !== -1) {
        count++
      }
    }
    return count
  }
  numEdges(): number {
    let total = 0
    for (const from in this.m_Edges) {
      if (Object.prototype.hasOwnProperty.call(this.m_Edges, from)) {
        const edges = this.m_Edges[from]
        if(edges) {
          total += edges.length
        }
      }
    }
    return total
  }
  isDigraph():boolean { return this.m_bDigraph }
  isEmpty():boolean { return this.m_Nodes.length === 0 }
  isNodePresent(idx: number):boolean {
    const node = this.m_Nodes[idx]
    if(node && node.index() !== -1) {
      return true
    }
    return false
  }
  isEdgePresent(from: number, to: number): boolean {
    if(this.isNodePresent(from) && this.isNodePresent(to)) {
      const edges = this.m_Edges[from]
      if(edges && edges.length) {
        for (let i = 0; i < edges.length; i++) {
          const edge = edges[i];
          if(edge.to() === to) {
            return true
          }
        }
      }
      return false
    }
    return false
  }
  // save(): boolean {}
  // load(): boolean {}
  clear(): void {
    this.m_iNextNodeIndex = 0
    this.m_Nodes = []
    this.m_Edges = {}
  }
  removeEdges():void {
    for (const from in this.m_Edges) {
      if (Object.prototype.hasOwnProperty.call(this.m_Edges, from)) {
        this.m_Edges[from] = []
      }
    }
  }
  load(mapData: any) {
    const { nodes, edges } = mapData
    for (const node of nodes) {
      const newNode = new GraphNode(node.index, new Vector2D(node.x, node.y))
      if(node.index !== -1) {
        this.addNode(newNode)
      } else {
        this.m_Nodes.push(newNode)
        this.m_Edges[this.m_iNextNodeIndex] = []
        ++this.m_iNextNodeIndex
      }
    }
    for (const edge of edges) {
      const nextEdge = new GraphEdge(edge.from, edge.to, edge.cost)
      this.m_Edges[nextEdge.from()].push(nextEdge)
    }
    return true
  }
}