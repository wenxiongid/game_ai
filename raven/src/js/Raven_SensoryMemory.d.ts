import IVector2D from "./common/2D/Vector2D/index.d"
import IRaven_Bot from "./Raven_Bot/index.d"

export interface IMemoryRecord {
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
}

export interface IRaven_SensoryMemory {
  m_pOwner: IRaven_Bot
  m_MemoryMap: {[k: number]: IMemoryRecord}
  // 角色的记忆时长
  m_dMemorySpan: number
  makeNewRecordIfNotAlreadyPresent(bot: IRaven_Bot): void
  // 当一个对手发出声音时，更新记忆图
  updateWithSoundSource(pNoiseMaker: IRaven_Bot): void
  // 遍历所有对手，更新在视野内的记录
  updateVision(): void
  isOpponentShootable(pOpponent: IRaven_Bot): boolean
  isOpponentWithinFOV(pOpponent: IRaven_Bot): boolean
  getLastRecordedPositionOfOpponent(pOpponent: IRaven_Bot): IVector2D
  getTimeOpponentHasBeenVisible(pOpponent: IRaven_Bot): number
  getTimeSinceLastSensed(pOpponent: IRaven_Bot): number
  getTimeOpponentHasBeenOutOfView(pOpponent: IRaven_Bot): number
  getListOfRecentlySensedOpponents(): IRaven_Bot[]
  renderBoxesAroundRecentlySensed(): void
}