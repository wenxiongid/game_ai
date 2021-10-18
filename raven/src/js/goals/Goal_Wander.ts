import Goal, { GOAL_STATUS, IGoal } from "../common/goals/goal";
import IRaven_Bot from "../Raven_Bot/index.d";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_Wander extends Goal implements IGoal {
  constructor(pBot: IRaven_Bot) {
    super(pBot, GOAL_TYPES.goal_wander)
  }
  activate(): void {
    this.m_iStatus = GOAL_STATUS.active;
    (this.m_pOwner as IRaven_Bot).getSteering().wanderOn()
  }
  process(): number {
    this.activeIfInactive()
    return this.m_iStatus
  }
  terminate(): void {
    (this.m_pOwner as IRaven_Bot).getSteering().wanderOff()
  }
}