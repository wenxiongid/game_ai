import { heuristic_Euclid_calculate } from "./AStarHeuristicPolicies"
import { GraphEdge } from "./GraphEdgeTypes"
import SparseGraph from "./SparseGraph"

enum SEARCH_STATUS {
  visited,
  unvisited,
  no_parent_assigned
}

export class Graph_SearchDFS {
  m_Graph: SparseGraph
  m_visited: number[]
  m_Route: number[]
  // 搜索过程中验证的边列表
  m_SpanningTree: GraphEdge[]
  m_iSource: number
  m_iTarget: number
  m_bFound: boolean
  constructor(graph: SparseGraph, source: number, target = -1) {
    this.m_Graph = graph
    this.m_iSource = source
    this.m_iTarget = target
    this.m_bFound = false
    for (let i = 0; i < graph.numNodes(); i++) {
      this.m_visited[i] = SEARCH_STATUS.unvisited
      this.m_Route[i] = SEARCH_STATUS.no_parent_assigned
    }
    this.m_bFound = this.search()
  }
  search(): boolean {
    const stack:GraphEdge[] = []
    const dummy = new GraphEdge(this.m_iSource, this.m_iSource, 0)
    stack.push(dummy)

    while(stack.length > 0) {
      const next = stack.pop()
      const nextTo = next.to()
      this.m_Route[nextTo] = next.from()
      if(next !== dummy) {
        this.m_SpanningTree.push(next)
      }
      this.m_visited[nextTo] = SEARCH_STATUS.visited
      if(nextTo === this.m_iTarget) {
        return true
      }
      const edges = this.m_Graph.getEdgeFrom(nextTo)
      for (const edge of edges) {
        if(this.m_visited[edge.to()] === SEARCH_STATUS.unvisited) {
          stack.push(edge)
        }
      }
    }

    return false
  }
  found() { return this.m_bFound }
  getSearchTree(): GraphEdge[] { return this.m_SpanningTree }
  // 返回搜索到的路径的节点列表
  getPathToTarget(): number[] {
    const path: number[] = []
    if(!this.m_bFound || this.m_iTarget < 0) return path

    let nd = this.m_iTarget
    path.unshift(nd)

    while(nd != this.m_iSource) {
      nd = this.m_Route[nd]
      path.unshift(nd)
    }

    return path
  }
}

export class Graph_SearchBFS {
  m_Graph: SparseGraph
  m_visited: number[]
  m_Route: number[]
  // 搜索过程中验证的边列表
  m_SpanningTree: GraphEdge[]
  m_iSource: number
  m_iTarget: number
  m_bFound: boolean
  constructor(graph: SparseGraph, source: number, target: number) {
    this.m_Graph = graph
    this.m_iSource = source
    this.m_iTarget = target
    this.m_bFound = false
    for (let i = 0; i < graph.numNodes(); i++) {
      this.m_visited[i] = SEARCH_STATUS.unvisited
      this.m_Route[i] = SEARCH_STATUS.no_parent_assigned
    }
    this.m_bFound = this.search()
  }
  search(): boolean {
    const q: GraphEdge[] = []
    const dummy = new GraphEdge(this.m_iSource, this.m_iSource, 0)
    q.push(dummy)
    this.m_visited[this.m_iSource] = SEARCH_STATUS.visited

    while(q.length > 0) {
      const next = q.shift()
      this.m_Route[next.to()] = next.from()
      if(next !== dummy) {
        this.m_SpanningTree.push(next)
      }
      if(next.to() === this.m_iTarget) {
        return true
      }
      const edges = this.m_Graph.getEdgeFrom(next.to())
      for (const edge of edges) {
        if(this.m_visited[edge.to()] === SEARCH_STATUS.unvisited) {
          q.push(edge)
          this.m_visited[edge.to()] = SEARCH_STATUS.visited
        }
      }
    }

    return false
  }
  found() { return this.m_bFound }
  getSearchTree(): GraphEdge[] { return this.m_SpanningTree }
  getPathToTarget(): number[] {
    const path: number[] = []
    if(!this.m_bFound || this.m_iTarget < 0) return path

    let nd = this.m_iTarget
    path.unshift(nd)

    while(nd != this.m_iSource) {
      nd = this.m_Route[nd]
      path.unshift(nd)
    }

    return path
  }
}

