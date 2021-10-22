export interface IPoint {
  x: number
  y: number
}

export default interface IVector2D {
  x: number
  y: number
  zero(): void
  isZero(): boolean
  length(): number
  lengthSq(): number
  normalize(): IVector2D
  add(vec: IVector2D): IVector2D
  crossNum(val: number): IVector2D
  dot(vec: IVector2D): number
  sign(vec: IVector2D): -1 | 1
  perp(): IVector2D
  distance(vec: IVector2D): number
  distanceSq(vec: IVector2D): number
  truncate(max: number): void
  getReverse(): IVector2D
  reflect(normVec: IVector2D): void
  clone(): IVector2D
}