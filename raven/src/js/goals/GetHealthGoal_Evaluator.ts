import IVector2D from "../common/2D/Vector2D/index.d";
import IRaven_Bot from "../Raven_Bot/index.d";
import Goal_Evaluator, { IGoal_Evaluator } from "./Goal_Evaluator";
import ravenFeature from './Raven_Feature'
import TYPE from "../raven_objectEnumerations";
import { clamp } from "../common/misc/utils";
import gdi from "../common/misc/cgdi";
import Vector2D from "../common/2D/Vector2D";

export default class GetHealthGoal_Evaluator extends Goal_Evaluator implements IGoal_Evaluator {
  constructor(bias: number) {
    super(bias)
  }
  calculateDesirability(pBot: IRaven_Bot): number {
    const distance = ravenFeature.distanceToItem(pBot, TYPE.type_health)
    if(distance === 1) {
      return 0
    } else {
      const tweaker = 0.2
      const desirability = tweaker * (1 - ravenFeature.health(pBot)) / distance

      return clamp(desirability, 0, 1) * this.m_dCharacterBias
    }
  }
  setGoal(pEnt: IRaven_Bot) {
    pEnt.getBrain().addGoal_GetItem(TYPE.type_health)
  }
  renderInfo(position: IVector2D, pBot: IRaven_Bot) {
    gdi.textAtPos(position, `H: ${this.calculateDesirability(pBot)}`)
    // return
    const s = `${1 - ravenFeature.health(pBot)}, ${ravenFeature.distanceToItem(pBot, TYPE.type_health)}`
    gdi.textAtPos(position.add(new Vector2D(0, 15)), s)
  }
}