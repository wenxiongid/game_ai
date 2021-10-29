import FuzzyTerm from "./FuzzyTerm";

export default class FuzzyRule {
  private m_pAntecedent: FuzzyTerm
  private m_pConsequence: FuzzyTerm
  constructor(ant: FuzzyTerm, con: FuzzyTerm) {
    this.m_pAntecedent = ant.clone()
    this.m_pConsequence = con.clone()
  }
  setConfidenceOfConsequentToZero() {
    this.m_pConsequence.clearDOM()
  }
  calculate() {
    this.m_pConsequence.orWidthDOM(this.m_pAntecedent.getDOM())
  }
}