import FuzzySet from "./FuzzySet"
import FuzzyTerm from "./FuzzyTerm.d"

export default class FzSet implements FuzzyTerm {
  m_Set: FuzzySet
  constructor(fs: FuzzySet) {
    this.m_Set = fs
  }
  clone(): FuzzyTerm { return new FzSet(this.m_Set) }
  getDOM() { return this.m_Set.getDOM() }
  clearDOM() { this.m_Set.clearDOM() }
  orWidthDOM(val: number) { this.m_Set.orWithDOM(val) }
}