export class Graph_SearchDijkstra {
  m_Graph: SparseGraph
  m_ShortestPathTree: GraphEdge[]
  m_CostToThisNode: number[]
  m_SearchFrontier: GraphEdge[]
  m_iSource: number
  m_iTarget: number
  constructor(graph: SparseGraph, source: number, target: number = -1) {
    this.m_Graph = graph
    this.m_ShortestPathTree = []
    this.m_SearchFrontier = []
    this.m_CostToThisNode = []
    for (let i = 0; i < graph.numNodes(); i++) {
      this.m_CostToThisNode[i] = 0
    }
    this.m_iSource = source
    this.m_iTarget = target
    this.search()
  }
  sortPriority(r: number[]) {
    r.sort((a, b) => {
      const costA = this.m_CostToThisNode[a] || 0
      const costB = this.m_CostToThisNode[b] || 0
      return costA - costB
    })
  }
  search() {
    const pq: number[] = []
    pq.push(this.m_iSource)
    while(pq.length > 0) {
      const nextClosestNode = pq.shift()
      this.m_ShortestPathTree[nextClosestNode] = this.m_SearchFrontier[nextClosestNode]
      if(nextClosestNode === this.m_iTarget) return

      const edges = this.m_Graph.getEdgeFrom(nextClosestNode)
      for (const edge of edges) {
        const edgeTo = edge.to()
        const newCost = this.getCostToNode(nextClosestNode) + edge.cost()
        if(!this.m_SearchFrontier[edgeTo]) {
          this.m_CostToThisNode[edgeTo] = newCost
          pq.push(edgeTo)
          this.m_SearchFrontier[edgeTo] = edge
        } else if(
          newCost < this.m_CostToThisNode[edgeTo] &&
          !this.m_ShortestPathTree[edgeTo]
        ) {
          this.m_CostToThisNode[edgeTo] = newCost
          this.m_SearchFrontier[edgeTo] = edge
          this.sortPriority(pq)
        }
      }
    }
  }
  getPathToTarget(): number[] {
    const path: number[] = []
    if(this.m_iTarget < 0) return path
    let nd = this.m_iTarget
    path.unshift(nd)
    while(
      nd != this.m_iSource &&
      this.m_ShortestPathTree[nd]
    ) {
      nd = this.m_ShortestPathTree[nd].from()
      path.unshift(nd)
    }
    return path
  }
  getSPT() { return this.m_ShortestPathTree }
  getCostToTarget(): number { return this.m_CostToThisNode[this.m_iTarget] }
  getCostToNode(nd: number): number { return this.m_CostToThisNode[nd] }
}

