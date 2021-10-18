import IVector2D from "../common/2D/Vector2D/index.d"
import IRaven_Bot from "../Raven_Bot/index.d"

export interface IGoal_Evaluator {
  calculateDesirability(pBot: IRaven_Bot): number
  setGoal(pBot: IRaven_Bot): void
  renderInfo(position: IVector2D, pBot: IRaven_Bot): void
}

export default class Goal_Evaluator implements IGoal_Evaluator {
  protected m_dCharacterBias: number
  constructor(characterBias: number) {
    this.m_dCharacterBias = characterBias
  }
  calculateDesirability(pBot: IRaven_Bot) { return 0 }
  setGoal(pBot: IRaven_Bot) {}
  renderInfo(position: IVector2D, pBot: IRaven_Bot) {}
}