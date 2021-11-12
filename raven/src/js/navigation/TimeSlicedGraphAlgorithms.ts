import SparseGraph from "../common/graph/SparseGraph";
import { IGraph_SearchTimeSliced } from "./TimeSlicedGraphAlgorithms.d";
import NavGraphEdge, { GraphEdge } from "../common/graph/GraphEdgeTypes"
import PathEdge from "./PathEdge";
import { heuristic_Euclid_calculate } from "../common/graph/AStarHeuristicPolicies"
import { CHECK_TYPE, isSatisfied } from "./SearchTerminaltionPolicies";

export enum SearchType {
  AStar,
  Dijkstra
}

export enum SearchResult {
  target_found,
  target_not_found,
  search_incomplete
}

export class Graph_SearchAStar_Ts implements IGraph_SearchTimeSliced {
  m_SearchType: SearchType
  m_Graph: SparseGraph
  m_GCosts: number[]
  m_FCosts: number[]
  m_ShortestPathTree: GraphEdge[]
  m_SearchFrontier: GraphEdge[]
  m_iSource: number
  m_iTarget: number
  m_pPQ: number[]
  constructor(graph: SparseGraph, source: number, target: number) {
    this.m_SearchType = SearchType.AStar
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
    this.m_pPQ = [source]
  }
  sortPriority() {
    this.m_pPQ.sort((a, b) => {
      const costA = this.m_FCosts[a] || 0
      const costB = this.m_FCosts[b] || 0
      return costA - costB
    })
  }
  cycleOnce(): SearchResult {
    if(this.m_pPQ.length === 0) {
      return SearchResult.target_not_found
    }
    const nextClosestNode = this.m_pPQ.shift()
    this.m_ShortestPathTree[nextClosestNode] = this.m_SearchFrontier[nextClosestNode]
    if(nextClosestNode === this.m_iTarget) {
      return SearchResult.target_found
    }
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
        this.m_pPQ.push(edgeTo)
        this.m_SearchFrontier[edgeTo] = edge
      } else if(
        GCost < this.m_GCosts[edgeTo] &&
        !this.m_ShortestPathTree[edgeTo]
      ) {
        this.m_FCosts[edgeTo] = GCost + HCost
        this.m_GCosts[edgeTo] = GCost
        this.m_SearchFrontier[edgeTo] = edge
        this.sortPriority()
      }
    }
    return SearchResult.search_incomplete
  }
  getSPT(): GraphEdge[] { return this.m_ShortestPathTree }
  searchType():SearchType { return this.m_SearchType }
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
  getPathAsPathEdges(): PathEdge[] {
    const path: PathEdge[] = []
    if(this.m_iTarget < 0) return path
    let nd = this.m_iTarget
    while(
      nd !== this.m_iSource &&
      this.m_ShortestPathTree[nd]
    ) {
      const graphEdge = this.m_ShortestPathTree[nd] as NavGraphEdge
      path.unshift(new PathEdge(
        this.m_Graph.getNode(graphEdge.from()).pos(),
        this.m_Graph.getNode(graphEdge.to()).pos(),
        graphEdge.flags(),
        graphEdge.iDofIntersectingEntity()
      ))
      nd = graphEdge.from()
    }
    return path
  }
  getCostToTarget(): number {
    return this.m_GCosts[this.m_iTarget]
  } 
}

export class Graph_SearchDijkstra_TS implements IGraph_SearchTimeSliced {
  m_SearchType: SearchType
  m_Graph: SparseGraph
  m_CostToThisNode: number[]
  m_ShortestPathTree: GraphEdge[]
  m_SearchFrontier: GraphEdge[]
  m_iSource: number
  m_iTarget: number
  m_pPQ: number[] 
  constructor(g: SparseGraph, source: number, target: number) {
    this.m_SearchType = SearchType.Dijkstra
    this.m_Graph = g
    this.m_ShortestPathTree = []
    this.m_SearchFrontier = []
    this.m_CostToThisNode = []
    for (let i = 0; i < g.numNodes(); i++) {
      this.m_CostToThisNode[i] = 0
    }
    this.m_iSource = source
    this.m_iTarget = target
    this.m_pPQ = [this.m_iSource]
  }
  sortPriority() {
    this.m_pPQ.sort((a, b) => {
      const costA = this.m_CostToThisNode[a] || 0
      const costB = this.m_CostToThisNode[b] || 0
      return costA - costB
    })
  }
  cycleOnce(): SearchResult {
    if(this.m_pPQ.length === 0) {
      return SearchResult.target_not_found
    }
    const nextClosestNode = this.m_pPQ.shift()
    this.m_ShortestPathTree[nextClosestNode] = this.m_SearchFrontier[nextClosestNode]
    if(isSatisfied(this.m_Graph, this.m_iTarget, nextClosestNode, CHECK_TYPE.findActiveTrigger)) {
      this.m_iTarget = nextClosestNode
      return SearchResult.target_found
    }
    const edges = this.m_Graph.getEdgeFrom(nextClosestNode)
    for (const edge of edges) {
      const edgeTo = edge.to()
      const newCost = this.m_CostToThisNode[nextClosestNode] + edge.cost()
      if(!this.m_SearchFrontier[edgeTo]) {
        this.m_CostToThisNode[edgeTo] = newCost
        this.m_pPQ.push(edgeTo)
        this.m_SearchFrontier[edgeTo] = edge
      } else if(
        newCost < this.m_CostToThisNode[edgeTo] &&
        !this.m_ShortestPathTree[edgeTo]
      ) {
        this.m_CostToThisNode[edgeTo] = newCost
        this.m_SearchFrontier[edgeTo] = edge
        this.sortPriority()
      }
    }
    return SearchResult.search_incomplete
  }
  getSPT() { return this.m_ShortestPathTree }
  searchType():SearchType { return this.m_SearchType }
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
  getCostToTarget(): number { return this.m_CostToThisNode[this.m_iTarget] }
  getPathAsPathEdges(): PathEdge[] {
    const path: PathEdge[] = []
    if(this.m_iTarget < 0) return path
    let nd = this.m_iTarget
    while(
      nd != this.m_iSource &&
      this.m_ShortestPathTree[nd]
    ) {
      const graphEdge = this.m_ShortestPathTree[nd] as NavGraphEdge
      path.unshift(new PathEdge(
        this.m_Graph.getNode(graphEdge.from()).pos(),
        this.m_Graph.getNode(graphEdge.to()).pos(),
        graphEdge.flags(),
        graphEdge.iDofIntersectingEntity()
      ))
      nd = this.m_ShortestPathTree[nd].from()
    }
    return path
  }
}