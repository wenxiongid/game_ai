import IVector2D from "./common/2D/Vector2D/index.d"
import IRaven_Bot from "./Raven_Bot/index.d"
import IRaven_Map from "./Raven_Map/index.d"
import IRaven_Game from './raven_game.d'
import PathManager from "./navigation/PathManager"

export default class Raven_Game implements IRaven_Game {
  // 游戏地图
  m_pMap: IRaven_Map
  // bot列表
  m_Bots: IRaven_Bot[] = []
  // 选中的bot
  m_pSelectedBot: IRaven_Bot|null = null
  // 地图上的道具列表
  m_Projectiles = []
  // 处理路径规划请求
  m_PathManager: PathManager
  // 是否暂停
  m_bPaused: boolean = false
  // 是否需要移除一个bot
  m_bRemoveABot: boolean = false
  // 墓碑管理
  m_pGraveMarkers
  // 对每个trigger，测试每个bot对其他bot的操作
  updateTriggers():void {}
  clear(): void {}
  attemptToAddBot(bot: IRaven_Bot): boolean {}
  // 通知所有bot，有一个bot被移除了
  notifyAllBotsOfRemoval(removedBot: IRaven_Bot): void {}
  constructor() {}
  render():void {}
  update():void {}
  loadMap(url: string): boolean {}
  addBots(numBotsToAdd: number): void {}
  addRocket(shooter: IRaven_Bot, target: IVector2D): void {}
  addRailGunSlug(shooter: IRaven_Bot, target: IVector2D): void {}
  addShotGunPellet(shooter: IRaven_Bot, target: IVector2D): void {}
  addBolt(shooter: IRaven_Bot, target: IVector2D): void {}
  // 移除最后一个添加的bot
  removeBot(): void {}
  // 返回一个尺寸为boundingRadius的物体从A到B是否会和地形相撞
  isPathObstructed(A: IVector2D, B: IVector2D, boundingRadius: number): boolean {}
  // 返回bot视野内的bot位置向量
  getAllBotsInFOV(bot: IRaven_Bot) {}
  // 返回second是否在first的视野内
  isSecondVisibleToFirst(first: IRaven_Bot, second: IRaven_Bot): boolean {}
  // 返回线段AB是否会和地形相撞
  isLOSOkay(A: IVector2D, B: IVector2D): boolean {}
  getDistanceToClosestWall(origin: IVector2D, heading: IVector2D): number {}
  // 返回开doorId门的最近开关位置
  getPostOfClosestSwitch(botPos: IVector2D, doorId: number): IVector2D {}
  getBotAtPosition(cursorPos: IVector2D) {}
  togglePause() {
    this.m_bPaused = !this.m_bPaused
  }
  clickRightMouseButton(p): void {}
  clickLeftMouseButton(p): void {}
  // 释放控制的bot
  exorciseAnyPossesssedBot(): void {}
  getPlayerInput(): void {}
  possessedBot(): IRaven_Bot {
    return this.m_pSelectedBot
  }
  changeWeaponOfPossessedBot(weapon: number): void {}
  getMap(): IRaven_Map {
    return this.m_pMap
  }
  getAllBots(): IRaven_Bot[] {
    return this.m_Bots
  }
  getPathManager() {
    return this.m_PathManager
  }
  getNumBost(): number {
    return this.m_Bots.length
  }
  tarRavenBotsWithinViewRange(pRaven_bot: IRaven_Bot, range: number) {}
}