import { isEqual } from "../misc/utils";
import FuzzySet from "./FuzzySet";
import FuzzySet_LeftShoulder from "./FuzzySet_LeftShoulder";
import FuzzySet_RightShoulder from "./FuzzySet_RightShoulder";
import { FuzzySet_Singleton } from "./FuzzySet_Singleton";
import FuzzySet_Triangle from "./FuzzySet_Triangle";
import FzSet from "./FzSet";

type MemberSets = {
  [key: string]: FuzzySet
}

export default class FuzzyVariable {
  private m_MemberSets: MemberSets = {}
  private m_dMinRange: number
  private m_dMaxRange: number
  private adjustRangeToFit(min: number, max: number) {
    if(min < this.m_dMinRange) this.m_dMinRange = min
    if(max > this.m_dMaxRange) this.m_dMaxRange = max
  }
  constructor() {
    this.m_dMinRange = 0
    this.m_dMaxRange = 0
  }

  addLeftShoulderSet(
    name: string,
    minBound: number,
    peak: number,
    maxBound: number
  ):FzSet {
    this.m_MemberSets[name] = new FuzzySet_LeftShoulder(peak, peak - minBound, maxBound - peak)
    this.adjustRangeToFit(minBound, maxBound)
    return new FzSet(this.m_MemberSets[name])
  }

  addRightShoulderSet(
    name: string,
    minBound: number,
    peak: number,
    maxBound: number
  ):FzSet {
    this.m_MemberSets[name] = new FuzzySet_RightShoulder(peak, peak - minBound, maxBound - peak)
    this.adjustRangeToFit(minBound, maxBound)
    return new FzSet(this.m_MemberSets[name])
  }

  addTriangularSet(
    name: string,
    minBound: number,
    peak: number,
    maxBound: number
  ):FzSet {
    this.m_MemberSets[name] = new FuzzySet_Triangle(peak, peak - minBound, maxBound - peak)
    this.adjustRangeToFit(minBound, maxBound)
    return new FzSet(this.m_MemberSets[name])
  }

  addSingletonSet(
    name: string,
    minBound: number,
    peak: number,
    maxBound: number
  ):FzSet {
    this.m_MemberSets[name] = new FuzzySet_Singleton(peak, peak - minBound, maxBound - peak)
    this.adjustRangeToFit(minBound, maxBound)
    return new FzSet(this.m_MemberSets[name])
  }

  fuzzify(val: number) {
    if(val >= this.m_dMaxRange || val <= this.m_dMinRange) {
      console.error('<FuzzyVariable::Fuzzify> value out of range')
      return
    }
    for (const key in this.m_MemberSets) {
      if (Object.prototype.hasOwnProperty.call(this.m_MemberSets, key)) {
        const curSet = this.m_MemberSets[key]
        curSet.setDOM(curSet.calculateDOM(val))
      }
    }
  }
  deFuzzifyMaxAv(): number {
    let bottom = 0
    let top = 0
    for (const key in this.m_MemberSets) {
      if (Object.prototype.hasOwnProperty.call(this.m_MemberSets, key)) {
        const curSet = this.m_MemberSets[key];
        bottom += curSet.getDOM()
        top += curSet.getDOM() * curSet.getRepresentativeVal()
      }
    }
    if(isEqual(0, bottom)) return 0
    return top / bottom
  }
  deFuzzifyCentroid(numSamples: number) {
    const stepSize = (this.m_dMaxRange - this.m_dMinRange) / numSamples
    let totalArea = 0
    let sumOfMoments = 0

    for (let samp = 1; samp <= numSamples; samp++) {
      for (const key in this.m_MemberSets) {
        if (Object.prototype.hasOwnProperty.call(this.m_MemberSets, key)) {
          const curSet = this.m_MemberSets[key]
          const contribution = Math.min(
            curSet.calculateDOM(this.m_dMinRange + samp * stepSize),
            curSet.getDOM()
          )
          totalArea += contribution
          sumOfMoments += (this.m_dMinRange + samp * stepSize) * contribution
        }
      }
    }

    if(isEqual(0, totalArea)) return 0

    return sumOfMoments / totalArea
  }
}