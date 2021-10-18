import IVector2D from "../common/2D/Vector2D/index.d";
import Goal, { GOAL_STATUS, IGoal } from "../common/goals/goal";
import IRaven_Bot from "../Raven_Bot/index.d";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_SeekToPosition extends Goal implements IGoal {
  m_vPosition: IVector2D
  m_dTimeToReachPos: number
  m_dStartTime: number
  private isStuck(): boolean {
    const timeTaken = (new Date()).getTime() - this.m_dStartTime
    if(timeTaken > this.m_dTimeToReachPos) {
      console.warn(`BOT ${this.m_pOwner.id()} is STUCK`)
      return true
    }
    return false
  }
  constructor(pBot: IRaven_Bot, target: IVector2D) {
    super(pBot, GOAL_TYPES.goal_seek_to_position)
    this.m_vPosition = target
    this.m_dTimeToReachPos = 0
  }
  activate() {
    const bot = (this.m_pOwner as IRaven_Bot)
    this.m_iStatus = GOAL_STATUS.active
    this.m_dStartTime = (new Date()).getTime()
    this.m_dTimeToReachPos = bot.calculateTimeToReachPosition(this.m_vPosition)
    const marginOfError = 1000
    this.m_dTimeToReachPos += marginOfError
    bot.getSteering().setTarget(this.m_vPosition)
    bot.getSteering().seekOn()
  }
  process() {
    this.activeIfInactive()
    if(this.isStuck()) {
      this.m_iStatus = GOAL_STATUS.failed
    } else {
      if((this.m_pOwner as IRaven_Bot).isAtPosition(this.m_vPosition)) {
        this.m_iStatus = GOAL_STATUS.completed
      }
    }
    return this.m_iStatus
  }
}