import IRaven_Map from './index.d'

export default class Raven_Map implements IRaven_Map {
  getTriggers() {
    return this.m_TriggerSystem.getTriggers()
  }
  getWalls() {
    return this.m_Walls
  }
  getNavGraph() {
    return this.m_pNavGraph
  }
  getDoors() {
    return this.m_Doors
  }
  getSpawnPoints() {
    return this.m_SpawnPoints
  }
  getCellSpace() {
    return this.m_pSpacePartition
  }
  getRandomSpawnPoint() {
    return this.m_SpawnPoints[Math.floor(Math.random() * this.m_SpawnPoints.length)]
  }
  getSizeX() {
    return this.m_iSizeX
  }
  getSizeY() {
    return this.m_iSizeY
  }
  getMaxDimension() {
    return Math.max(this.m_iSizeX, this.m_iSizeY)
  }
  getCellSpaceNeighborhoodRange() {
    return this.m_dCellSpaceNeighborhoodRange
  }
}