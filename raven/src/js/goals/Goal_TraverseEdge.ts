import Vector2D from "../common/2D/Vector2D";
import Goal, { GOAL_STATUS, IGoal } from "../common/goals/goal";
import { NavEdgeType } from "../common/graph/GraphEdgeTypes";
import gdi from "../common/misc/cgdi";
import { Bot_MaxCrawlingSpeed, Bot_MaxSpeed, Bot_MaxSwimmingSpeed } from "../config";
import PathEdge from "../navigation/PathEdge";
import IRaven_Bot from "../Raven_Bot/index.d";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export let globalEdge: PathEdge

export default class Goal_TraverseEdge extends Goal implements IGoal {
  m_Edge: PathEdge
  m_bLastEdgeInPath: boolean
  m_dTimeExpected: number
  m_dStartTime: number
  private isStuck(): boolean {
    const timeTaken = (new Date()).getTime() - this.m_dStartTime
    if(timeTaken > this.m_dTimeExpected) {
      console.warn(`BOT ${this.m_pOwner.id()} is STUCK, taken:`, timeTaken, 'expect', this.m_dTimeExpected)
      return true
    }
    return false
  }
  constructor(pBot: IRaven_Bot, edge: PathEdge, lastEdge: boolean) {
    super(pBot, GOAL_TYPES.goal_traverse_edge)
    this.m_Edge = edge
    this.m_dTimeExpected = 0
    this.m_bLastEdgeInPath = lastEdge
  }
  activate(): void {
    this.m_iStatus = GOAL_STATUS.active
    const bot = (this.m_pOwner as IRaven_Bot)
    switch(this.m_Edge.behavior()) {
      case NavEdgeType.swim:
        bot.setMaxSpeed(Bot_MaxSwimmingSpeed)
        break
      case NavEdgeType.crawl:
        bot.setMaxSpeed(Bot_MaxCrawlingSpeed)
        break
    }
    this.m_dStartTime = (new Date()).getTime()
    this.m_dTimeExpected = bot.calculateTimeToReachPosition(this.m_Edge.destination())
    const marginOfError = 2000
    this.m_dTimeExpected += marginOfError

    const steering = bot.getSteering()

    steering.setTarget(this.m_Edge.destination() as Vector2D)

    if(this.m_bLastEdgeInPath) {
      steering.seekOff()
      steering.arriveOn()
    } else {
      steering.arriveOff()
      steering.seekOn()
    }
  }
  process(): number {
    this.activeIfInactive()
    globalEdge = this.m_Edge
    if(this.isStuck()) {
      console.log('<Goal_TraverseEdge>::stuck', this.m_Edge)
      this.m_iStatus = GOAL_STATUS.failed
    } else {
      if((this.m_pOwner as IRaven_Bot).isAtPosition(this.m_Edge.destination())) {
        this.m_iStatus = GOAL_STATUS.completed
      }
    }
    return this.m_iStatus
  }
  terminate(): void {
    const bot = this.m_pOwner as IRaven_Bot
    const steering = bot.getSteering()
    steering.seekOff()
    steering.arriveOff()
    bot.setMaxSpeed(Bot_MaxSpeed)
  }
  render(): void {
    if(this.m_iStatus === GOAL_STATUS.active) {
      gdi.bluePen()
      gdi.line(this.m_pOwner.pos, this.m_Edge.destination())
      gdi.greenBrush()
      gdi.blackPen()
      gdi.circle(this.m_Edge.destination(), 3)
    }
  }
}