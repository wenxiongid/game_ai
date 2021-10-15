import { GraphEdge } from "../common/graph/GraphEdgeTypes";
import PathEdge from "./PathEdge";

export enum SearchType {
  AStar,
  Dijkstra
}

export enum SearchResult {
  target_found,
  target_not_found,
  search_incomplete
}

export interface IGraph_SearchTimeSliced {
  m_SearchType: SearchType
  // 执行一次搜索
  cycleOnce(): SearchResult
  // 返回算法已经检查的边向量
  getSPT():GraphEdge []
  getCostToTarget(): number
  getPathToTarget(): number[]
  getPathAsPathEdges (): PathEdge[]
  searchType(): SearchType
}