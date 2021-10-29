import FuzzySet from "./FuzzySet";

export class FuzzySet_Singleton extends FuzzySet {
  private m_MidPoint: number
  private m_dLeftOffset: number
  private m_dRightOffset: number
  constructor(mid: number, lft: number, rgt: number) {
    super(mid)
    this.m_MidPoint = mid
    this.m_dLeftOffset = lft
    this.m_dRightOffset = rgt
  }
  calculateDOM(val: number) {
    if(
      val >= this.m_MidPoint - this.m_dLeftOffset &&
      val <= this.m_MidPoint + this.m_dRightOffset
    ) {
      return 1
    } else {
      return 0
    }
  }
}