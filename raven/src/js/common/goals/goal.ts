import IVector2D from "../2D/Vector2D/index.d"
import BaseGameEntity from "../game/base_game_entity"
import ITelegram from "../messaging/telegram.d"
import gdi from "../misc/cgdi"
import ITypeToString from "../misc/TypeToString.d"

export enum GOAL_STATUS {
  active,
  inactive,
  completed,
  failed
}

export interface IGoal {
  m_iType: number
  m_pOwner: BaseGameEntity
  m_iStatus: GOAL_STATUS
  activate(): void
  process(): number
  terminate(): void
  handleMessage(msg: ITelegram): boolean 
  addSubgoal(g: Goal): void
  renderAtPos(pos: IVector2D, tts: ITypeToString): void
  render(): void
}

export default class Goal implements IGoal {
  m_iType: number
  m_pOwner: BaseGameEntity
  m_iStatus: GOAL_STATUS
  constructor(pE: BaseGameEntity, type: number) {
    this.m_iType = type
    this.m_pOwner = pE
    this.m_iStatus = GOAL_STATUS.inactive
  }
  activeIfInactive(): void {
    if(this.isInactive()) {
      this.activate()
    }
  }
  reactiveIfFailed(): void {
    if(this.hasFailed()) {
      this.m_iStatus = GOAL_STATUS.inactive
    }
  }
  addSubgoal(g: Goal): void {
    console.error('Cannot add goals to atomic goals')
  }
  isComplete(): boolean { return this.m_iStatus === GOAL_STATUS.completed }
  isActive(): boolean { return this.m_iStatus === GOAL_STATUS.active }
  isInactive(): boolean { return this.m_iStatus === GOAL_STATUS.inactive }
  hasFailed(): boolean { return this.m_iStatus === GOAL_STATUS.failed }
  getType(): number { return this.m_iType }
  activate(): void {}
  process(): number { return 0 }
  terminate(): void {}
  handleMessage(msg: ITelegram): boolean { return false }
  renderAtPos(pos: IVector2D, tts: ITypeToString): void {
    pos.y += 15
    gdi.transparentText()
    if (this.isComplete()) gdi.textColor('rgb(0,255,0)');
    if (this.isInactive()) gdi.textColor('rgb(0,0,0)');
    if (this.hasFailed()) gdi.textColor('rgb(255,0,0)');
    if (this.isActive()) gdi.textColor('rgb(0,0,255)');
    gdi.textAtPos(pos.x, pos.y, tts.convert(this.getType())); 
  }
  render(): void {}
}