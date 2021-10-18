import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import PathEdge from "../navigation/PathEdge";
import IRaven_Bot from "../Raven_Bot/index.d";
import { Goal_MoveToPosition } from "./Goal_MoveToPosition";
import Goal_TraverseEdge from "./Goal_TraverseEdge";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_NegotiateDoor extends Goal_Composite implements IGoal_Composite {
  m_PathEdge: PathEdge
  m_bLastEdgeInPath: boolean

  constructor(pBot: IRaven_Bot, edge: PathEdge, lastEdge: boolean) {
    super(pBot, GOAL_TYPES.goal_negotiate_door)
    this.m_PathEdge = edge
    this.m_bLastEdgeInPath = lastEdge
  }
  activate() {
    this.m_iStatus = GOAL_STATUS.active
    this.removeAllSubgoals()
    const bot = (this.m_pOwner as IRaven_Bot)
    const posSw = bot.getWorld().getPostOfClosestSwitch(bot.pos(), this.m_PathEdge.doorID())
    this.addSubgoal(new Goal_TraverseEdge(bot, this.m_PathEdge, this.m_bLastEdgeInPath))
    this.addSubgoal(new Goal_MoveToPosition(bot, this.m_PathEdge.source()))
    this.addSubgoal(new Goal_MoveToPosition(bot, posSw))
  }
  process() {
    this.activeIfInactive()
    this.m_iStatus = this.processSubgoals()
    return this.m_iStatus
  }
  terminate() {}
}