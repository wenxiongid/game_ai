export default class FuzzySet {
  protected m_dDOM: number
  protected m_dRepresentativeValue: number
  constructor(repVal: number) {
    this.m_dDOM = 0
    this.m_dRepresentativeValue = repVal
  }
  calculateDOM(val: number): number { return 0 }
  orWithDOM(val: number) {
    if(val > this.m_dDOM) this.m_dDOM = val
  }
  getRepresentativeVal() { return this.m_dRepresentativeValue }
  clearDOM() { this.m_dDOM = 0 }
  getDOM() { return this.m_dDOM }
  setDOM(val: number) {
    if(val <= 1 && val >= 0) {
      this.m_dDOM = val
    } else {
      console.error('[FuzzySet::setDOM] invalid value')
    }
  }
}