import IRaven_Bot from "../../Raven_Bot";
import IVector2D from "../../common/2D/Vector2D/index.d";

export default interface IRaven_Weapon {
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
  isReadyForNextShot(): boolean
  updateTimeWeaponIsNextAvailable(): void
  initFuzzyModule(): void
  m_vecWeaponVB: IVector2D
  m_vecWeaponVBTrans: IVector2D
  constructor(
    typeOfGun: number,
    defaultNumRound: number,
    maxRoundsCarried: number,
    rateOfFire: number,
    idealRange: number,
    projectileSpeed: number,
    ownerOfGun: IRaven_Bot
    ): void
  aimAt(target: IVector2D): boolean
  shootAt(pos: IVector2D): void
  render(): void
  getDesirability(distToTarget: number): number
  getLastDesirabilityScore(): number
  getType(): number
  incrementRounds(count: number): void
  numRoundsRemaining(): number
  getMaxProjectileSpeed(): number
}