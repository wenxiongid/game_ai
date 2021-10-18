import IVector2D from "../common/2D/Vector2D";
import gdi from "../common/misc/cgdi";
import IRaven_Bot from "../Raven_Bot/index.d";
import Goal_Evaluator, { IGoal_Evaluator } from "./Goal_Evaluator";

export default class ExploreGoal_Evaluator extends Goal_Evaluator implements IGoal_Evaluator {
  constructor(bias: number) {
    super(bias)
  }
  calculateDesirability(pBot: IRaven_Bot) {
    const desirability = 0.05
    return desirability * this.m_dCharacterBias
  }
  setGoal(pBot: IRaven_Bot) {
    pBot.getBrain().addGoal_Explore()
  }
  renderInfo(position: IVector2D, pBot: IRaven_Bot) {
    gdi.textAtPos(position, `EX: ${this.calculateDesirability(pBot)}`)
  }
}