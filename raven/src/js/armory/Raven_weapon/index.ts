import IVector2D from '../../common/2D/Vector2D/index.d'
import IRaven_Weapon from './index.d'
import Raven_Bot from '../../Raven_Bot'
import FuzzyModule from '../../common/fuzzy/FuzzyModule'

export default class Raven_Weapon implements IRaven_Weapon {
  m_pOwner: Raven_Bot
  m_iType: number
  m_FuzzyModule: FuzzyModule
  m_iNumRoundsLeft: number
  m_iMaxRoundsCarries: number
  m_dRateOfFire: number
  m_dTimeNextAvailable: number
  m_dLastDesirabilityScore: number
  m_dIdealRange: number
  m_dMaxProjectileSpeed: number
  initFuzzyModule() {}
  m_vecWeaponVB: IVector2D[] = []
  m_vecWeaponVBTrans: IVector2D[] = []
  constructor(
    typeOfGun: number,
    defaultNumRound: number,
    maxRoundsCarried: number,
    rateOfFire: number,
    idealRange: number,
    projectileSpeed: number,
    ownerOfGun: Raven_Bot
  ) {
    this.m_iType = typeOfGun
    this.m_iNumRoundsLeft = defaultNumRound
    this.m_pOwner = ownerOfGun
    this.m_dRateOfFire = rateOfFire
    this.m_iMaxRoundsCarries = maxRoundsCarried
    this.m_dIdealRange = idealRange
    this.m_dMaxProjectileSpeed = projectileSpeed
    this.m_dTimeNextAvailable = (new Date()).getTime()
    this.m_FuzzyModule = new FuzzyModule()
  }
  getLastDesirabilityScore() { return this.m_dLastDesirabilityScore }
  getMaxProjectileSpeed() { return this.m_dMaxProjectileSpeed }
  numRoundsRemaining() { return this.m_iNumRoundsLeft }
  decrementNumRounds() {
    if(this.m_iNumRoundsLeft > 0) {
      --this.m_iNumRoundsLeft
    }
  }
  incrementRounds(num: number) {
    const newRound = Math.max(0, Math.min(this.m_iNumRoundsLeft + num, this.m_iMaxRoundsCarries) )
    this.m_iNumRoundsLeft = newRound
  }
  getType() { return this.m_iType }
  getIdealRange() { return this.m_dIdealRange }
  isReadyForNextShot() {
    const now = (new Date()).getTime()
    if(now > this.m_dTimeNextAvailable) {
      return true
    }
    return false
  }
  updateTimeWeaponIsNextAvailable() {
    const now = (new Date()).getTime()
    this.m_dTimeNextAvailable = now + 1 / this.m_dRateOfFire
  }
  aimAt(target: IVector2D): boolean {
    return this.m_pOwner.rotateFacingTowardPosition(target)
  }
  shootAt(pos: IVector2D) {}
  render() {}
  getDesirability(dist: number) { return 0 }
}