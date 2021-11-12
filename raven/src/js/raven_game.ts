import IVector2D, { IPoint } from "./common/2D/Vector2D/index.d"
import IRaven_Bot from "./Raven_Bot/index.d"
import IRaven_Map from "./Raven_Map/index.d"
import IRaven_Game from './raven_game.d'
import PathManager from "./navigation/PathManager"
import Raven_Projectile from "./armory/Raven_Projectile"
import { deleteItemFromArray, MaxFloat } from "./common/misc/utils"
import GraveMarkers from "./GraveMarkers"
import Vector2D, { isSecondInFOVOfFirst, pointToVector2D, vec2DDistance, vec2DDistanceSq, vec2dNormalize } from "./common/2D/Vector2D"
import Raven_Bot from "./Raven_Bot"
import EntityManager from "./EntityManager"
import message_dispatcher from "./common/messaging/message_dispatcher"
import message_type from "./Raven_Messages"
import Bolt from "./armory/Projectile_Bolt"
import Rocket from "./armory/Projectile_Rocket"
import Slug from "./armory/Projectile_Slug"
import Pellet from "./armory/Projectile_Pellet"
import { Bot_Scale, GraveLifetime, MaxSearchCyclesPerUpdateStep, NumBots } from "./config"
import Raven_Map from "./Raven_Map"
import controlKey from './common/control/key'
import controlMouse from './common/control/mouse'
import TYPE from "./raven_objectEnumerations"
import { doWallsIntersectCircle, doWallsObstructLineSegment } from "./common/2D/WallIntersectionTests"
import Raven_UserOptions from "./Raven_UserOptions"
import gdi from "./common/misc/cgdi"
import goalTypeToString from './goals/Raven_Goal_Types'
import { pathEnd, pathStart, pathTarget } from "./navigation/Raven_PathPlanner"

