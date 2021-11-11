import { GraphEdge } from "../common/graph/GraphEdgeTypes";
import PathEdge from "./PathEdge";

import { SearchType, SearchResult } from "./TimeSlicedGraphAlgorithms";

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