import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import gdi from "../common/misc/cgdi";
import IRaven_Bot from "../Raven_Bot/index.d";
import Goal_Explorer from "./Goal_Explorer";
import { Goal_MoveToPosition } from "./Goal_MoveToPosition";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_HuntTarget extends Goal_Composite implements IGoal_Composite {
  m_bLVPTried: boolean
  constructor(pBot: IRaven_Bot) {
    super(pBot, GOAL_TYPES.goal_hunt_target)
    this.m_bLVPTried = false
  }
  activate() {
    this.m_iStatus = GOAL_STATUS.active
    this.removeAllSubgoals()
    const bot = (this.m_pOwner as IRaven_Bot);
    if(bot.getTargetSys().isTargetPresent()) {
      const lrp = bot.getTargetSys().getLastRecordedPosition()
      if(!lrp || lrp.isZero() || bot.isAtPosition(lrp)) {
        this.addSubgoal(new Goal_Explorer(bot))
      } else {
        this.addSubgoal(new Goal_MoveToPosition(bot, lrp))
      }
    } else {
      this.m_iStatus = GOAL_STATUS.completed
    }
  }
  process() {
    this.activeIfInactive()
    this.m_iStatus = this.processSubgoals()
    if((this.m_pOwner as IRaven_Bot).getTargetSys().isTargetWithinFOV()) {
      this.m_iStatus = GOAL_STATUS.completed
    }
    return this.m_iStatus
  }
  render() {
    const bot = (this.m_pOwner as IRaven_Bot);
    // if(bot.getTargetSys().isTargetPresent()) {
    //   gdi.greenPen()
    //   gdi.redBrush()
    //   gdi.circle(bot.getTargetSys().getLastRecordedPosition(), 3)
    // }
    super.render()
  }
}