export default class Raven_Game implements IRaven_Game {
  // 游戏地图
  m_pMap: IRaven_Map
  // bot列表
  m_Bots: IRaven_Bot[] = []
  // 选中的bot
  m_pSelectedBot: IRaven_Bot|null = null
  // 地图上的道具列表
  m_Projectiles: Raven_Projectile[] = []
  // 处理路径规划请求
  m_PathManager: PathManager
  // 是否暂停
  m_bPaused: boolean = false
  // 是否需要移除一个bot
  m_bRemoveABot: boolean = false
  // 墓碑管理
  m_pGraveMarkers: GraveMarkers
  // 对每个trigger，测试每个bot对其他bot的操作
  updateTriggers():void {}
  clear(): void {
    this.m_Projectiles = []
    this.m_Bots = []
    this.m_pSelectedBot = null
  }
  attemptToAddBot(bot: IRaven_Bot): boolean {
    const spawnPointCount = this.m_pMap.getSpawnPoints().length
    if(spawnPointCount <= 0) {
      console.error('Map has no spawn points!')
      return false
    }
    let attempts = spawnPointCount
    while(--attempts >= 0) {
      const pos = this.m_pMap.getRandomSpawnPoint()
      let bAvailable = true
      for (const curBot of this.m_Bots) {
        if(vec2DDistance(pos, curBot.pos()) < curBot.bRadius()) {
          bAvailable = false
        }
      }
      if(bAvailable) {
        bot.spawn(pos)
        return true
      }
    }
    return false
  }
  // 通知所有bot，有一个bot被移除了
  notifyAllBotsOfRemoval(removedBot: IRaven_Bot): void {
    for (const curBot of this.m_Bots) {
      message_dispatcher.dispatchMessage(
        0,
        0,
        curBot.id(),
        message_type.Msg_UserHasRemovedBot,
        removedBot
      )
    }
  }
  constructor() {
    this.m_pSelectedBot = null
    this.m_bPaused = false
    this.m_bRemoveABot = false
    this.m_pMap = null
    this.m_PathManager = null
    this.m_pGraveMarkers = null
    this.loadMap('s')
    document.addEventListener('click', (e) => {
      this.clickLeftMouseButton({
        x: e.pageX,
        y: e.pageY
      })
      e.preventDefault()
    })
    document.addEventListener('contextmenu', (e) => {
      this.clickRightMouseButton({
        x: e.pageX,
        y: e.pageY
      })
      e.preventDefault()
    })
  }
  render():void {
    this.m_pGraveMarkers.render()
    this.m_pMap.render()
    if(this.m_pSelectedBot && Raven_UserOptions.m_bOnlyShowBotsInTargetsFOV) {
      const visibleBots = this.getAllBotsInFOV(this.m_pSelectedBot)
      for (const bot of visibleBots) {
        bot.render()
      }
      if(this.m_pSelectedBot) this.m_pSelectedBot.render()
    } else {
      for (const bot of this.m_Bots) {
        if(bot.isAlive()) {
          bot.render()
        }
      }
    }
    for (const curW of this.m_Projectiles) {
      curW.render()
    }
    if(this.m_pSelectedBot) {
      if(this.m_pSelectedBot.isPossessed()) {
        gdi.bluePen()
        gdi.hollowBrush()
        gdi.circle(this.m_pSelectedBot.pos(), this.m_pSelectedBot.bRadius() + 1)
      } else {
        gdi.redPen()
        gdi.hollowBrush()
        gdi.circle(this.m_pSelectedBot.pos(), this.m_pSelectedBot.bRadius() + 1)
      }

      if(Raven_UserOptions.m_bShowOpponentsSensedBySelectedBot) {
        this.m_pSelectedBot.getSensoryMem().renderBoxesAroundRecentlySensed()
      }

      if(Raven_UserOptions.m_bShowTargetOfSelectedBot && this.m_pSelectedBot.getTargetBot()) {
        gdi.thickRedPen()
        const p = this.m_pSelectedBot.getTargetBot().pos()
        const r = this.m_pSelectedBot.getTargetBot().bRadius()
        gdi.line(new Vector2D(p.x - r, p.y - r), new Vector2D(p.x + r, p.y -r))
        gdi.line(new Vector2D(p.x + r, p.y - r), new Vector2D(p.x + r, p.y +r))
        gdi.line(new Vector2D(p.x + r, p.y + r), new Vector2D(p.x - r, p.y +r))
        gdi.line(new Vector2D(p.x - r, p.y + r), new Vector2D(p.x - r, p.y -r))
      }

      if(Raven_UserOptions.m_bShowPathOfSelectedBot) {
        this.m_pSelectedBot.getBrain().render()
      }

      if(Raven_UserOptions.m_bShowGoalsOfSelectedBot) {
        const p = this.m_pSelectedBot.pos().add(new Vector2D(-50, 0))
        this.m_pSelectedBot.getBrain().renderAtPos(p, goalTypeToString)
      }

      if(Raven_UserOptions.m_bShowGoalAppraisals) {
        this.m_pSelectedBot.getBrain().renderEvaluations(5, 415)
      }
      
      if(Raven_UserOptions.m_bShowWeaponAppraisals) {
        this.m_pSelectedBot.getWeaponSys().renderDesirabilities()
      }

      if(controlKey.isKeyPress('q') && this.m_pSelectedBot.isPossessed()) {
        gdi.textColor('rgb(255, 0, 0)')
        gdi.textAtPos(controlMouse.pos().x, controlMouse.pos().y, 'Queuing')
      }
    }
    for (const bot of this.m_Bots) {
      bot.getBrain().render()
    }
    // if(pathStart >= 0) {
    //   gdi.redPen()
    //   gdi.hollowBrush()
    //   gdi.circle(this.m_pMap.getNavGraph().getNode(pathStart).pos(), 5)
    // }
    // if(pathEnd >= 0) {
    //   gdi.pinkPen()
    //   gdi.circle(this.m_pMap.getNavGraph().getNode(pathEnd).pos(), 5)
    // }
    // if(pathTarget) {
    //   gdi.bluePen()
    //   gdi.circle(pathTarget, 5)
    // }
    // this.getMap().getCellSpace().renderNeighbors()
  }
  update():void {
    if(this.m_bPaused) return
    this.m_pGraveMarkers.update()
    this.getPlayerInput()
    this.m_PathManager.updateSearches()
    for (const curDoor of this.m_pMap.getDoors()) {
      curDoor.update()
    }
    deleteItemFromArray(this.m_Projectiles, (curW: Raven_Projectile) => {
      return curW.isDead()
    })
    for (const curW of this.m_Projectiles) {
      curW.update()
    }
    let bSpawnPossible = true
    for (const curBot of this.m_Bots) {
      if(curBot.isSpawning() && bSpawnPossible) {
        bSpawnPossible = this.attemptToAddBot(curBot)
      } else if(curBot.isDead()) {
        this.m_pGraveMarkers.addGrave(curBot.pos())
        curBot.setSpawning()
      } else if(curBot.isAlive()) {
        curBot.update()
      }
    }
    this.m_pMap.updateTriggerSystem(this.m_Bots)
    if(this.m_bRemoveABot) {
      if(this.m_Bots.length > 0) {
        const pBot = this.m_Bots[this.m_Bots.length - 1]
        if(pBot.id() === this.m_pSelectedBot.id()) {
          this.m_pSelectedBot = null
        }
        this.notifyAllBotsOfRemoval(pBot)
      }
      this.m_bRemoveABot = false
    }
  }
  loadMap(url: string): boolean {
    this.clear()
    this.m_pGraveMarkers = new GraveMarkers(GraveLifetime)
    this.m_PathManager = new PathManager(MaxSearchCyclesPerUpdateStep)
    this.m_pMap = new Raven_Map()
    EntityManager.reset()
    if(this.m_pMap.loadMap()) {
      this.addBots(NumBots)
      return true
    }
    return false
  }
  addBots(numBotsToAdd: number): void {
    while(numBotsToAdd--) {
      const rb = new Raven_Bot(this, new Vector2D(0, 0))
      rb.getSteering().wallAvoidanceOn()
      rb.getSteering().separationOn()
      this.m_Bots.push(rb)
      EntityManager.registerEntity(rb)
      console.log(`Adding bot with ID ${rb.id()}`)
    }
  }
  addRocket(shooter: IRaven_Bot, target: IVector2D): void {
    const rp = new Rocket(shooter, target)
    this.m_Projectiles.push(rp)
  }
  addRailGunSlug(shooter: IRaven_Bot, target: IVector2D): void {
    const rp = new Slug(shooter, target)
    this.m_Projectiles.push(rp)
  }
  addShotGunPellet(shooter: IRaven_Bot, target: IVector2D): void {
    const rp = new Pellet(shooter, target)
    this.m_Projectiles.push(rp)
  }
  addBolt(shooter: IRaven_Bot, target: IVector2D): void {
    const rp = new Bolt(shooter, target)
    this.m_Projectiles.push(rp)
  }
  // 移除最后一个添加的bot
  removeBot(): void { this.m_bRemoveABot = true }
  // 返回一个尺寸为boundingRadius的物体从A到B是否会和地形相撞
  isPathObstructed(A: IVector2D, B: IVector2D, boundingRadius: number): boolean {
    const toB = vec2dNormalize(B.add(A.getReverse()))
    let curPos = A.clone()
    while(vec2DDistanceSq(curPos, B) > boundingRadius * boundingRadius) {
      curPos = curPos.add(toB.crossNum(0.5 * boundingRadius))
      if(doWallsIntersectCircle(this.m_pMap.getWalls(), curPos, boundingRadius)) {
        return true
      }
    }
    return false
  }
  // 返回bot视野内的bot位置向量
  getAllBotsInFOV(bot: IRaven_Bot): IRaven_Bot[] {
    const visibleBots: IRaven_Bot[] = []
    for (const curBot of this.m_Bots) {
      if(curBot.id() === bot.id() || !(curBot.isAlive())) continue
      if(isSecondInFOVOfFirst(bot.pos(), bot.facing(), curBot.pos(), bot.fieldOfView())) {
        if(!doWallsObstructLineSegment(bot.pos(), curBot.pos(), this.m_pMap.getWalls())) {
          visibleBots.push(curBot)
        }
      }
    }
    return visibleBots
  }
  // 返回second是否在first的视野内
  isSecondVisibleToFirst(first: IRaven_Bot, second: IRaven_Bot): boolean {
    if(!(first.id() === second.id()) && second.isAlive()) {
      if(isSecondInFOVOfFirst(first.pos(), first.facing(), second.pos(), first.fieldOfView())) {
        if(!doWallsObstructLineSegment(first.pos(), second.pos(), this.m_pMap.getWalls())) {
          return true
        }
      }
    }
    return false
  }
  // 返回线段AB是否会和地形相撞
  isLOSOkay(A: IVector2D, B: IVector2D): boolean {
    return !doWallsObstructLineSegment(A, B, this.m_pMap.getWalls())
  }
  getDistanceToClosestWall(origin: IVector2D, heading: IVector2D): number { return 0 }
  // 返回开doorId门的最近开关位置
  getPostOfClosestSwitch(botPos: IVector2D, doorId: number): IVector2D {
    let switchIDs: number[] = []
    for (const curDoor of this.m_pMap.getDoors()) {
      if(curDoor.id() === doorId) {
        switchIDs = curDoor.getSwitchIDs()
        break
      }
    }
    let closest: Vector2D
    let closestDist = MaxFloat
    for (const it of switchIDs) {
      const trig = EntityManager.getEntityFromID(it)
      if(this.isLOSOkay(botPos, trig.pos())) {
        const dist = vec2DDistance(botPos, trig.pos())
        if(dist < closestDist) {
          closestDist = dist
          closest = trig.pos()
        }
      }
    }
    return closest
  }
  getBotAtPosition(cursorPos: IVector2D) {
    for (const curBot of this.m_Bots) {
      if(vec2DDistance(curBot.pos(), cursorPos) < curBot.bRadius()) {
        if(curBot.isAlive()) {
          return curBot
        }
      }
    }
    return null
  }
  togglePause() { this.m_bPaused = !this.m_bPaused }
  clickRightMouseButton(p: IPoint): void {
    const pos = pointToVector2D(p)
    const pBot = this.getBotAtPosition(pos)
    if(!pBot && !this.m_pSelectedBot) return

    if(pBot && pBot != this.m_pSelectedBot) {
      if(this.m_pSelectedBot) this.m_pSelectedBot.exorcise()
      this.m_pSelectedBot = pBot
      return
    }

    if(pBot && pBot === this.m_pSelectedBot) {
      pBot.takePossession()
      pBot.getBrain().removeAllSubgoals()
    }

    if(this.m_pSelectedBot.isPossessed()) {
      if(controlKey.isKeyPress('q')) {
        this.m_pSelectedBot.getBrain().queueGoal_MoveToPosition(pos)
      } else {
        this.m_pSelectedBot.getBrain().removeAllSubgoals()
        this.m_pSelectedBot.getBrain().addGoal_MoveToPosition(pos)
      }
    }
  }
  clickLeftMouseButton(p: IPoint): void {
    if(this.m_pSelectedBot && this.m_pSelectedBot.isPossessed()) {
      this.m_pSelectedBot.fireWeapon(pointToVector2D(p))
    }
  }
  // 释放控制的bot
  exorciseAnyPossesssedBot(): void {
    if(this.m_pSelectedBot) this.m_pSelectedBot.exorcise()
  }
  getPlayerInput(): void {
    if(this.m_pSelectedBot && this.m_pSelectedBot.isPossessed()) {
      this.m_pSelectedBot.rotateFacingTowardPosition(pointToVector2D(controlMouse.pos()))
    }
  }
  possessedBot(): IRaven_Bot { return this.m_pSelectedBot }
  changeWeaponOfPossessedBot(weapon: number): void {
    if(this.m_pSelectedBot) {
      switch(weapon) {
        case TYPE.type_blaster:
          this.possessedBot().changeWeapon(TYPE.type_blaster)
          return
        case TYPE.type_shotgun:
          this.possessedBot().changeWeapon(TYPE.type_shotgun)
          return
        case TYPE.type_rocket_launcher:
          this.possessedBot().changeWeapon(TYPE.type_rocket_launcher)
          return
        case TYPE.type_rail_gun:
          this.possessedBot().changeWeapon(TYPE.type_rail_gun)
          return
      }
    }
  }
  getMap(): IRaven_Map { return this.m_pMap }
  getAllBots(): IRaven_Bot[] { return this.m_Bots }
  getPathManager() { return this.m_PathManager }
  getNumBost(): number { return this.m_Bots.length }
  tagRavenBotsWithinViewRange(pRaven_bot: IRaven_Bot, range: number) {}
}