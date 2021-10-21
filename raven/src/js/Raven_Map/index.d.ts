import IRaven_Bot from "../Raven_Bot/index.d";
import IVector2D from "../common/2D/Vector2D/index.d";
import ITrigger from "../triggers/Trigger.d";
import GraphNode from "../common/graph/GraphNodeTypes";
import Wall2D from "../common/2D/Wall2D";
import TriggerSystem from "../triggers/TriggerSystem";
import Raven_Door from "../Raven_Door";
import Vector2D from "../common/2D/Vector2D";
import TYPE from "../raven_objectEnumerations";
import SparseGraph from "../common/graph/SparseGraph";
import CellSpacePartition from "../common/misc/CellSpacePartition";

export default interface IRaven_Map {
  m_Walls: Wall2D[]
  m_TriggerSystem: TriggerSystem
  m_SpawnPoints: IVector2D[]
  m_Doors: Raven_Door[]
  m_pNavGraph: SparseGraph
  m_pSpacePartition: CellSpacePartition
  m_dCellSpaceNeighborhoodRange: number
  m_iSizeX: number
  m_iSizeY: number
  partitionNavGraph(): void
  m_PathCosts: number[][]
  addWallFromFile(): void
  addSpawnPoint(pos: Vector2D): void
  addHealth_Giver(pos: Vector2D): void
  addWeapon_Giver(type: TYPE, pos: Vector2D): void 
  addDoor(p1: Vector2D, p2: Vector2D, switches: number[]): void
  addDoorTrigger(pos: Vector2D): void
  clear(): void
  render(): void
  addWall(from: IVector2D, to: IVector2D): Wall2D
  addSoundTrigger(soundSource: IRaven_Bot, range: number): void
  calculateCostToTravelBetweenNodes(nd1: number, nd2: number): number
  getRandomNodeLocation(): IVector2D
  updateTriggerSystem(bots: IRaven_Bot[]): void
  getTriggers(): ITrigger[]
  getCellSpaceNeighborhoodRange(): number
  getCellSpace(): CellSpacePartition 
}