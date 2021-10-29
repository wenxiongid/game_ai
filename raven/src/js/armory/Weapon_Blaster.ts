import { worldTransform } from "../common/2D/transformation";
import IVector2D from "../common/2D/Vector2D";
import Vector2D from "../common/2D/Vector2D";
import { FzVery } from "../common/fuzzy/FuzzyHedges";
import { DefuzzifyMethod } from "../common/fuzzy/FuzzyModule";
import gdi from "../common/misc/cgdi";
import { Blaster_DefaultRounds, Blaster_FiringFreq, Blaster_IdealRange, Blaster_MaxRoundsCarried, Blaster_SoundRange, Bolt_MaxSpeed } from "../config";
import IRaven_Bot from "../Raven_Bot";
import TYPE from "../raven_objectEnumerations";
import IRaven_Weapon from "./Raven_weapon/index.d";
import Raven_Weapon from "./Raven_weapon";

export default class Blaster extends Raven_Weapon implements IRaven_Weapon {
  constructor(owner: IRaven_Bot) {
    super(
      TYPE.type_blaster,
      Blaster_DefaultRounds,
      Blaster_MaxRoundsCarried,
      Blaster_FiringFreq,
      Blaster_IdealRange,
      Bolt_MaxSpeed,
      owner
    )
    this.m_vecWeaponVB = [
      new Vector2D(0, -1),
      new Vector2D(10, -1),
      new Vector2D(10, 1),
      new Vector2D(0, 1),
    ]
    this.initFuzzyModule()
  }
  shootAt(pos: IVector2D) {
    if(this.isReadyForNextShot()) {
      this.m_pOwner.getWorld().addBolt(this.m_pOwner, pos)
      this.updateTimeWeaponIsNextAvailable()
      this.m_pOwner.getWorld().getMap().addSoundTrigger(this.m_pOwner, Blaster_SoundRange)
    }
  }
  getDesirability(distToTarget: number) {
    this.m_FuzzyModule.fuzzify('DistToTarget', distToTarget)
    this.m_dLastDesirabilityScore = this.m_FuzzyModule.deFuzzify('Desirability', DefuzzifyMethod.max_av)
    return this.m_dLastDesirabilityScore
  }
  initFuzzyModule() {
    const distToTarget = this.m_FuzzyModule.createFLV('DistToTarget')

    const target_close = distToTarget.addLeftShoulderSet('Target_Close', 0, 25, 150)
    const target_medium = distToTarget.addTriangularSet('Target_Medium', 25, 150, 300)
    const target_far = distToTarget.addRightShoulderSet('Target_Far', 150, 300, 1000)

    const desirability = this.m_FuzzyModule.createFLV('Desirability')
    const veryDesirable = desirability.addRightShoulderSet('VeryDesirable', 50, 75, 100)
    const desirable = desirability.addTriangularSet('Desirable', 25, 50, 75)
    const undesirable = desirability.addLeftShoulderSet('Undesirable', 0, 25, 50)

    this.m_FuzzyModule.addRule(target_close, desirable)
    this.m_FuzzyModule.addRule(target_medium, new FzVery(undesirable))
    this.m_FuzzyModule.addRule(target_far, new FzVery(undesirable))
  }
  render() {
    this.m_vecWeaponVBTrans = worldTransform(
      this.m_vecWeaponVB,
      this.m_pOwner.pos(),
      this.m_pOwner.facing(),
      this.m_pOwner.facing().perp(),
      this.m_pOwner.scale()
    )
    gdi.greenPen()
    gdi.closedShape(this.m_vecWeaponVBTrans)
  }
}