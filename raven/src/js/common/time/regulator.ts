import { isEqual, randInRange } from "../misc/utils"

const updatePeriodVariator = 10

export default class Regulator {
  m_dUpdatePeriod: number
  m_dwNextUpdateTime: number
  constructor(numUpdatesPerSecondRqd: number) {
    this.m_dwNextUpdateTime = (new Date()).getTime() + Math.random() * 1000
    if(numUpdatesPerSecondRqd > 0) {
      this.m_dUpdatePeriod = 1000 / numUpdatesPerSecondRqd
    } else if(isEqual(numUpdatesPerSecondRqd, 0)) {
      this.m_dUpdatePeriod = 0
    } else {
      this.m_dUpdatePeriod = -1
    }
  }
  isReady() {
    if(isEqual(this.m_dUpdatePeriod, 0)) return true
    if(this.m_dUpdatePeriod < 0) return false
    const currentTime = (new Date()).getTime()
    if(currentTime >= this.m_dwNextUpdateTime) {
      this.m_dwNextUpdateTime = currentTime + this.m_dUpdatePeriod + randInRange(-updatePeriodVariator, updatePeriodVariator)
      return true
    }
    return false
  }
}