import IVector2D from "../common/2D/Vector2D/index.d";
import Wall2D from "../common/2D/Wall2D";
import TriggerSystem from "../triggers/TriggerSystem";
import SparseGraph from '../common/graph/SparseGraph'
import IRaven_Map from './index.d'
import Raven_Door from "../Raven_Door";
import Vector2D from "../common/2D/Vector2D";
import EntityManager from "../EntityManager";
import Trigger_OnButtonSendMsg from "../triggers/Trigger_OnButtonSendMsg";
import TYPE, { getNameOfType } from "../raven_objectEnumerations";
import Trigger_HealthGiver from "../triggers/Trigger_HealGiver";
import Trigger_WeaponGiver from "../triggers/Trigger_WeaponGiver";
import CellSpacePartition from "../common/misc/CellSpacePartition";
import { NumCellsX, NumCellsY } from "../config";
import IRaven_Bot from "../Raven_Bot";
import Trigger_SoundNotify from "../triggers/Trigger_SoundNotify";
import { MaxFloat, randInt } from "../common/misc/utils";
import Raven_UserOptions from "../Raven_UserOptions";
import gdi from "../common/misc/cgdi";
import { trim } from 'lodash'

import MAP_DATA from '../../map.js'
import { calculateAverageGraphEdgeLength, createAllPairsCostsTable, GraphHelper_DrawUsingGDI } from "../common/graph/HandyGraphFunctions";

