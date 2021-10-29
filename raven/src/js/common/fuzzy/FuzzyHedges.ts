import FuzzySet from "./FuzzySet";
import FuzzyTerm from "./FuzzyTerm";
import FzSet from "./FzSet";

export class FzVery extends FzSet implements FuzzyTerm {
  m_Set: FuzzySet
  constructor(ft: FzSet) {
    super(ft.m_Set)
  }
  clone(): FuzzyTerm { return new FzVery(this) }
  getDOM() { return this.m_Set.getDOM() * this.m_Set.getDOM() }
  orWidthDOM(val: number) { this.m_Set.orWithDOM(val * val) }
}

export class FzFairly extends FzSet implements FuzzyTerm {
  m_Set: FuzzySet
  constructor(ft: FzSet) {
    super(ft.m_Set)
  }
  clone(): FuzzyTerm { return new FzFairly(this) }
  getDOM() { return Math.sqrt(this.m_Set.getDOM()) }
  orWidthDOM(val: number) { this.m_Set.orWithDOM(Math.sqrt(val)) }
}