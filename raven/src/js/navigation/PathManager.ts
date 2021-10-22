import Raven_PathPlanner from "./Raven_PathPlanner";
import { SearchResult } from "./TimeSlicedGraphAlgorithms.d";

export default class PathManager {
  // 所有活跃搜索请求的列表
  m_SearchRequests: Raven_PathPlanner[]
  // 每个搜索步骤中所有注册搜索周期的总和
  m_iNumSearchCyclesPerUpdate: number
  constructor(numSearchCyclesPerUpdate: number) {
    this.m_SearchRequests = []
    this.m_iNumSearchCyclesPerUpdate = numSearchCyclesPerUpdate
  }
  updateSearches(): void {
    let numCyclesRemaining = this.m_iNumSearchCyclesPerUpdate
    let i = 0
    while(numCyclesRemaining-- > 0 &&  this.m_SearchRequests.length > 0) {
      const curPath = this.m_SearchRequests[i]
      const result = curPath.cycleOnce()
      if(result === SearchResult.target_found || result === SearchResult.target_not_found) {
        this.m_SearchRequests.splice(i, 1)
      } else {
        ++i
      }
      if(i > this.m_SearchRequests.length - 1) {
        i = 0
      }
    }
  }
  register(pPathPlanner: Raven_PathPlanner): void {
    if(!this.m_SearchRequests.includes(pPathPlanner)) {
      this.m_SearchRequests.push(pPathPlanner)
    }
  } 
  unRegister(pPathPlanner: Raven_PathPlanner): void {
    const index = this.m_SearchRequests.indexOf(pPathPlanner)
    if(index >= 0) {
      this.m_SearchRequests.splice(index, 1)
    }
  }
  getNumActiveSearches(): number {
    return this.m_SearchRequests.length
  }
}