import IRaven_Weapon from "./armory/Raven_weapon/index.d";
import IVector2D from "./common/2D/Vector2D/index.d";
import IRaven_Bot from "./Raven_Bot/index.d";

export default interface IRaven_WeaponSystem {
  m_pOwner: IRaven_Bot
  // 拥有者持有的武器列表
  m_WeaponMap: {[key: number]: IRaven_Weapon}
  m_pCurrentWeapon: IRaven_Weapon
  // 拥有者从见到对手到可以开枪的时间
  m_dReactionTime: number
  // 瞄准准度，越低越准，建议 0~0.2
  m_dAimAccuracy: number
  // 目标消失之后继续瞄准的时间长度
  m_dAimPersistance: number
  // 预计击中时，目标会到达的位置
  predictFuturePositionOfTarget(): IVector2D
  addNoiseToAim(aimingPos: IVector2D): void
  initialize(): void
  takeAimAndShoot(): void
  selectWeapon(): void
  addWeapon(weapon_type: number): void
  changeWeapon(type: number): void
  shootAt(pos: IVector2D): void
  getCurrentWeapon(): IRaven_Weapon
  getWeaponFromInvetory(weapon_type: number): IRaven_Weapon | null
  // 获取指定武器的子弹数
  getAmmoRemainingForWeapon(weapon_type: number): number
  reactionTime(): number
  renderCurrentWeapon(): void
  renderDesirabilities(): void
}