import IRaven_Weapon from "./Raven_weapon/index.d";
import Raven_Weapon from "./Raven_weapon";
import IRaven_Bot from "../Raven_Bot";
import TYPE from "../raven_objectEnumerations";
import { RailGun_DefaultRounds, RailGun_FiringFreq, RailGun_IdealRange, RailGun_MaxRoundsCarried, RailGun_SoundRange, Slug_MaxSpeed } from "../config";
import Vector2D from "../common/2D/Vector2D";
import IVector2D from "../common/2D/Vector2D";
import { DefuzzifyMethod } from "../common/fuzzy/FuzzyModule";
import { FzAND } from "../common/fuzzy/FuzzyOperators";
import { FzFairly, FzVery } from "../common/fuzzy/FuzzyHedges";
import { worldTransform } from "../common/2D/transformation";
import gdi from "../common/misc/cgdi";

export default class RailGun extends Raven_Weapon implements IRaven_Weapon {
  constructor(owner: IRaven_Bot) {
    super(
      TYPE.type_rail_gun,
      RailGun_DefaultRounds,
      RailGun_MaxRoundsCarried,
      RailGun_FiringFreq,
      RailGun_IdealRange,
      Slug_MaxSpeed,
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
    if(this.numRoundsRemaining() > 0 && this.isReadyForNextShot()) {
      this.m_pOwner.getWorld().addRailGunSlug(this.m_pOwner, pos)
      this.updateTimeWeaponIsNextAvailable()
      this.m_iNumRoundsLeft--
      this.m_pOwner.getWorld().getMap().addSoundTrigger(this.m_pOwner, RailGun_SoundRange)
    }
  }
  getDesirability(distToTarget: number) {
    if(this.m_iNumRoundsLeft === 0) {
      this.m_dLastDesirabilityScore = 0
    } else {
      this.m_FuzzyModule.fuzzify('DistanceToTarget', distToTarget)
      this.m_FuzzyModule.fuzzify('AmmoStatus', this.m_iNumRoundsLeft)
      this.m_dLastDesirabilityScore = this.m_FuzzyModule.deFuzzify('Desirability', DefuzzifyMethod.max_av)
    }
    return this.m_dLastDesirabilityScore
  }
  initFuzzyModule() {
    const distanceToTarget = this.m_FuzzyModule.createFLV('DistanceToTarget')

    const targetClose = distanceToTarget.addLeftShoulderSet('Target_Close', 0, 25, 150)
    const targetMedium = distanceToTarget.addTriangularSet('Target_Medium', 25, 150, 300)
    const targetFar = distanceToTarget.addRightShoulderSet('Target_Far', 150, 300, 1000)

    const ammoStatus = this.m_FuzzyModule.createFLV('AmmoStatus')

    const ammoLoads = ammoStatus.addRightShoulderSet('Ammo_Loads', 15, 30, 100)
    const ammoOkay = ammoStatus.addTriangularSet('Ammo_Loads', 0, 15, 30)
    const ammoLow = ammoStatus.addLeftShoulderSet('Ammo_Low', 0, 0, 15)

    const desirability = this.m_FuzzyModule.createFLV('Desirability')

    const veryDesirable = desirability.addRightShoulderSet('VeryDesirable', 50, 75, 100)
    const desirable = desirability.addTriangularSet('Desirable', 25, 50, 75)
    const Undesirable = desirability.addLeftShoulderSet('Undesirable', 0, 25, 50)

    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLoads), new FzFairly(desirable))
    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoOkay), new FzFairly(desirable))
    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLow), Undesirable)

    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoLoads), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoOkay), desirable)
    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoLow), desirable)

    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoLoads), new FzVery(veryDesirable))
    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoOkay), new FzVery(veryDesirable))
    this.m_FuzzyModule.addRule(new FzAND(targetFar, new FzFairly(ammoLow)), veryDesirable)
  }
  render() {
    this.m_vecWeaponVBTrans = worldTransform(
      this.m_vecWeaponVB,
      this.m_pOwner.pos(),
      this.m_pOwner.facing(),
      this.m_pOwner.facing().perp(),
      this.m_pOwner.scale()
    )
    gdi.bluePen()
    gdi.closedShape(this.m_vecWeaponVBTrans)
  }
}