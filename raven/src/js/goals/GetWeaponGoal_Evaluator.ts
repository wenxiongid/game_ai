import IVector2D from "../common/2D/Vector2D";
import gdi from "../common/misc/cgdi";
import { clamp } from "../common/misc/utils";
import IRaven_Bot from "../Raven_Bot/index.d";
import TYPE from "../raven_objectEnumerations";
import Goal_Evaluator, { IGoal_Evaluator } from "./Goal_Evaluator";
import ravenFeature from "./Raven_Feature";

export default class GetWeaponGoal_Evaluator extends Goal_Evaluator implements IGoal_Evaluator {
  private m_iWeaponType: number
  constructor(bias: number, weaponType: number) {
    super(bias)
    this.m_iWeaponType = weaponType
  }
  calculateDesirability(pBot: IRaven_Bot) {
    const distance = ravenFeature.distanceToItem(pBot, this.m_iWeaponType)
    if(distance === 1) {
      return 0
    } else {
      const tweaker = 0.15
      const health = ravenFeature.health(pBot)
      const weaponStrength = ravenFeature.individualWeaponStrength(pBot, this.m_iWeaponType)
      const desirability = (tweaker * health * (1 - weaponStrength)) / distance
      return clamp(desirability, 0, 1) * this.m_dCharacterBias
    }
  }
  setGoal(pBot: IRaven_Bot) {
    pBot.getBrain().addGoal_GetItem(this.m_iWeaponType)
  }
  renderInfo(position: IVector2D, pBot: IRaven_Bot) {
    let s: string = ''
    switch(this.m_iWeaponType) {
      case TYPE.type_rail_gun:
        s = 'RG: '
        break
      case TYPE.type_rocket_launcher:
        s = 'RL:'
        break
      case TYPE.type_shotgun:
        s = 'SG: '
        break
    }
    gdi.textAtPos(position, `${s}${this.calculateDesirability(pBot)}`)
  }
}