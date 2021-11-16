import IRaven_Weapon from "./Raven_weapon/index.d";
import Raven_Weapon from "./Raven_weapon";
import IRaven_Bot from "../Raven_Bot";
import TYPE from "../raven_objectEnumerations";
import { RocketLauncher_DefaultRounds, RocketLauncher_FiringFreq, RocketLauncher_IdealRange, RocketLauncher_MaxRoundsCarried, RocketLauncher_SoundRange, Rocket_MaxSpeed, Slug_MaxSpeed } from "../config";
import Vector2D from "../common/2D/Vector2D";
import IVector2D from "../common/2D/Vector2D";
import { DefuzzifyMethod } from "../common/fuzzy/FuzzyModule";
import { FzAND } from "../common/fuzzy/FuzzyOperators";
import { worldTransform } from "../common/2D/transformation";
import gdi from "../common/misc/cgdi";

export default class RocketLauncher extends Raven_Weapon implements IRaven_Weapon {
  constructor(owner: IRaven_Bot) {
    super(
      TYPE.type_rocket_launcher,
      RocketLauncher_DefaultRounds,
      RocketLauncher_MaxRoundsCarried,
      RocketLauncher_FiringFreq,
      RocketLauncher_IdealRange,
      Rocket_MaxSpeed,
      owner
    )
    this.m_vecWeaponVB = [
      new Vector2D(0, -3),
      new Vector2D(6, -3),
      new Vector2D(6, -1),
      new Vector2D(15, -1),
      new Vector2D(15, 1),
      new Vector2D(6, 1),
      new Vector2D(6, 3),
      new Vector2D(0, 3),
    ]
    this.initFuzzyModule()
  }
  shootAt(pos: IVector2D) {
    if(this.numRoundsRemaining() > 0 && this.isReadyForNextShot()) {
      this.m_pOwner.getWorld().addRocket(this.m_pOwner, pos)
      this.updateTimeWeaponIsNextAvailable()
      this.m_iNumRoundsLeft--
      this.m_pOwner.getWorld().getMap().addSoundTrigger(this.m_pOwner, RocketLauncher_SoundRange)
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

    const ammoLoads = ammoStatus.addRightShoulderSet('Ammo_Loads', 10, 30, 100)
    const ammoOkay = ammoStatus.addTriangularSet('Ammo_Loads', 0, 10, 30)
    const ammoLow = ammoStatus.addLeftShoulderSet('Ammo_Low', 0, 0, 10)

    const desirability = this.m_FuzzyModule.createFLV('Desirability')

    const veryDesirable = desirability.addRightShoulderSet('VeryDesirable', 50, 75, 100)
    const desirable = desirability.addTriangularSet('Desirable', 20, 50, 75)
    const undesirable = desirability.addLeftShoulderSet('Undesirable', 0, 25, 50)

    // this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLoads), undesirable)
    // this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoOkay), undesirable)
    // this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLow), undesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLoads), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoOkay), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLow), veryDesirable)

    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoLoads), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoOkay), veryDesirable)
    // this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoLow), desirable)
    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoLow), veryDesirable)

    // this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoLoads), desirable)
    // this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoOkay), undesirable)
    // this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoLow), undesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoLoads), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoOkay), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoLow), veryDesirable)
  }
  render() {
    this.m_vecWeaponVBTrans = worldTransform(
      this.m_vecWeaponVB,
      this.m_pOwner.pos(),
      this.m_pOwner.facing(),
      this.m_pOwner.facing().perp(),
      this.m_pOwner.scale()
    )
    gdi.redPen()
    gdi.closedShape(this.m_vecWeaponVBTrans)
  }
}