import Vector2D, { isSecondInFOVOfFirst } from "./common/2D/Vector2D"
import IVector2D from "./common/2D/Vector2D/index.d"
import gdi from "./common/misc/cgdi"
import { MaxFloat } from "./common/misc/utils"
import IRaven_Bot from "./Raven_Bot/index.d"
import { IMemoryRecord, IRaven_SensoryMemory } from './Raven_SensoryMemory.d'

class MemoryRecord implements IMemoryRecord {
  opponent: IRaven_Bot
  // 最后一次感知时间
  fTimeLastSensed: number
  // 最后一次开始看见时间
  fTimeBecameVisible: number
  // 最后一次看见时间
  fTimeLastVisible: number
  // 最后一次感知的位置
  vLastSensedPosition: IVector2D
  // 是否在视野内
  bWithinFOV: boolean
  // 是否没有阻挡，可以射击
  bShootable: boolean
  constructor(opponent: IRaven_Bot) {
    this.opponent = opponent
    this.fTimeLastSensed = -999
    this.fTimeBecameVisible = -999
    this.fTimeLastVisible = 0
    this.bWithinFOV = false
    this.bShootable = false
  }
}

export default class Raven_SensoryMemory implements IRaven_SensoryMemory {
  m_pOwner: IRaven_Bot
  m_MemoryMap: {[k: number]: IMemoryRecord}
  // 角色的记忆时长
  m_dMemorySpan: number
  makeNewRecordIfNotAlreadyPresent(bot: IRaven_Bot): void {
    const id = bot.id()
    if(!this.m_MemoryMap[id]) {
      this.m_MemoryMap[id] = new MemoryRecord(bot)
    }
  }
  removeBotFromMemory(bot: IRaven_Bot): void {
    const id = bot.id()
    const record = this.m_MemoryMap[id]
    if(record) {
      this.m_MemoryMap[id] = null
    }
  }
  constructor(owner: IRaven_Bot, memorySpan: number) {
    this.m_pOwner = owner
    this.m_MemoryMap = {}
    this.m_dMemorySpan = memorySpan
  }
  // 当一个对手发出声音时，更新记忆图
  updateWithSoundSource(pNoiseMaker: IRaven_Bot): void {
    const makerId = pNoiseMaker.id()
    if(this.m_pOwner.id() !== makerId) {
      this.makeNewRecordIfNotAlreadyPresent(pNoiseMaker)
      const info = this.m_MemoryMap[makerId]
      if(this.m_pOwner.getWorld().isLOSOkay(this.m_pOwner.pos(), pNoiseMaker.pos())) {
        info.bShootable = true
        info.vLastSensedPosition = pNoiseMaker.pos()
      } else {
        info.bShootable = false
      }
      info.fTimeLastSensed = (new Date()).getTime()
    }
  }
  // 遍历所有对手，更新在视野内的记录
  updateVision(): void {
    const bots: IRaven_Bot[] = this.m_pOwner.getWorld().getAllBots()
    const now = (new Date()).getTime()
    for (const bot of bots) {
      const botId = bot.id()
      if(this.m_pOwner.id() !== botId) {
        this.makeNewRecordIfNotAlreadyPresent(bot)
        const info = this.m_MemoryMap[botId]
        if(this.m_pOwner.getWorld().isLOSOkay(this.m_pOwner.pos(), bot.pos())) {
          // 无阻挡
          info.bShootable = true
          if(isSecondInFOVOfFirst(this.m_pOwner.pos(), this.m_pOwner.facing(), bot.pos(), this.m_pOwner.fieldOfView())) {
            info.fTimeLastSensed = now
            info.vLastSensedPosition = bot.pos()
            info.fTimeLastVisible = now
            // 从没看见到看见
            if(!info.bWithinFOV) {
              info.bWithinFOV = true
              info.fTimeBecameVisible = now
            }
          } else {
            info.bWithinFOV = false
          }
        } else {
          // 有阻挡
          info.bShootable = false
          info.bWithinFOV = false
        }
      }
    }
  }
  isOpponentShootable(pOpponent: IRaven_Bot): boolean {
    const id = pOpponent.id()
    const record = this.m_MemoryMap[id]
    if(record) {
      return record.bShootable
    }
    return false
  }
  isOpponentWithinFOV(pOpponent: IRaven_Bot): boolean {
    const id = pOpponent.id()
    const record = this.m_MemoryMap[id]
    if(record) {
      return record.bWithinFOV
    }
    return false
  }
  getLastRecordedPositionOfOpponent(pOpponent: IRaven_Bot): IVector2D {
    const id = pOpponent.id()
    const record = this.m_MemoryMap[id]
    if(record) {
      return record.vLastSensedPosition
    }
    console.error('attempting to get position of unrecorded bot')
  }
  getTimeOpponentHasBeenVisible(pOpponent: IRaven_Bot): number {
    const id = pOpponent.id()
    const record = this.m_MemoryMap[id]
    if(record) {
      const now = (new Date()).getTime()
      return now - record.fTimeBecameVisible
    }
    return 0
  }
  getTimeSinceLastSensed(pOpponent: IRaven_Bot): number {
    const id = pOpponent.id()
    const record = this.m_MemoryMap[id]
    if(record) {
      const now = (new Date()).getTime()
      return now - record.fTimeLastSensed
    }
    return MaxFloat
  }
  getTimeOpponentHasBeenOutOfView(pOpponent: IRaven_Bot): number{
    const id = pOpponent.id()
    const record = this.m_MemoryMap[id]
    if(record) {
      const now = (new Date()).getTime()
      return now - record.fTimeLastVisible
    }
    return MaxFloat
  }
  getListOfRecentlySensedOpponents(): IRaven_Bot[] {
    const opponents: IRaven_Bot[] = []
    const now = (new Date()).getTime()
    for (const key in this.m_MemoryMap) {
      if (Object.prototype.hasOwnProperty.call(this.m_MemoryMap, key)) {
        const record = this.m_MemoryMap[key];
        if((now - record.fTimeLastSensed) <= this.m_dMemorySpan ) {
          opponents.push(record.opponent)
        }
      }
    }
    return opponents
  }
  renderBoxesAroundRecentlySensed(): void {
    const opponents: IRaven_Bot[] = this.getListOfRecentlySensedOpponents()
    for (const it of opponents) {
      gdi.orangePen()
      const p: IVector2D = it.pos()
      const b: number = it.bRadius()
      gdi.line(new Vector2D(p.x - b, p.y - b), new Vector2D(p.x + b, p.y - b))
      gdi.line(new Vector2D(p.x + b, p.y - b), new Vector2D(p.x + b, p.y + b))
      gdi.line(new Vector2D(p.x + b, p.y + b), new Vector2D(p.x - b, p.y + b))
      gdi.line(new Vector2D(p.x - b, p.y + b), new Vector2D(p.x - b, p.y - b))
    }
  }
}