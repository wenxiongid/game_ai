import Vector2D from "../common/2D/Vector2D";
import IVector2D from "../common/2D/Vector2D/index.d";
import gdi from "../common/misc/cgdi";
import IRaven_Bot from "../Raven_Bot/index.d";
import Goal_Evaluator, { IGoal_Evaluator } from "./Goal_Evaluator";
import ravenFeature from "./Raven_Feature";

export default class AttackTargetGoal_Evaluator extends Goal_Evaluator implements IGoal_Evaluator {
  constructor(bias: number) {
    super(bias)
  }
  calculateDesirability(pBot: IRaven_Bot) {
    let desirability = 0
    if(pBot.getTargetSys().isTargetPresent()) {
      const tweaker = 1.0
      desirability = tweaker * ravenFeature.health(pBot) * ravenFeature.totalWeaponStrength(pBot)
      desirability *= this.m_dCharacterBias
    }
    return desirability
  }
  setGoal(pBot: IRaven_Bot) {
    pBot.getBrain().addGoal_AttackTarget()
  }
  renderInfo(position: IVector2D, pBot: IRaven_Bot) {
    gdi.textAtPos(position, `AT: ${this.calculateDesirability(pBot)}`)
    // return
    const s = `${ravenFeature.health(pBot)}, ${ravenFeature.totalWeaponStrength(pBot)}`
    gdi.textAtPos(position.add(new Vector2D(0, 12)), s)
  }
}