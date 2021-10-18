import IVector2D from "../common/2D/Vector2D/index.d";
import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import ITelegram from "../common/messaging/telegram.d";
import IRaven_Bot from "../Raven_Bot/index.d";
import message_type from "../Raven_Messages";
import { Goal_FollowPath } from "./Goal_FollowPath";
import Goal_SeekToPosition from "./Goal_SeekToPosition";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_Explorer extends Goal_Composite implements IGoal_Composite {
  private m_CurrentDestination: IVector2D
  private m_bDestinationIsSet: boolean
  constructor(pOwner: IRaven_Bot) {
    super(pOwner, GOAL_TYPES.goal_explore)
    this.m_bDestinationIsSet = false
  }
  activate() {
    const bot = (this.m_pOwner as IRaven_Bot);
    this.m_iStatus = GOAL_STATUS.active
    this.removeAllSubgoals()
    if(!this.m_bDestinationIsSet) {
      this.m_CurrentDestination = bot.getWorld().getMap().getRandomNodeLocation()
      this.m_bDestinationIsSet = true
    }
    bot.getPathPlanner().requestPathToPosition(this.m_CurrentDestination)
    this.addSubgoal(new Goal_SeekToPosition(bot, this.m_CurrentDestination))
  }
  process() {
    this.activeIfInactive()
    this.m_iStatus = this.processSubgoals()
    return this.m_iStatus
  }
  handleMessage(msg: ITelegram) {
    const bHandled = this.forwardMessageToFrontMostSubgoal(msg)
    if(!bHandled) {
      const bot = (this.m_pOwner as IRaven_Bot);
      switch(msg.msg) {
        case message_type.Msg_PathReady:
          this.removeAllSubgoals()
          this.addSubgoal(new Goal_FollowPath(bot, bot.getPathPlanner().getPath()))
          return true
        case message_type.Msg_NoPathAvailable:
          this.m_iStatus = GOAL_STATUS.failed
          return true
        default:
          return false
      }
    }
    return true
  }
}