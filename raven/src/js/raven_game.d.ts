import Raven_Projectile from "./armory/Raven_Projectile"
import IVector2D, { IPoint } from "./common/2D/Vector2D/index.d"
import GraveMarkers from "./GraveMarkers"
import PathManager from "./navigation/PathManager"
import IRaven_Bot from "./Raven_Bot/index.d"
import IRaven_Map from "./Raven_Map/index.d"

export default interface IRaven_Game {
  // 游戏地图
  m_pMap: IRaven_Map
  // bot列表
  m_Bots: IRaven_Bot[]
  // 选中的bot
  m_pSelectedBot: IRaven_Bot|null
  // 地图上的道具列表
  m_Projectiles: Raven_Projectile[]
  // 处理路径规划请求
  m_PathManager: PathManager
  // 是否暂停
  m_bPaused: boolean
  // 是否需要移除一个bot
  m_bRemoveABot: boolean
  // 墓碑管理
  m_pGraveMarkers: GraveMarkers
  // 对每个trigger，测试每个bot对其他bot的操作
  updateTriggers():void
  clear(): void
  attemptToAddBot(bot: IRaven_Bot): boolean
  // 通知所有bot，有一个bot被移除了
  notifyAllBotsOfRemoval(removedBot: IRaven_Bot): void
  render():void
  update():void
  loadMap(url: string): boolean
  addBots(numBotsToAdd: number): void
  addRocket(shooter: IRaven_Bot, target: IVector2D): void
  addRailGunSlug(shooter: IRaven_Bot, target: IVector2D): void
  addShotGunPellet(shooter: IRaven_Bot, target: IVector2D): void
  addBolt(shooter: IRaven_Bot, target: IVector2D): void
  // 移除最后一个添加的bot
  removeBot(): void
  // 返回一个尺寸为boundingRadius的物体从A到B是否会和地形相撞
  isPathObstructed(A: IVector2D, B: IVector2D, boundingRadius: number): boolean
  // 返回bot视野内的bot位置向量
  getAllBotsInFOV(bot: IRaven_Bot): IRaven_Bot[]
  // 返回second是否在first的视野内
  isSecondVisibleToFirst(first: IRaven_Bot, second: IRaven_Bot): boolean
  // 返回线段AB是否会和地形相撞
  isLOSOkay(A: IVector2D, B: IVector2D): boolean
  getDistanceToClosestWall(origin: IVector2D, heading: IVector2D): number
  // 返回开doorId门的最近开关位置
  getPostOfClosestSwitch(botPos: IVector2D, doorId: number): IVector2D
  getBotAtPosition(cursorPos: IVector2D): IRaven_Bot
  togglePause(): void
  clickRightMouseButton(p: IPoint): void
  clickLeftMouseButton(p: IPoint): void
  // 释放控制的bot
  exorciseAnyPossesssedBot(): void
  getPlayerInput(): void
  possessedBot(): IRaven_Bot
  changeWeaponOfPossessedBot(weapon: number): void
  getMap(): IRaven_Map
  getAllBots(): IRaven_Bot[]
  getPathManager(): PathManager
  getNumBost(): number
  tagRavenBotsWithinViewRange(pRaven_bot: IRaven_Bot, range: number): void
}