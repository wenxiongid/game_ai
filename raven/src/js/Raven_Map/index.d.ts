import IRaven_Bot from "../Raven_Bot/index.d";
import IVector2D from "../common/2D/Vector2D/index.d";
import ITrigger from "../triggers/Trigger.d";
import GraphNode from "../common/graph/GraphNodeTypes";

export default interface IRaven_Map {
  m_Walls
  m_TriggerSystem
  m_SpawnPoints: IVector2D[]
  m_Doors
  m_pNavGraph
  m_pSpacePartition
  m_dCellSpaceNeighborhoodRange: number
  m_iSizeX: number
  m_iSizeY: number
  partitionNavGraph(): void
  m_PathCosts: IVector2D[]
  addWallFromFile(): void
  addSpawnPoint(): void
  addHealth_Giver(): void
  addWeapon_Giver(): void
  addDoor(): void
  addDoorTrigger(): void
  clear(): void
  render(): void
  loadMap(url: string): boolean
  addWall(from: IVector2D, to: IVector2D)
  addSoundTrigger(soundSource: IRaven_Bot, range: number): void
  calculateCostToTravelBetweenNodes(nd1: number, nd2: number): number
  getRandomNodeLocation(): IVector2D
  updateTriggerSystem(bots: IRaven_Bot[]): void
  getTriggers(): ITrigger[]
  getNode(idx: number): GraphNode
  getCellSpaceNeighborhoodRange(): number
  getCellSpace() 
}