import IRaven_PathPlanner from './Raven_PathPlanner.d'
import IVector2D from "../common/2D/Vector2D/index.d";
import IRaven_Bot from "../Raven_Bot/index.d";
import PathEdge from './PathEdge';
import { NavEdgeType } from '../common/graph/GraphEdgeTypes';
import { IGraph_SearchTimeSliced } from './TimeSlicedGraphAlgorithms.d';
import Dispatcher from '../common/messaging/message_dispatcher'
import message_type from '../Raven_Messages';
import { isEqual, MaxFloat } from '../common/misc/utils';
import { vec2DDistance, vec2DDistanceSq } from '../common/2D/Vector2D';
import { Graph_SearchAStar_Ts, Graph_SearchDijkstra_TS, SearchResult, SearchType } from './TimeSlicedGraphAlgorithms';
import SparseGraph from '../common/graph/SparseGraph';

enum SMOOTH_METHODS {
  quick,
  precise
}

let USING_SMOOTH_METHOD = SMOOTH_METHODS.quick

export default class Raven_PathPlanner implements IRaven_PathPlanner {
  m_pOwner: IRaven_Bot
  m_NavGraph: SparseGraph
  // 指向当前路径搜索
  m_pCurrentSearch: IGraph_SearchTimeSliced | null
  m_vDestinationPos: IVector2D
  getClosestNodeToPosition(pos: IVector2D): number {
    let closestSoFar = MaxFloat
    let closestNode = -1
    // console.log('<PathPlanner>::getClosestNodeToPosition start', pos)
    const map = this.m_pOwner.getWorld().getMap()
    const range = map.getCellSpaceNeighborhoodRange()
    // console.log('<PathPlanner>::getClosestNodeToPosition range', range)
    const cellSpace = map.getCellSpace()
    // console.log('<PathPlanner>::getClosestNodeToPosition cellSpace', cellSpace)
    cellSpace.calculateNeighbors(pos, range)
    // console.log('<PathPlanner>::getClosestNodeToPosition calcNeighbors done')
    for (let pN = cellSpace.begin(); !cellSpace.end(); pN = cellSpace.next()) {
      // console.log('<PathPlanner>::getClosestNodeToPosition curSpace', pN)
      const canWalkBetween = this.m_pOwner.canWalkBetween(pos, pN.pos())
      // console.log('<PathPlanner>::getClosestNodeToPosition canWalkBetween', canWalkBetween)
      if(canWalkBetween) {
        const dist = vec2DDistanceSq(pos, pN.pos())
        if(dist < closestSoFar) {
          closestSoFar = dist
          closestNode = cellSpace.m_curNeighborIndex
        }
      }
    }
    return closestNode
  }
  smoothPathEdgesQuick(path: (PathEdge | null)[]): void {
    if(path && path.length > 1) {
      let i = 0
      let e1 = path[i]
      let e2 = path[++i]
      while(i < path.length) {
        if(
          e2.behavior() === NavEdgeType.normal &&
          this.m_pOwner.canWalkBetween(e1.source(), e2.destination())
        ) {
          e1.setDestination(e2.destination())
          path[i] = null
          e2 = path[++i]
        } else {
          e1 = e2
          e2 = path[++i]
        }
      }
    }
  }
  smoothPathEdgesPrecise(path: (PathEdge | null)[]): void {
    if(path && path.length > 1) {
      let i = 0
      let e1: PathEdge
      let e2: PathEdge
      while(i < path.length) {
        e1 = path[i]
        let j = i + 1
        while(j < path.length) {
          e2 = path[j]
          if(
            e2.behavior() === NavEdgeType.normal &&
            this.m_pOwner.canWalkBetween(e1.source(), e2.destination())
          ) {
            e1.setDestination(e2.destination())
            path[j] = null

          }
          ++j
        }
        ++i
      }
    }
  }
  getReadyForNewSearch(): void {
    this.m_pOwner.getWorld().getPathManager().unRegister(this)
    this.m_pCurrentSearch = null
  }
  constructor(bot: IRaven_Bot) {
    this.m_pOwner = bot
    this.m_NavGraph = this.m_pOwner.getWorld().getMap().getNavGraph()
    this.m_pCurrentSearch = null
  }
  requestPathToItem(itemType: number): boolean {
    this.getReadyForNewSearch()
    const closestNodeToBot = this.getClosestNodeToPosition(this.m_pOwner.pos())
    if(closestNodeToBot === -1) {
      console.warn('no closest node to bot found')
      return false
    }
    this.m_pCurrentSearch = new Graph_SearchDijkstra_TS(this.m_NavGraph, closestNodeToBot, itemType)
    this.m_pOwner.getWorld().getPathManager().register(this)
    return true
  }
  requestPathToPosition(targetPos: IVector2D): boolean {
    this.getReadyForNewSearch()
    this.m_vDestinationPos = targetPos
    if(this.m_pOwner.canWalkTo(targetPos)) return true
    const closestNodeToBot = this.getClosestNodeToPosition(this.m_pOwner.pos())
    if(closestNodeToBot === -1) {
      console.warn('no closest node to bot found')
      return false
    }
    const closestNodeToTarget = this.getClosestNodeToPosition(targetPos)
    if(closestNodeToTarget === -1) {
      console.warn('no closest node to target found')
      return false
    }
    // console.log(`closest node to target is ${closestNodeToTarget}`)
    this.m_pCurrentSearch = new Graph_SearchAStar_Ts(this.m_NavGraph, closestNodeToBot, closestNodeToTarget)
    this.m_pOwner.getWorld().getPathManager().register(this)
    return true
  }
  getPath(): PathEdge[] | null {
    if(this.m_pCurrentSearch) {
      const path = this.m_pCurrentSearch.getPathAsPathEdges()
      const closest = this.getClosestNodeToPosition(this.m_pOwner.pos())
      path.unshift(new PathEdge(this.m_pOwner.pos(), this.getNodePosition(closest), NavEdgeType.normal))
      if(this.m_pCurrentSearch.searchType() === SearchType.AStar) {
        path.push(new PathEdge(path[path.length - 1].destination(), this.m_vDestinationPos, NavEdgeType.normal))
      }
      switch(USING_SMOOTH_METHOD) {
        case SMOOTH_METHODS.quick:
          this.smoothPathEdgesQuick(path)
          break
        case SMOOTH_METHODS.precise:
          this.smoothPathEdgesPrecise(path)
          break
      }
      return path
    }
    return null
  }
  getCostToNode(nodeIdx: number): number {
    const nd = this.getClosestNodeToPosition(this.m_pOwner.pos())
    const cost = vec2DDistance(this.m_pOwner.pos(), this.m_NavGraph.getNode(nd).pos())
    return cost + this.m_pOwner.getWorld().getMap().calculateCostToTravelBetweenNodes(nd, nodeIdx)
  }
  getCostToClosestItem(giverType: number): number {
    // console.log('<PathPlanner>::getCostToClosestItem start', giverType)
    const nd = this.getClosestNodeToPosition(this.m_pOwner.pos())
    // console.log('<PathPlanner>::getCostToClosestItem nd', nd)
    if(nd === -1) return -1
    let closestSoFar = MaxFloat
    const triggers = this.m_pOwner.getWorld().getMap().getTriggers()
    // console.log('<PathPlanner>::getCostToClosestItem', triggers)
    for (let i = 0; i < triggers.length; i++) {
      const it = triggers[i]
      if(it.entityType() === giverType && it.isActive()) {
        const cost = this.m_pOwner.getWorld().getMap().calculateCostToTravelBetweenNodes(nd, it.graphNodeIndex())
        if(cost < closestSoFar) {
          closestSoFar = cost
        }
      }
    }
    if(isEqual(closestSoFar, MaxFloat)) return -1
    return closestSoFar
  }
  cycleOnce(): SearchResult {
    const result = this.m_pCurrentSearch.cycleOnce()
    if(result === SearchResult.target_not_found) {
      Dispatcher.dispatchMessage(0, -1, this.m_pOwner.id(), message_type.Msg_NoPathAvailable, null)
    } else if(result === SearchResult.target_found) {
      const path = this.m_pCurrentSearch.getPathToTarget()
      const pTrigger = this.m_NavGraph.getNode(path[path.length - 1]).extraInfo()
      Dispatcher.dispatchMessage(0, -1, this.m_pOwner.id(), message_type.Msg_PathReady, pTrigger)
    }
    return result
  }
  getDestination(): IVector2D { return this.m_vDestinationPos }
  setDestination(newPos: IVector2D): void  { this.m_vDestinationPos = newPos }
  getNodePosition(idx: number): IVector2D {
    return this.m_NavGraph.getNode(idx).pos()
  }
}