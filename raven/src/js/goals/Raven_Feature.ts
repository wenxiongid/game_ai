import { clamp } from "../common/misc/utils";
import { RailGun_MaxRoundsCarried, RocketLauncher_MaxRoundsCarried, ShotGun_MaxRoundsCarried } from "../config";
import IRaven_Bot from "../Raven_Bot/index.d";
import TYPE from "../raven_objectEnumerations";

class Raven_Feature {
  private getMaxRoundsBotCanCarryForWeapon(weaponType: number): number {
    switch(weaponType) {
      case TYPE.type_rail_gun:
        return RailGun_MaxRoundsCarried
      case TYPE.type_rocket_launcher:
        return RocketLauncher_MaxRoundsCarried
      case TYPE.type_shotgun:
        return ShotGun_MaxRoundsCarried
      default:
        console.error('trying to calculate of unknown weapon')
    }
  }
  health(pBot: IRaven_Bot): number {
    return pBot.health() / pBot.maxHealth()
  }
  distanceToItem(pBot: IRaven_Bot, itemType: number): number {
    const distanceToItem = pBot.getPathPlanner().getCostToClosestItem(itemType)
    if(distanceToItem < 0) return 1
    const maxDistance = 500
    const minDistance = 50

    return clamp(distanceToItem, minDistance, maxDistance) / maxDistance
  }
  individualWeaponStrength(pBot: IRaven_Bot, weaponType: number): number {
    const wp = pBot.getWeaponSys().getWeaponFromInvetory(weaponType)
    if(wp) {
      return wp.numRoundsRemaining() / this.getMaxRoundsBotCanCarryForWeapon(weaponType)
    } else {
      return 0
    }
  }
  totalWeaponStrength(pBot: IRaven_Bot): number {
    const maxRoundsForShotgun = this.getMaxRoundsBotCanCarryForWeapon(TYPE.type_shotgun)
    const maxRoundsForRailgun = this.getMaxRoundsBotCanCarryForWeapon(TYPE.type_rail_gun)
    const maxRoundsForRocketLauncher = this.getMaxRoundsBotCanCarryForWeapon(TYPE.type_rocket_launcher)
    const totalRoundsCarryable = maxRoundsForShotgun + maxRoundsForRailgun + maxRoundsForRocketLauncher

    const numCartridges = pBot.getWeaponSys().getAmmoRemainingForWeapon(TYPE.type_shotgun)
    const numSlugs = pBot.getWeaponSys().getAmmoRemainingForWeapon(TYPE.type_rail_gun)
    const numRockets = pBot.getWeaponSys().getAmmoRemainingForWeapon(TYPE.type_rocket_launcher)

    const tweaker = 0.1

    return tweaker + (1 - tweaker) * (numSlugs + numCartridges + numRockets) / totalRoundsCarryable
  }
}

export default new Raven_Feature()