import IVector2D from "../common/2D/Vector2D/index.d";
import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import ITelegram from "../common/messaging/telegram.d";
import gdi from "../common/misc/cgdi";
import IRaven_Bot from "../Raven_Bot";
import message_type from "../Raven_Messages";
import { Goal_FollowPath } from "./Goal_FollowPath";
import Goal_SeekToPosition from "./Goal_SeekToPosition";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export class Goal_MoveToPosition extends Goal_Composite implements IGoal_Composite {
  m_vDestination: IVector2D
  constructor(pBot: IRaven_Bot, pos: IVector2D) {
    super(pBot, GOAL_TYPES.goal_move_to_position)
    this.m_vDestination = pos
  }
  activate() {
    this.m_iStatus = GOAL_STATUS.active
    this.removeAllSubgoals()
    const bot = (this.m_pOwner as IRaven_Bot)
    if(bot.getPathPlanner().requestPathToPosition(this.m_vDestination)) {
      this.addSubgoal(new Goal_SeekToPosition(bot, this.m_vDestination))
    }
  }
  process() {
    this.activeIfInactive()
    this.m_iStatus = this.processSubgoals()
    this.reactiveIfFailed()
    return this.m_iStatus
  }
  handleMessage(msg: ITelegram) {
    const bot = (this.m_pOwner as IRaven_Bot)
    const bHandled = this.forwardMessageToFrontMostSubgoal(msg)
    if(!bHandled) {
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
  render() {
    super.render()

    gdi.blackPen()
    gdi.blueBrush()
    gdi.circle(this.m_vDestination, 6)
    gdi.redBrush()
    gdi.redPen()
    gdi.circle(this.m_vDestination, 4)
    gdi.yellowPen()
    gdi.yellowBrush()
    gdi.circle(this.m_vDestination, 2)
  }
}