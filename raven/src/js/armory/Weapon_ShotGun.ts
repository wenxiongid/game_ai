import IRaven_Weapon from "./Raven_weapon/index.d";
import Raven_Weapon from "./Raven_weapon";
import IRaven_Bot from "../Raven_Bot";
import TYPE from "../raven_objectEnumerations";
import { Pellet_MaxSpeed, RocketLauncher_DefaultRounds, RocketLauncher_FiringFreq, RocketLauncher_IdealRange, RocketLauncher_MaxRoundsCarried, RocketLauncher_SoundRange, Rocket_MaxSpeed, ShotGun_DefaultRounds, ShotGun_FiringFreq, ShotGun_IdealRange, ShotGun_MaxRoundsCarried, ShotGun_NumBallsInShell, ShotGun_SoundRange, ShotGun_Spread, Slug_MaxSpeed } from "../config";
import Vector2D from "../common/2D/Vector2D";
import IVector2D from "../common/2D/Vector2D";
import { DefuzzifyMethod } from "../common/fuzzy/FuzzyModule";
import { FzAND } from "../common/fuzzy/FuzzyOperators";
import { vec2dRotateAroundOrigin, worldTransform } from "../common/2D/transformation";
import gdi from "../common/misc/cgdi";
import { randInRange } from "../common/misc/utils";

export default class ShotGun extends Raven_Weapon implements IRaven_Weapon {
  private m_iNumBallsInShell: number
  private m_dSpread: number
  constructor(owner: IRaven_Bot) {
    super(
      TYPE.type_shotgun,
      ShotGun_DefaultRounds,
      ShotGun_MaxRoundsCarried,
      ShotGun_FiringFreq,
      ShotGun_IdealRange,
      Pellet_MaxSpeed,
      owner
    )
    this.m_iNumBallsInShell = ShotGun_NumBallsInShell
    this.m_dSpread = ShotGun_Spread
    this.m_vecWeaponVB = [
      new Vector2D(0, 0),
      new Vector2D(0, -2),
      new Vector2D(10, -2),
      new Vector2D(10, 0),
      new Vector2D(0, 0),
      new Vector2D(0, 2),
      new Vector2D(10, 2),
      new Vector2D(10, 0),
    ]
    this.initFuzzyModule()
  }
  shootAt(pos: IVector2D) {
    if(this.numRoundsRemaining() > 0 && this.isReadyForNextShot()) {
      for (let b = 0; b < this.m_iNumBallsInShell; b++) {
        const deviation = randInRange(0, this.m_dSpread) + randInRange(0, this.m_dSpread) - this.m_dSpread
        const adjustedTarget = pos.clone()
        vec2dRotateAroundOrigin(adjustedTarget, deviation)
        this.m_pOwner.getWorld().addShotGunPellet(this.m_pOwner, adjustedTarget)
      }
      this.m_iNumRoundsLeft--
      this.updateTimeWeaponIsNextAvailable()
      this.m_pOwner.getWorld().getMap().addSoundTrigger(this.m_pOwner, ShotGun_SoundRange)
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

    const ammoLoads = ammoStatus.addRightShoulderSet('Ammo_Loads', 30, 60, 100)
    const ammoOkay = ammoStatus.addTriangularSet('Ammo_Loads', 0, 30, 60)
    const ammoLow = ammoStatus.addLeftShoulderSet('Ammo_Low', 0, 0, 30)

    const desirability = this.m_FuzzyModule.createFLV('Desirability')

    const veryDesirable = desirability.addRightShoulderSet('VeryDesirable', 50, 75, 100)
    const desirable = desirability.addTriangularSet('Desirable', 20, 50, 75)
    const undesirable = desirability.addLeftShoulderSet('Undesirable', 0, 25, 50)

    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLoads), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoOkay), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetClose, ammoLow), veryDesirable)

    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoLoads), veryDesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoOkay), desirable)
    this.m_FuzzyModule.addRule(new FzAND(targetMedium, ammoLow), undesirable)

    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoLoads), desirable)
    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoOkay), undesirable)
    this.m_FuzzyModule.addRule(new FzAND(targetFar, ammoLow), undesirable)
  }
  render() {
    this.m_vecWeaponVBTrans = worldTransform(
      this.m_vecWeaponVB,
      this.m_pOwner.pos(),
      this.m_pOwner.facing(),
      this.m_pOwner.facing().perp(),
      this.m_pOwner.scale()
    )
    gdi.brownPen()
    gdi.closedShape(this.m_vecWeaponVBTrans)
  }
}