import FuzzyRule from "./FuzzyRule";
import FuzzyTerm from "./FuzzyTerm";
import FuzzyVariable from "./FuzzyVariable";

type VarMap = {
  [key: string]: FuzzyVariable
}

export enum DefuzzifyMethod {
  max_av,
  centroid
}

export const NumSamples = 15

export default class FuzzyModule {
  private m_Variables: VarMap
  private m_Rules: FuzzyRule[]
  private setConfidencesOfConsequentsToZero() {
    for (const curRule of this.m_Rules) {
      curRule.setConfidenceOfConsequentToZero()
    }
  }
  createFLV(varName: string): FuzzyVariable {
    this.m_Variables[varName] = new FuzzyVariable()
    return this.m_Variables[varName]
  }
  addRule(antecedent: FuzzyTerm, consequence: FuzzyTerm) {
    this.m_Rules.push(new FuzzyRule(antecedent, consequence))
  }
  fuzzify(nameOfFLV: string, val: number) {
    if(this.m_Variables[nameOfFLV]) {
      this.m_Variables[nameOfFLV].fuzzify(val)
    } else {
      console.error('<FuzzyModule::Fuzzify>: key not found')
    }
  }
  deFuzzify(key: string, method: DefuzzifyMethod = DefuzzifyMethod.max_av) {
    if(this.m_Variables[key]) {
      this.setConfidencesOfConsequentsToZero()
      for (const curRule of this.m_Rules) {
        curRule.calculate()
      }
      switch(method) {
        case DefuzzifyMethod.centroid:
          return this.m_Variables[key].deFuzzifyCentroid(NumSamples)
        case DefuzzifyMethod.max_av:
          return this.m_Variables[key].deFuzzifyMaxAv()
      }
    } else {
      console.error('<FuzzyModule::Fuzzify>: key not found')
    }
    return 0
  }
}