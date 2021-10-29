import { isEqual } from "../misc/utils";
import FuzzySet from "./FuzzySet";

export default class FuzzySet_LeftShoulder extends FuzzySet {
  private m_dPeakPoint: number
  private m_dRightOffset: number
  private m_dLeftOffset: number
  constructor(peak: number, leftOffset: number, rightOffset: number) {
    super(peak - leftOffset / 2)
    this.m_dPeakPoint = peak
    this.m_dLeftOffset = leftOffset
    this.m_dRightOffset = rightOffset
  }
  calculateDOM(val: number) {
    if(
      (isEqual(this.m_dRightOffset, 0) && isEqual(this.m_dPeakPoint, val)) ||
      (isEqual(this.m_dLeftOffset, 0) && isEqual(this.m_dPeakPoint, val))
    ) {
      return 1
    }
    if(val >= this.m_dPeakPoint && val < this.m_dPeakPoint + this.m_dRightOffset) {
      const grad = 1 / -this.m_dRightOffset
      return grad * (val - this.m_dPeakPoint) + 1
    } else if(val < this.m_dPeakPoint && val >= this.m_dPeakPoint - this.m_dLeftOffset) {
      return 1
    } else {
      return 0
    }
  }
}