export class Graph_SearchAStar {
  m_Graph: SparseGraph
  m_GCosts: number[]
  m_FCosts: number[]
  m_ShortestPathTree: GraphEdge[]
  m_SearchFrontier: GraphEdge[]
  m_iSource: number
  m_iTarget: number
  constructor(graph: SparseGraph, source: number, target: number) {
    this.m_Graph = graph
    this.m_ShortestPathTree = []
    this.m_SearchFrontier = []
    // 图cost
    this.m_GCosts = []
    // 图cost + 启发性cost
    this.m_FCosts = []
    for (let i = 0; i < graph.numNodes(); i++) {
      this.m_GCosts[i] = 0
      this.m_FCosts[i] = 0
    }
    this.m_iSource = source
    this.m_iTarget = target
    this.search()
  }
  sortPriority(r: number[]) {
    r.sort((a, b) => {
      const costA = this.m_FCosts[a] || 0
      const costB = this.m_FCosts[b] || 0
      return costA - costB
    })
  }
  search() {
    const pq:number[] = []
    pq.push(this.m_iSource)
    while(pq.length > 0) {
      const nextClosestNode = pq.shift()
      this.m_ShortestPathTree[nextClosestNode] = this.m_SearchFrontier[nextClosestNode]
      if(nextClosestNode === this.m_iTarget) return
      const edges = this.m_Graph.getEdgeFrom(nextClosestNode)
      for (const edge of edges) {
        const edgeTo = edge.to()
        // 启发性函数cost
        const HCost = heuristic_Euclid_calculate(this.m_Graph, this.m_iTarget, edgeTo)
        // 图cost
        const GCost = this.m_GCosts[nextClosestNode] + edge.cost()
        if(!this.m_SearchFrontier[edgeTo]) {
          this.m_FCosts[edgeTo] = GCost + HCost
          this.m_GCosts[edgeTo] = GCost
          pq.push(edgeTo)
          this.m_SearchFrontier[edgeTo] = edge
        } else if(
          GCost < this.m_GCosts[edgeTo] &&
          !this.m_ShortestPathTree[edgeTo]
        ) {
          this.m_FCosts[edgeTo] = GCost + HCost
          this.m_GCosts[edgeTo] = GCost
          this.m_SearchFrontier[edgeTo] = edge
          this.sortPriority(pq)
        }
      }
    }
  }
  getSPT() { return this.m_ShortestPathTree }
  getPathToTarget(): number[] {
    const path: number[] = []
    if(this.m_iTarget < 0) return path
    let nd = this.m_iTarget
    path.unshift(nd)
    while(
      nd != this.m_iSource &&
      this.m_ShortestPathTree[nd]
    ) {
      nd = this.m_ShortestPathTree[nd].from()
      path.unshift(nd)
    }
    return path
  }
  getCostToTarget(): number { return this.m_GCosts[this.m_iTarget] }
}

export class Graph_MinSpanningTree {
  m_Graph: SparseGraph
  m_CostToThisNode: number[]
  m_SpanningTree: GraphEdge[]
  m_Fringe: GraphEdge[]
  constructor(g: SparseGraph, source = -1) {
    this.m_Graph = g
    this.m_SpanningTree = []
    this.m_Fringe = []
    this.m_CostToThisNode = []
    for (let i = 0; i < g.numNodes(); i++) {
      this.m_CostToThisNode[i] = -1
    }
    if(source < 0) {
      for(let nd = 0; nd < g.numNodes(); ++nd) {
        if(!this.m_SpanningTree[nd]) {
          this.search(nd)
        }
      }
    } else {
      this.search(source)
    }
  }
  sortPriority(r: number[]) {
    r.sort((a, b) => {
      const costA = this.m_CostToThisNode[a] || 0
      const costB = this.m_CostToThisNode[b] || 0
      return costA - costB
    })
  }
  search(source: number) {
    const pq: number[] = []
    pq.push(source)
    while(pq.length > 0) {
      const best = pq.shift()
      this.m_SpanningTree[best] = this.m_Fringe[best]
      const edges = this.m_Graph.getEdgeFrom(best)
      for (const edge of edges) {
        const edgeTo = edge.to()
        const priority = edge.cost()
        if(!this.m_Fringe[edgeTo]) {
          this.m_CostToThisNode[edgeTo] = priority
          pq.push(edgeTo)
          this.m_Fringe[edgeTo] = edge
        } else if(
          priority < this.m_CostToThisNode[edgeTo] &&
          !this.m_SpanningTree[edgeTo]
        ) {
          this.m_CostToThisNode[edgeTo] = priority
          this.m_Fringe[edgeTo] = edge
          this.sortPriority(pq)
        }
      }
    }
  }
  getSpanningTree(): GraphEdge[] { return this.m_SpanningTree }
}