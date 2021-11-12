import Vector2D from "../common/2D/Vector2D";
import IVector2D from "../common/2D/Vector2D";
import { GOAL_STATUS } from "../common/goals/goal";
import Goal_Composite, { IGoal_Composite } from "../common/goals/goal_composite";
import gdi from "../common/misc/cgdi";
import { randInRange } from "../common/misc/utils";
import IRaven_Bot from "../Raven_Bot/index.d";
import TYPE from "../raven_objectEnumerations";
import AttackTargetGoal_Evaluator from "./AttackTargetGoal_Evaluator";
import ExploreGoal_Evaluator from "./ExploreGoal_Evaluator";
import GetHealthGoal_Evaluator from "./GetHealthGoal_Evaluator";
import GetWeaponGoal_Evaluator from "./GetWeaponGoal_Evaluator";
import Goal_AttackTarget from "./Goal_AttackTarget";
import Goal_Evaluator, { IGoal_Evaluator } from "./Goal_Evaluator";
import Goal_Explorer from "./Goal_Explorer";
import Goal_GetItem, { itemTypeToGoalType } from "./Goal_GetItem";
import { Goal_MoveToPosition } from "./Goal_MoveToPosition";
import { GOAL_TYPES } from "./Raven_Goal_Types";

export default class Goal_Think extends Goal_Composite implements IGoal_Composite {
  private m_Evaluators: Goal_Evaluator[]
  constructor(pBot: IRaven_Bot) {
    super(pBot, GOAL_TYPES.goal_think)
    const lowRangeOfBias = 0.5
    const highRangeOfBias = 1.5
    const healthBias = randInRange(lowRangeOfBias, highRangeOfBias)
    const shotgunBias = randInRange(lowRangeOfBias, highRangeOfBias)
    const rocketLauncherBias = randInRange(lowRangeOfBias, highRangeOfBias)
    const railgunBias = randInRange(lowRangeOfBias, highRangeOfBias)
    const exploreBias = randInRange(lowRangeOfBias, highRangeOfBias)
    const attackBias = randInRange(lowRangeOfBias, highRangeOfBias)

    this.m_Evaluators = []
    this.m_Evaluators.push(new GetHealthGoal_Evaluator(healthBias))
    this.m_Evaluators.push(new ExploreGoal_Evaluator(exploreBias))
    this.m_Evaluators.push(new AttackTargetGoal_Evaluator(attackBias))
    // this.m_Evaluators.push(new GetWeaponGoal_Evaluator(TYPE.type_shotgun, shotgunBias))
    // this.m_Evaluators.push(new GetWeaponGoal_Evaluator(TYPE.type_rail_gun, railgunBias))
    // this.m_Evaluators.push(new GetWeaponGoal_Evaluator(TYPE.type_rocket_launcher, rocketLauncherBias))
  }
  arbitrate() {
    const bot = this.m_pOwner as IRaven_Bot
    let best = 0
    let mostSesirable: IGoal_Evaluator | null = null
    for (const evaluator of this.m_Evaluators) {
      // console.log('<Goal_Think>::arbitrate evaluator:', evaluator)
      const desirability = evaluator.calculateDesirability(bot)
      // console.log('<Goal_Think>::arbitrate desirability', desirability)
      if(desirability >= best) {
        best = desirability
        mostSesirable = evaluator
      }
    }
    // console.log('<Goal_Think>::arbitrate', mostSesirable)
    if(mostSesirable) {
      mostSesirable.setGoal(bot)
    } else {
      console.error('[Goal_Think] arbitrate: no evaluator selected')
    }
  }
  notPresent(goalType: number): boolean {
    if(this.m_subGoals.length) {
      return this.m_subGoals[0].getType() !== goalType
    }
    return true
  }
  activate() {
    if((this.m_pOwner as IRaven_Bot).isPossessed()) {
      this.arbitrate()
    }
    this.m_iStatus = GOAL_STATUS.active
  }
  process() {
    this.activeIfInactive()
    const subGoalStatus = this.processSubgoals()
    if(subGoalStatus === GOAL_STATUS.completed || subGoalStatus === GOAL_STATUS.failed) {
      if((this.m_pOwner as IRaven_Bot).isPossessed()) {
        this.m_iStatus = GOAL_STATUS.inactive
      }
    }
    return this.m_iStatus
  }
  terminate() {}
  addGoal_MoveToPosition(pos: IVector2D) {
    this.addSubgoal(new Goal_MoveToPosition(this.m_pOwner as IRaven_Bot, pos))
  }
  addGoal_GetItem(itemType: number) {
    if(this.notPresent(itemTypeToGoalType(itemType))) {
      this.addSubgoal(new Goal_GetItem(this.m_pOwner as IRaven_Bot, itemType))
    }
  }
  addGoal_Explore() {
    if(this.notPresent(GOAL_TYPES.goal_explore)) {
      this.removeAllSubgoals()
      this.addSubgoal(new Goal_Explorer(this.m_pOwner as IRaven_Bot))
    }
  }
  addGoal_AttackTarget() {
    if(this.notPresent(GOAL_TYPES.goal_attack_target)) {
      this.removeAllSubgoals()
      this.addSubgoal(new Goal_AttackTarget(this.m_pOwner as IRaven_Bot))
    }
  }
  queueGoal_MoveToPosition(pos: IVector2D) {
    this.m_subGoals.push(new Goal_MoveToPosition(this.m_pOwner as IRaven_Bot, pos))
  }
  renderEvaluations(left: number, top: number) {
    gdi.textColor(gdi.BLACK)
    for (const evaluator of this.m_Evaluators) {
      evaluator.renderInfo(new Vector2D(left, top), this.m_pOwner as IRaven_Bot)
      left += 75
    }
  }
  render() {
    for (const subGoal of this.m_subGoals) {
      subGoal.render()
    }
  }
}