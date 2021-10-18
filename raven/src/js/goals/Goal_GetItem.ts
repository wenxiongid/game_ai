import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import ITelegram from "../common/messaging/telegram.d";
import IRaven_Bot from "../Raven_Bot/index.d";
import message_type from "../Raven_Messages";
import TYPE from "../raven_objectEnumerations";
import ITrigger from "../triggers/Trigger.d";
import { Goal_FollowPath } from "./Goal_FollowPath";
import Goal_Wander from "./Goal_Wander";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export function itemTypeToGoalType(gt: number) {
  switch(gt) {
    case TYPE.type_health:
      return GOAL_TYPES.goal_get_health
    case TYPE.type_shotgun:
      return GOAL_TYPES.goal_get_shotgun
    case TYPE.type_rail_gun:
      return GOAL_TYPES.goal_get_railgun
    case TYPE.type_rocket_launcher:
      return GOAL_TYPES.goal_get_rocket_launcher
    default:
      console.error('[Goal_GetItem] cannot determine item type')
  }
}

export default class Goal_GetItem extends Goal_Composite implements IGoal_Composite {
  private m_iItemToGet: number
  private m_pGiverTrigger: ITrigger
  private hasItemBeenStolen(): boolean {
    if(
      this.m_pGiverTrigger &&
      !this.m_pGiverTrigger.isActive() &&
      (this.m_pOwner as IRaven_Bot).hasLOSto(this.m_pGiverTrigger.pos())
    ) {
      return true
    }
    return false
  }
  constructor(pBot: IRaven_Bot, item: number) {
    super(pBot, itemTypeToGoalType(item))
    this.m_iItemToGet = item
    this.m_pGiverTrigger = null
  }
  activate() {
    const bot = this.m_pOwner as IRaven_Bot
    this.m_iStatus = GOAL_STATUS.active
    this.m_pGiverTrigger = null
    bot.getPathPlanner().requestPathToItem(this.m_iItemToGet)
    this.addSubgoal(new Goal_Wander(bot))
  }
  process() {
    this.activeIfInactive()
    if(this.hasItemBeenStolen()) {
      this.terminate()
    } else {
      this.m_iStatus = this.processSubgoals()
    }
    return this.m_iStatus
  }
  handleMessage(msg: ITelegram) {
    const bHandled = this.forwardMessageToFrontMostSubgoal(msg)
    const bot = this.m_pOwner as IRaven_Bot
    if(!bHandled) {
      switch(msg.msg) {
        case message_type.Msg_PathReady:
          this.removeAllSubgoals()
          this.addSubgoal(new Goal_FollowPath(bot, bot.getPathPlanner().getPath()))
          this.m_pGiverTrigger = msg.extraInfo as ITrigger
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
  terminate() {
    this.m_iStatus = GOAL_STATUS.completed
  }
}