import IVector2D from "../common/2D/Vector2D/index.d";
import IRaven_Bot from "../Raven_Bot/index.d";
import IRaven_Map from "../Raven_Map/index.d";
import PathEdge from "./PathEdge";
import { IGraph_SearchTimeSliced } from "./TimeSlicedGraphAlgorithms.d";

export default interface IRaven_PathPlanner {
  m_pOwner: IRaven_Bot
  m_NavGraph: IRaven_Map
  // 指向当前路径搜索
  m_pCurrentSearch: IGraph_SearchTimeSliced | null
  m_vDestinationPos: IVector2D
  getClosestNodeToPosition(pos: IVector2D): number
  smoothPathEdgesQuick(path: PathEdge[]): void
  smoothPathEdgesPrecise(path: PathEdge[]): void
  getReadyForNewSearch(): void
  requestPathToItem(itemType: number): boolean
  requestPathToPosition(targetPos: IVector2D): boolean
  getPath(): PathEdge[] | null
  getCostToNode(nodeIdx: number): number
  getCostToClosestItem(giverType: number): number
  cycleOnce(): number
  getDestination(): IVector2D
  setDestination(newPos: IVector2D): void 
  getNodePosition(idx: number): IVector2D
}