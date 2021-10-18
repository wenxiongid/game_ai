import IVector2D from "../common/2D/Vector2D/index.d";
import Goal, { GOAL_STATUS, IGoal } from "../common/goals/goal";
import gdi from "../common/misc/cgdi";
import { randBool } from "../common/misc/utils";
import IRaven_Bot from "../Raven_Bot/index.d";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_DodgeSideToSide extends Goal implements IGoal {
  private m_vStrafeTarget: IVector2D
  private m_bClockwise: boolean
  constructor(pBot: IRaven_Bot) {
    super(pBot, GOAL_TYPES.goal_strafe)
    this.m_bClockwise = randBool()
  }
  activate() {
    this.m_iStatus = GOAL_STATUS.active
    const owner = (this.m_pOwner as IRaven_Bot);
    owner.getSteering().seekOn()
    if(this.m_bClockwise) {
      if(owner.canStepRight(this.m_vStrafeTarget)){
        owner.getSteering().setTarget(this.m_vStrafeTarget)
      } else {
        this.m_bClockwise = !this.m_bClockwise
        this.m_iStatus = GOAL_STATUS.inactive
      }
    } else {
      if(owner.canStepLeft(this.m_vStrafeTarget)) {
        owner.getSteering().setTarget(this.m_vStrafeTarget)
      } else {
        this.m_bClockwise = !this.m_bClockwise
        this.m_iStatus = GOAL_STATUS.inactive
      }
    }
  }
  process() {
    this.activeIfInactive()
    const owner = (this.m_pOwner as IRaven_Bot);
    if(!owner.getTargetSys().isTargetWithinFOV()) {
      this.m_iStatus = GOAL_STATUS.completed
    } else if(owner.isAtPosition(this.m_vStrafeTarget)) {
      this.m_iStatus = GOAL_STATUS.inactive
    }
    return this.m_iStatus
  }
  render() {
    gdi.orangePen()
    gdi.hollowBrush()

    gdi.line(this.m_pOwner.pos(), this.m_vStrafeTarget)
    gdi.circle(this.m_vStrafeTarget, 3)
  }
  terminate() {
    (this.m_pOwner as IRaven_Bot).getSteering().seekOff()
  }
}