// 操作符接口
export default interface FuzzyTerm {
  clone(): FuzzyTerm
  getDOM(): number
  clearDOM(): void
  orWidthDOM(val: number): void
}