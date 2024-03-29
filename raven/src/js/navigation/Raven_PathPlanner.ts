import IRaven_PathPlanner from './Raven_PathPlanner.d'
import IVector2D from "../common/2D/Vector2D/index.d";
import IRaven_Bot from "../Raven_Bot/index.d";
import PathEdge from './PathEdge';
import { NavEdgeType } from '../common/graph/GraphEdgeTypes';
import GraphNode from '../common/graph/GraphNodeTypes';
import { IGraph_SearchTimeSliced } from './TimeSlicedGraphAlgorithms.d';
import Dispatcher from '../common/messaging/message_dispatcher'
import message_type from '../Raven_Messages';
import { isEqual, MaxFloat } from '../common/misc/utils';
import Vector2D, { vec2DDistance, vec2DDistanceSq } from '../common/2D/Vector2D';
import { Graph_SearchAStar_Ts, Graph_SearchDijkstra_TS, SearchResult, SearchType } from './TimeSlicedGraphAlgorithms';
import SparseGraph from '../common/graph/SparseGraph';

enum SMOOTH_METHODS {
  quick,
  precise
}

let USING_SMOOTH_METHOD = SMOOTH_METHODS.quick

export let pathStart: number = -1
export let pathEnd: number
export let pathTarget: Vector2D

export default class Raven_PathPlanner implements IRaven_PathPlanner {
  m_pOwner: IRaven_Bot
  m_NavGraph: SparseGraph
  // 指向当前路径搜索
  m_pCurrentSearch: IGraph_SearchTimeSliced | null
  m_vDestinationPos: IVector2D
  getClosestNodeToPosition(pos: IVector2D): number {
    let closestSoFar = MaxFloat
    let closestNode = -1
    const map = this.m_pOwner.getWorld().getMap()
    const range = map.getCellSpaceNeighborhoodRange()
    const cellSpace = map.getCellSpace()
    cellSpace.calculateNeighbors(pos, range)
    for (let pN = cellSpace.begin(); !cellSpace.end(); pN = cellSpace.next()) {
      const index = (pN as GraphNode).index()
      if(index === -1) continue
      const canWalkBetween = this.m_pOwner.canWalkBetween(pos, pN.pos())
      if(canWalkBetween) {
        const dist = vec2DDistanceSq(pos, pN.pos())
        if(dist < closestSoFar) {
          closestSoFar = dist
          closestNode = index
        }
      }
    }
    if(closestNode === -1) {
      console.error('<PathPlanner>::getClosestNodeToPos not found', pos)
    }
    return closestNode
  }
  smoothPathEdgesQuick(path: (PathEdge | null)[]): PathEdge[] {
    if(path.length < 2) return path
    const newPath = path.slice(0)
    if(newPath && newPath.length > 1) {
      let i = 0
      let e1 = newPath[i]
      let e2 = newPath[++i]
      while(i < newPath.length) {
        if(
          e2.behavior() === NavEdgeType.normal &&
          this.m_pOwner.canWalkBetween(e1.source(), e2.destination())
        ) {
          e1.setDestination(e2.destination())
          newPath[i] = null
          e2 = newPath[++i]
        } else {
          e1 = e2
          e2 = newPath[++i]
        }
      }
    }
    const result:PathEdge[] = []
    for (const edge of newPath) {
      if(edge) {
        result.push(edge)
      }
    }
    return result
  }
  smoothPathEdgesPrecise(path: (PathEdge | null)[]): PathEdge[] {
    const newPath = path.slice(0)
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
    const result:PathEdge[] = []
    for (const edge of newPath) {
      if(edge) {
        result.push(edge)
      }
    }
    return result
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
    pathStart = closestNodeToBot
    pathEnd = closestNodeToTarget
    pathTarget = targetPos
    this.m_pCurrentSearch = new Graph_SearchAStar_Ts(this.m_NavGraph, closestNodeToBot, closestNodeToTarget)
    this.m_pOwner.getWorld().getPathManager().register(this)
    return true
  }
  getPath(): PathEdge[] | null {
    if(this.m_pCurrentSearch) {
      let path = this.m_pCurrentSearch.getPathAsPathEdges()
      const closest = this.getClosestNodeToPosition(this.m_pOwner.pos())
      if(closest === -1) {
        return null
      }
      path.unshift(new PathEdge(this.m_pOwner.pos(), this.getNodePosition(closest), NavEdgeType.normal))
      if(this.m_pCurrentSearch.searchType() === SearchType.AStar) {
        path.push(new PathEdge(path[path.length - 1].destination(), this.m_vDestinationPos, NavEdgeType.normal))
      }
      switch(USING_SMOOTH_METHOD) {
        case SMOOTH_METHODS.quick:
          path = this.smoothPathEdgesQuick(path)
          break
        case SMOOTH_METHODS.precise:
          path = this.smoothPathEdgesPrecise(path)
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
    const nd = this.getClosestNodeToPosition(this.m_pOwner.pos())
    if(nd === -1) return -1
    let closestSoFar = MaxFloat
    const triggers = this.m_pOwner.getWorld().getMap().getTriggers()
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