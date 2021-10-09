import IRaven_TargetingSystem from './Raven_TargetingSystem.d'
import IVector2D from "./common/2D/Vector2D/index.d";
import IRaven_Bot from "./Raven_Bot/index.d";
import { MaxFloat } from './common/misc/utils';
import { vec2DDistanceSq } from './common/2D/Vector2D';

export default class Raven_TargetingSystem implements IRaven_TargetingSystem {
  m_pOwner: IRaven_Bot
  m_pCurrentTarget: IRaven_Bot | null = null
  constructor(owner: IRaven_Bot) {
    this.m_pOwner = owner
  }
  update() {
    let closestDistSoFar = MaxFloat
    this.m_pCurrentTarget = null
    const sensedBots: IRaven_Bot[] = this.m_pOwner.getSensoryMem().getListOfRecentlySensedOpponents()
    for (const bot of sensedBots) {
      if(bot.isAlive() && bot.id() !== this.m_pOwner.id()) {
        const dist = vec2DDistanceSq(bot.pos(), this.m_pOwner.pos())
        if(dist < closestDistSoFar) {
          closestDistSoFar = dist
          this.m_pCurrentTarget = bot
        }
      }
    }
  }
  getTarget() { return this.m_pCurrentTarget }
  isTargetPresent(): boolean {
    return this.m_pCurrentTarget !== null
  }
  isTargetWithinFOV(): boolean {
    return this.m_pOwner.getSensoryMem().isOpponentWithinFOV(this.m_pCurrentTarget)
  }
  isTargetShootable(): boolean {
    return this.m_pOwner.getSensoryMem().isOpponentShootable(this.m_pCurrentTarget)
  }
  getLastRecordedPosition(): IVector2D {
    return this.m_pOwner.getSensoryMem().getLastRecordedPositionOfOpponent(this.m_pCurrentTarget)
  }
  getTimeTargetHasBeenVisible(): number {
    return this.m_pOwner.getSensoryMem().getTimeOpponentHasBeenVisible(this.m_pCurrentTarget)
  }
  getTimeTargetHasBeenOutOfView(): number {
    return this.m_pOwner.getSensoryMem().getTimeOpponentHasBeenOutOfView(this.m_pCurrentTarget)
  }
  clearTarget() {
    this.m_pCurrentTarget = null
  }
}