export default class Raven_Map implements IRaven_Map {
  m_Walls: Wall2D[] = []
  m_TriggerSystem: TriggerSystem
  m_SpawnPoints: IVector2D[] = []
  m_Doors: Raven_Door[] = []
  m_pNavGraph: SparseGraph
  m_pSpacePartition: CellSpacePartition
  m_dCellSpaceNeighborhoodRange: number
  m_iSizeX: number
  m_iSizeY: number
  loadMap() {
    this.m_pNavGraph = new SparseGraph(false)
    this.m_pNavGraph.load(MAP_DATA)
    console.log('NavGraph loaded')
    this.m_dCellSpaceNeighborhoodRange = calculateAverageGraphEdgeLength(this.m_pNavGraph) + 1
    console.log('average edge length is', this.m_dCellSpaceNeighborhoodRange - 1)
    console.log('neighborhood range set to', this.m_dCellSpaceNeighborhoodRange)
    this.m_iSizeX = MAP_DATA.width
    this.m_iSizeY = MAP_DATA.height
    console.log('partitioning navgraph nodes...')
    this.partitionNavGraph()
    console.log('partition navgraph done')
    console.log('loading map...')
    for (const entity of MAP_DATA.entitis) {
      const entityName = getNameOfType(entity.type)
      console.log(`creating a ${entityName}`)
      const info = trim(entity.info).split(/ +/)
      switch(entity.type) {
        case TYPE.type_wall:
          this.addWall(new Vector2D(+info[0], +info[1]), new Vector2D(+info[2], +info[3]))
          break
        case TYPE.type_sliding_door:
          this.addDoor(new Vector2D(+info[1], +info[2]), new Vector2D(+info[3], +info[4]), +info[5], +info[0], [+info[6], +info[7]])
          break
        case TYPE.type_door_trigger:
          this.addDoorTrigger(new Vector2D(+info[3], +info[4]), +info[1], +info[2], +info[5], +info[0])
          break
        case TYPE.type_spawn_point:
          this.addSpawnPoint(new Vector2D(+info[1], +info[2]))
          break
        case TYPE.type_health:
          this.addHealth_Giver(new Vector2D(+info[0], +info[1]), +info[2], +info[3], +info[4])
          break
        case TYPE.type_shotgun:
          this.addWeapon_Giver(TYPE.type_shotgun, new Vector2D(+info[0], +info[1]), +info[2], +info[3])
          break
      }
    }
    this.m_PathCosts = createAllPairsCostsTable(this.m_pNavGraph)
    return true
  }
  partitionNavGraph(): void {
    this.m_pSpacePartition = new CellSpacePartition(
      this.m_iSizeX,
      this.m_iSizeY,
      NumCellsX,
      NumCellsY,
      this.m_pNavGraph.numNodes()
    )
    for (const node of this.m_pNavGraph.m_Nodes) {
      this.m_pSpacePartition.addEntity(node)
    }
  }
  m_PathCosts: number[][] = []
  addWallFromFile(): void {}
  addSpawnPoint(pos: Vector2D): void {
    this.m_SpawnPoints.push(pos)
  }
  addHealth_Giver(pos: Vector2D, r: number, healthGiven: number, nodeIndex: number): void {
    const hg = new Trigger_HealthGiver(pos, r, healthGiven, nodeIndex)
    this.m_TriggerSystem.register(hg)
    const node = this.m_pNavGraph.getNode(hg.graphNodeIndex())
    node.setExtraInfo(hg)
    EntityManager.registerEntity(hg)
  }
  addWeapon_Giver(type: TYPE, pos: Vector2D, r:number, graphNodeIndex: number): void {
    const wg = new Trigger_WeaponGiver(type, pos, r, graphNodeIndex)
    this.m_TriggerSystem.register(wg)
    const node = this.m_pNavGraph.getNode(wg.graphNodeIndex())
    node.setExtraInfo(wg)
    EntityManager.registerEntity(wg)
  }
  addDoor(p1: Vector2D, p2: Vector2D, r:number, id?: number, switchesId?: number[]): void {
    const pDoor = new Raven_Door(this, p1, p2, r, id, switchesId)
    this.m_Doors.push(pDoor)
    EntityManager.registerEntity(pDoor)
  }
  addDoorTrigger(pos: Vector2D, receiver: number, messageType: number, radius: number, id?: number): void {
    const tr = new Trigger_OnButtonSendMsg(TYPE.type_door_trigger, pos, receiver, messageType, radius, id)
    this.m_TriggerSystem.register(tr)
    EntityManager.registerEntity(tr)
  }
  addSoundTrigger(pSoundSource: IRaven_Bot, range: number) {
    this.m_TriggerSystem.register(new Trigger_SoundNotify(pSoundSource, range))
  }
  updateTriggerSystem(bots: IRaven_Bot[]) {
    this.m_TriggerSystem.update(bots)
  }
  clear(): void {
    this.m_TriggerSystem.clear()
    this.m_Doors = []
    this.m_Walls = []
    this.m_SpawnPoints = []
    this.m_pNavGraph = null
    this.m_pSpacePartition = null
  }
  constructor() {
    this.m_pSpacePartition = null
    this.m_iSizeX = 0
    this.m_iSizeY = 0
    this.m_TriggerSystem = new TriggerSystem()
  }
  getRandomNodeLocation() {
    const randIndex = randInt(0, this.m_pNavGraph.numActiveNodes() - 1)
    return this.m_pNavGraph.m_Nodes[randIndex].pos()
  }
  render() {
    if(Raven_UserOptions.m_bShowGraph) {
      GraphHelper_DrawUsingGDI(this.m_pNavGraph, gdi.GREY, Raven_UserOptions.m_bShowNodeIndices)
    }
    for (const curDoor of this.m_Doors) {
      curDoor.render()
    }
    this.m_TriggerSystem.render()
    for (const curWall of this.m_Walls) {
      gdi.thickBlackPen()
      curWall.render()
    }
    for (const curSp of this.m_SpawnPoints) {
      gdi.greyBrush()
      gdi.greyPen()
      gdi.circle(curSp, 7)
    }
  }
  addWall(from: IVector2D, to: IVector2D): Wall2D {
    const w = new Wall2D(from, to)
    this.m_Walls.push(w)
    return w
  }
  getTriggers() { return this.m_TriggerSystem.getTriggers() }
  getWalls() { return this.m_Walls }
  getNavGraph() { return this.m_pNavGraph }
  getDoors() { return this.m_Doors }
  getSpawnPoints() { return this.m_SpawnPoints }
  getCellSpace() { return this.m_pSpacePartition }
  getRandomSpawnPoint() {
    return this.m_SpawnPoints[Math.floor(Math.random() * this.m_SpawnPoints.length)]
  }
  getSizeX() { return this.m_iSizeX }
  getSizeY() { return this.m_iSizeY }
  getMaxDimension() { return Math.max(this.m_iSizeX, this.m_iSizeY) }
  getCellSpaceNeighborhoodRange() { return this.m_dCellSpaceNeighborhoodRange }
  calculateCostToTravelBetweenNodes(nd1: number, nd2: number): number {
    if(this.m_PathCosts[nd1]) {
      return this.m_PathCosts[nd1][nd2]
    } else {
      return MaxFloat
    }
  }
}