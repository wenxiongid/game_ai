import ITrigger from './Trigger.d'

export default interface ITrigger_Respawning extends ITrigger {
  m_iNumUpdatesBetweenRespawns: number
  m_iNumUpdatesRemainingUtilRespawn: number
  deactivate(): void
  setRespawnDelay(numTicks: number): void
}