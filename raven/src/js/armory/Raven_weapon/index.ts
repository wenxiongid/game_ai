import IVector2D from '../../common/2D/Vector2D/index.d'
import IRaven_Weapon from './index.d'
import IRaven_Bot from '../../Raven_Bot/index.d'

export default class Raven_Weapon implements IRaven_Weapon {
  m_pOwner: IRaven_Bot
  m_iType: number
  m_FuzzyModule
  m_iNumRoundsLeft: number
  m_iMaxRoundsCarries: number
  m_dRateOfFire: number
  m_dTimeNextAvailable: number
  m_dLastDesirabilityScore: number
  m_dIdealRange: number
  m_dMaxProjectileSpeed: number
  constructor() {
    this.m_dTimeNextAvailable = (new Date()).getTime()
  }
  getLastDesirabilityScore() {
    return this.m_dLastDesirabilityScore
  }
  getMaxProjectileSpeed() {
    return this.m_dMaxProjectileSpeed
  }
  numRoundsRemaining() {
    return this.m_iNumRoundsLeft
  }
  decrementNumRounds() {
    if(this.m_iNumRoundsLeft > 0) {
      --this.m_iNumRoundsLeft
    }
  }
  incrementRounds(num: number) {
    const newRound = Math.max(0, Math.min(this.m_iNumRoundsLeft + num, this.m_iMaxRoundsCarries) )
    this.m_iNumRoundsLeft = newRound
  }
  getType() {
    return this.m_iType
  }
  getIdealRange() {
    return this.m_dIdealRange
  }
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
}