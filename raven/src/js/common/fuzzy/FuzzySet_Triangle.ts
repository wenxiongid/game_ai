import { isEqual } from "../misc/utils"
import FuzzySet from "./FuzzySet"

export default class FuzzySet_Triangle extends FuzzySet {
  private m_dPeakPoint: number
  private m_dLeftOffset: number
  private m_dRightOffset: number
  constructor(mid: number, lft: number, rgt: number) {
    super(mid)
    this.m_dPeakPoint = mid
    this.m_dLeftOffset = lft
    this.m_dRightOffset = rgt
  }
  calculateDOM(val: number) {
    if(
      (isEqual(this.m_dRightOffset, 0) && isEqual(this.m_dPeakPoint, val)) ||
      (isEqual(this.m_dLeftOffset, 0) && isEqual(this.m_dPeakPoint, val))
    ) {
      return 1
    }

    if(val <= this.m_dPeakPoint && val >= (this.m_dPeakPoint - this.m_dLeftOffset)) {
      const grad = 1 / this.m_dLeftOffset
      const ret = grad * (val - (this.m_dPeakPoint - this.m_dLeftOffset))
      if(ret > 1) {
        console.log('<Triangle>', ret)
      }
      return ret
    } else if(val > this.m_dPeakPoint && (val < this.m_dPeakPoint + this.m_dRightOffset)) {
      const grad = 1 / -this.m_dRightOffset
      const ret = grad * (val - this.m_dPeakPoint) + 1
      if(ret > 1) {
        console.log('<Triangle>', ret)
      }
      return ret
    } else {
      return 0
    }
  }
}