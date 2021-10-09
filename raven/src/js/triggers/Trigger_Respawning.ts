import Trigger from './Trigger'
import ITrigger_Respawning from './Trigger_Respawning.d'

export default class Trigger_Respawning extends Trigger implements ITrigger_Respawning {
  m_iNumUpdatesBetweenRespawns: number
  m_iNumUpdatesRemainingUtilRespawn: number
  deactivate() {
    this.setInactive()
    this.m_iNumUpdatesRemainingUtilRespawn = this.m_iNumUpdatesBetweenRespawns
  }
  update() {
    if(
      (--this.m_iNumUpdatesRemainingUtilRespawn <= 0) &&
      !this.isActive()
    ) {
      this.setActive()
    }
  }
  setRespawnDelay(numTicks: number) {
    this.m_iNumUpdatesBetweenRespawns = numTicks
  }
}