import { pointToLocalSpace } from "./transformation";
import Vector2D, { vec2DDistance, vec2DDistanceSq, vec2dNormalize } from "./Vector2D";

export function lineIntersection2D(
  a: Vector2D,
  b: Vector2D,
  c: Vector2D,
  d: Vector2D,
): {
  result: boolean,
  dist: number,
  point: Vector2D
} {
  const ret: {
    result: boolean,
    dist: number,
    point: Vector2D
  } = {
    result: false,
    dist: 0,
    point: new Vector2D(0, 0)
  }
  // ab-> => y = (b.y - a.y)/(b.x - a.x) X + (a.x * b.y - a.y * b.x)/(b.x - a.x) 
  // cd-> = y = (d.y - c.y)/(d.x - c.x) X + (c.x * d.y - c.y * d.x)/(d.x - c.x)
  // ab-> = cd-> 求交点
  let rTop = (a.y - c.y) * (d.x - c.x) - (a.x - c.x) * (d.y - c.y);
	let sTop = (a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y);

  const bot = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x)
  if(bot === 0) {// 平行
    ret.result = false
    return ret
  } else {
    const r = rTop / bot
    const s = sTop / bot
    if(r > 0 && r < 1 && s > 0 && s < 1) {
      ret.dist = vec2DDistance(a, b) * r
      ret.point = a.add(b.add(a.getReverse()).crossNum(r))
      ret.result = true
      return ret
    } else {
      ret.dist = 0
      ret.result = false
      return ret
    }
  }
}

export function distToLineSegment(A: Vector2D, B: Vector2D, P: Vector2D): number {
  // AP-> dot AB->
  const dotA = (P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y)
  if(dotA <= 0) return vec2DDistance(A, P)

  // BP-> dot BA->
  const dotB = (P.x - B.x) * (A.x - B.x) + (P.y - B.y) * (A.y - B.y)
  if(dotB <= 0) return vec2DDistance(B, P)

  const point = A.add(B.add(A.getReverse()).crossNum(dotA / (dotA + dotB)))
  return vec2DDistance(point, P)
}

export function lineSegmentCircleIntersection(
  A: Vector2D,
  B: Vector2D,
  P: Vector2D,
  radius: number
) {
  const distToLine = distToLineSegment(A, B, P)
  if(distToLine < radius) {
    return true
  }
  return false
}

export function getLineSegmentCircleClosestIntersectionPoint(
  A: Vector2D,
  B: Vector2D,
  pos: Vector2D,
  radius: number,
) {
  const toBNorm = vec2dNormalize(B.add(A.getReverse()))
  const localPos = pointToLocalSpace(pos, toBNorm, toBNorm.perp(), A)
  let ipFound = false
  let intersectionPoint: Vector2D
  // x轴 AB->
  // y轴 AB法线方向
  if(
    (localPos.x + radius >= 0) &&
    (localPos.x - radius) * (localPos.x - radius) <= vec2DDistanceSq(B, A)
  ) {
    if(Math.abs(localPos.y) < radius) {
      const a = localPos.x
      const b = localPos.y
      const diffX = Math.sqrt(radius * radius + b * b)
      let ip = a - diffX
      if(ip <= 0) {
        ip = a + diffX
      }
      ipFound = true
      intersectionPoint = A.add(toBNorm.crossNum(ip))
    }
  }
  return {
    result: ipFound,
    intersectionPoint
  }
}