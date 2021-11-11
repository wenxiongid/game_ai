import IVector2D from "../2D/Vector2D/index.d"
import ITypeToString from "../misc/TypeToString.d"
import BaseGameEntity from "../game/base_game_entity";
import ITelegram from "../messaging/telegram.d";
import Goal, { GOAL_STATUS, IGoal } from "./goal";
import gdi from "../misc/cgdi"

export interface IGoal_Composite extends IGoal {
  m_subGoals: Goal[]
  processSubgoals(): number
  forwardMessageToFrontMostSubgoal(msg: ITelegram): boolean
}

export default class Goal_Composite extends Goal implements IGoal_Composite {
  m_subGoals: Goal[] = []
  constructor(pE: BaseGameEntity, type: number) {
    super(pE, type)
  }
  handleMessage(msg: ITelegram): boolean {
    return this.forwardMessageToFrontMostSubgoal(msg)
  }
  addSubgoal(g: Goal): void {
    this.m_subGoals.unshift(g)
  }
  removeAllSubgoals(): void {
    for (const goal of this.m_subGoals) {
      goal.terminate()
    }
    this.m_subGoals = []
  }
  processSubgoals(): number {
    while(
      this.m_subGoals.length &&
      (
        this.m_subGoals[0].isComplete() ||
        this.m_subGoals[0].hasFailed()
      )
    ) {
      this.m_subGoals[0].terminate()
      this.m_subGoals.shift()
    }
    if(this.m_subGoals.length) {
      const statusOfSubGoals = this.m_subGoals[0].process()
      if(statusOfSubGoals === GOAL_STATUS.completed && this.m_subGoals.length > 1) {
        return GOAL_STATUS.active
      }
      return statusOfSubGoals
    } else {
      return GOAL_STATUS.completed
    }
  }
  forwardMessageToFrontMostSubgoal(msg: ITelegram): boolean {
    if(this.m_subGoals.length) {
      return this.m_subGoals[0].handleMessage(msg)
    }
    return false
  }
  renderAtPos(pos: IVector2D, tts: ITypeToString): void {
    super.renderAtPos(pos, tts)
    pos.x += 10
    gdi.transparentText()
    for (const goal of this.m_subGoals) {
      goal.renderAtPos(pos, tts)
    }
    pos.x -= 10
  }
  render(): void {
    if(this.m_subGoals.length) {
      this.m_subGoals[0].render()
    }
  }
}