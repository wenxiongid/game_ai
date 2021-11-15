import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import { NavEdgeType } from "../common/graph/GraphEdgeTypes";
import gdi from "../common/misc/cgdi";
import PathEdge from "../navigation/PathEdge";
import IRaven_Bot from "../Raven_Bot/index.d";
import Goal_NegotiateDoor from "./Goal_NegotiateDoor";
import Goal_TraverseEdge from "./Goal_TraverseEdge";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export class Goal_FollowPath extends Goal_Composite implements IGoal_Composite {
  m_Path: PathEdge[]
  constructor(pBot: IRaven_Bot, path: PathEdge[]) {
    super(pBot, GOAL_TYPES.goal_follow_path)
    this.m_Path = path
    this.render()
  }
  activate(): void {
    this.m_iStatus = GOAL_STATUS.active
    const bot = (this.m_pOwner as IRaven_Bot)
    const edge = this.m_Path.shift()
    switch(edge.behavior()) {
      case NavEdgeType.normal:
        this.addSubgoal(new Goal_TraverseEdge(bot, edge, this.m_Path.length === 0))
        break
      case NavEdgeType.goes_through_door:
        this.addSubgoal(new Goal_NegotiateDoor(bot, edge, this.m_Path.length === 0))
        break
      case NavEdgeType.jump:
        // this.addSubgoal(new Goal)
        break
      case NavEdgeType.grapple:
        // this.addSubgoal(new Goal)
        break
      default:
        console.error('[Goal_FollowPath.activate] 未知edge type')
    }
  }
  process(): number {
    this.activeIfInactive()
    this.m_iStatus = this.processSubgoals()
    if(this.m_iStatus === GOAL_STATUS.completed && this.m_Path.length > 0) {
      this.activate()
    }
    return this.m_iStatus
  }
  render(): void {
    // for (const edge of this.m_Path) {
    //   gdi.blackPen()
    //   gdi.lineWithArrow(edge.source(), edge.destination(), 5)
    //   gdi.redBrush()
    //   gdi.blackPen()
    //   gdi.circle(edge.destination(), 3)
    // }
    super.render()
  }
  terminate(): void {}
}