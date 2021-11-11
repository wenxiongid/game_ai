import IRaven_WeaponSystem from './Raven_WeaponSystem.d'
import IRaven_Weapon from "./armory/Raven_weapon/index.d";
import IVector2D from "./common/2D/Vector2D/index.d";
import IRaven_Bot from "./Raven_Bot/index.d";
import TYPE, { getNameOfType } from './raven_objectEnumerations';
import { vec2DDistance } from './common/2D/Vector2D';
import { vec2dRotateAroundOrigin } from './common/2D/transformation';
import { randInRange } from './common/misc/utils';
import gdi from './common/misc/cgdi';
import Blaster from './armory/Weapon_Blaster';
import RailGun from './armory/Weapon_RailGun';
import ShotGun from './armory/Weapon_ShotGun';
import RocketLauncher from './armory/Weapon_RocketLauncher';

export default class Raven_WeaponSystem implements IRaven_WeaponSystem {
  m_pOwner: IRaven_Bot
  m_WeaponMap: {[key: number]: IRaven_Weapon | null}
  m_pCurrentWeapon: IRaven_Weapon
  m_dReactionTime: number
  m_dAimAccuracy: number
  m_dAimPersistance: number
  predictFuturePositionOfTarget() {
    const targetBot = this.m_pOwner.getTargetBot()
    const maxSpeed = this.getCurrentWeapon().getMaxProjectileSpeed()
    const toEnemy = targetBot.pos().add(this.m_pOwner.pos().getReverse())
    const lookAheadTime = toEnemy.length() / (maxSpeed + targetBot.maxSpeed())
    return this.m_pOwner.getTargetBot().pos().add(targetBot.velocity().crossNum(lookAheadTime))
  }
  addNoiseToAim(aimingPos: IVector2D): IVector2D {
    const toPos = aimingPos.add(this.m_pOwner.pos().getReverse())
    vec2dRotateAroundOrigin(toPos, randInRange(-this.m_dAimAccuracy, this.m_dAimAccuracy))
    return toPos.add(this.m_pOwner.pos())
  }
  constructor(owner: IRaven_Bot, reactionTime: number, aimAccuracy: number, aimPersistance: number) {
    this.m_pOwner = owner
    this.m_dReactionTime = reactionTime
    this.m_dAimAccuracy = aimAccuracy
    this.m_dAimPersistance = aimPersistance
    this.initialize()
  }
  initialize() {
    this.m_WeaponMap = {}
    this.m_pCurrentWeapon = new Blaster(this.m_pOwner)
    this.m_WeaponMap[TYPE.type_blaster] = this.m_pCurrentWeapon
    this.m_WeaponMap[TYPE.type_shotgun] = null
    this.m_WeaponMap[TYPE.type_rail_gun] = null
    this.m_WeaponMap[TYPE.type_rocket_launcher] = null
  }
  takeAimAndShoot(): void {
    if(
      this.m_pOwner.getTargetSys().isTargetShootable() ||
      this.m_pOwner.getTargetSys().getTimeTargetHasBeenOutOfView() < this.m_dAimPersistance
    ) {
      let aimingPos: IVector2D = this.m_pOwner.getTargetBot().pos()
      const currentWeaponType = this.getCurrentWeapon().getType()
      // 延时武器预计弹道
      if(
         currentWeaponType === TYPE.type_rocket_launcher ||
         currentWeaponType === TYPE.type_blaster
      ) {
        aimingPos = this.predictFuturePositionOfTarget()
        if(
          this.m_pOwner.rotateHeadingToFacePosition(aimingPos) &&
          (
            this.m_pOwner.getTargetSys().getTimeTargetHasBeenVisible() > this.m_dReactionTime &&
            this.m_pOwner.hasLOSto(aimingPos)
          )
        ) {
          aimingPos = this.addNoiseToAim(aimingPos)
          this.getCurrentWeapon().shootAt(aimingPos)
        }
      } else {
        if(
          this.m_pOwner.rotateHeadingToFacePosition(aimingPos) &&
          this.m_pOwner.getTargetSys().getTimeTargetHasBeenVisible() > this.m_dReactionTime
        ) {
          aimingPos = this.addNoiseToAim(aimingPos)
          this.getCurrentWeapon().shootAt(aimingPos)
        }
      }
    } else {
      this.m_pOwner.rotateHeadingToFacePosition(this.m_pOwner.pos().add(this.m_pOwner.heading()))
    }
  }
  selectWeapon(): void {
    if(this.m_pOwner.getTargetSys().isTargetPresent()) {
      const distToTarget = vec2DDistance(this.m_pOwner.pos(), this.m_pOwner.getTargetSys().getTarget().pos())
      let bestSoFar = 0
      // 各种武器对距离算分数，取最高值
      for (const key in this.m_WeaponMap) {
        if (Object.prototype.hasOwnProperty.call(this.m_WeaponMap, key)) {
          const weapon = this.m_WeaponMap[key];
          if(weapon) {
            const score = weapon.getDesirability(distToTarget)
            if(score > bestSoFar) {
              bestSoFar = score
              this.m_pCurrentWeapon = weapon
            }
          }
        }
      }
    } else {
      this.m_pCurrentWeapon = this.m_WeaponMap[TYPE.type_blaster]
    }
  }
  addWeapon(weapon_type: number): void {
    let weapon: IRaven_Weapon
    switch(weapon_type) {
      case TYPE.type_rail_gun:
        weapon = new RailGun(this.m_pOwner)
        break
      case TYPE.type_shotgun:
        weapon = new ShotGun(this.m_pOwner)
        break
      case TYPE.type_rocket_launcher:
        weapon = new RocketLauncher(this.m_pOwner)
        break
    }
    const present = this.getWeaponFromInvetory(weapon_type)
    if(present) {
      present.incrementRounds(weapon.numRoundsRemaining())
    } else {
      this.m_WeaponMap[weapon_type] = weapon
    }
  }
  changeWeapon(type: number) {
    const w = this.m_WeaponMap[type]
    if(w) this.m_pCurrentWeapon = w
  }
  shootAt(pos: IVector2D) {
    this.getCurrentWeapon().shootAt(pos)
  }
  getCurrentWeapon() {
    return this.m_pCurrentWeapon
  }
  getWeaponFromInvetory(weapon_type: number): IRaven_Weapon | null {
    return this.m_WeaponMap[weapon_type]
  }
  getAmmoRemainingForWeapon(weapon_type: number): number {
    const weapon = this.m_WeaponMap[weapon_type]
    if(weapon) {
      return weapon.numRoundsRemaining()
    }
    return 0
  }
  reactionTime() {
    return this.m_dReactionTime
  }
  renderCurrentWeapon() {
    this.getCurrentWeapon().render()
  }
  renderDesirabilities() {
    const p = this.m_pOwner.pos()
    let num = 0
    for (const type in this.m_WeaponMap) {
      if (Object.prototype.hasOwnProperty.call(this.m_WeaponMap, type)) {
        const weapon = this.m_WeaponMap[type];
        if(weapon) num++
      }
    }
    let offset = 15 * num
    for (const type in this.m_WeaponMap) {
      if (Object.prototype.hasOwnProperty.call(this.m_WeaponMap, type)) {
        const weapon = this.m_WeaponMap[type];
        if(weapon) {
          const score = weapon.getLastDesirabilityScore()
          const typeName = getNameOfType(weapon.getType())
          gdi.textAtPos(p.x + 10, p.y - offset, `${typeName} ${score}`)
          offset += 15
        }
      }
    }
  }
}