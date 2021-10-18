import Vector2D from "../common/2D/Vector2D";
import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import IRaven_Bot from "../Raven_Bot/index.d";
import Goal_DodgeSideToSide from "./Goal_DodgeSideToSide";
import Goal_HuntTarget from "./Goal_HuntTarget";
import Goal_SeekToPosition from "./Goal_SeekToPosition";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_AttackTarget extends Goal_Composite implements IGoal_Composite {
  constructor(pOwner: IRaven_Bot) {
    super(pOwner, GOAL_TYPES.goal_attack_target)
  }
  activate() {
    this.m_iStatus = GOAL_STATUS.active
    this.removeAllSubgoals()
    const bot = (this.m_pOwner as IRaven_Bot);
    if(!bot.getTargetSys().isTargetPresent()) {
      this.m_iStatus = GOAL_STATUS.completed
    }
    if(bot.getTargetSys().isTargetShootable()) {
      const dummy = new Vector2D(0, 0)
      if(bot.canStepLeft(dummy) || bot.canStepRight(dummy)) {
        // 左右平移
        this.addSubgoal(new Goal_DodgeSideToSide(bot))
      } else {
        this.addSubgoal(new Goal_SeekToPosition(bot, bot.getTargetBot().pos()))
      }
    } else {
      this.addSubgoal(new Goal_HuntTarget(bot))
    }
  }
  process() {
    this.activeIfInactive()
    this.m_iStatus = this.processSubgoals()
    this.reactiveIfFailed()
    return this.m_iStatus
  }
  terminate() {
    this.m_iStatus = GOAL_STATUS.completed
  }
}