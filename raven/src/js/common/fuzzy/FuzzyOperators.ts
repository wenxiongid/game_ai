import { MaxFloat } from "../misc/utils";
import FuzzyTerm from "./FuzzyTerm.d";

export class FzAND implements FuzzyTerm {
  private m_Terms: FuzzyTerm[]
  constructor(fa: FzAND | FuzzyTerm, ...args: FuzzyTerm[]) {
    this.m_Terms = []
    if(fa && 'm_Terms' in fa && args.length === 0) {
      for (const curTerm of fa.m_Terms) {
        this.m_Terms.push(curTerm.clone())
      }
    } else {
      if(fa && args.length) {
        this.m_Terms.push(fa.clone())
      }
      for (const op of args) {
        this.m_Terms.push(op.clone())
      }
    }
  }
  clone(): FuzzyTerm { return new FzAND(this) }
  getDOM() {
    let smallest = MaxFloat
    for (const curTerm of this.m_Terms) {
      if(curTerm.getDOM() < smallest) {
        smallest = curTerm.getDOM()
      }
    }
    return smallest
  }
  clearDOM() {
    for (const curTerm of this.m_Terms) {
      curTerm.clearDOM()
    }
  }
  orWidthDOM(val: number) {
    for (const curTerm of this.m_Terms) {
      curTerm.orWidthDOM(val)
    }
  }
}

export class FzOR implements FuzzyTerm {
  private m_Terms: FuzzyTerm[]
  constructor(fa: FzOR | FuzzyTerm, ...args: FuzzyTerm[]) {
    this.m_Terms = []
    if(fa && 'm_Terms' in fa && args.length === 0) {
      for (const curTerm of fa.m_Terms) {
        this.m_Terms.push(curTerm.clone())
      }
    } else {
      if(fa && args.length) {
        this.m_Terms.push(fa.clone())
      }
      for (const op of args) {
        this.m_Terms.push(op.clone())
      }
    }
  }
  clone(): FuzzyTerm { return new FzOR(this) }
  getDOM() {
    let largest = -MaxFloat
    for (const curTerm of this.m_Terms) {
      if(curTerm.getDOM() > largest) {
        largest = curTerm.getDOM()
      }
    }
    return largest
  }
  clearDOM() {}
  orWidthDOM(val: number) {}
}