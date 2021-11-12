import { MaxFloat } from "../misc/utils";
import { lineIntersection2D, lineSegmentCircleIntersection } from "./geometry";
import Vector2D, { vec2dNormalize } from "./Vector2D";
import Wall2D from "./Wall2D";

// 线段是否与其中一墙相交
export function doWallsObstructLineSegment(from: Vector2D, to: Vector2D, walls: Wall2D[]) {
  for (const wall of walls) {
    const { result } = lineIntersection2D(from, to, wall.from(), wall.to())
    if(result) {
      return true
    }
  }
  return false
}

export function doWallsObstructCylinderSides(A: Vector2D, B: Vector2D, boundingRadius: number, walls: Wall2D[]) {
  const toB = vec2dNormalize(B.add(A.getReverse()))
  let A1: Vector2D, B1: Vector2D, A2: Vector2D, B2: Vector2D
  const raialEdge = toB.perp().crossNum(boundingRadius)
  A1 = A.add(raialEdge)
  B1 = B.add(raialEdge)
  A2 = A.add(raialEdge.getReverse())
  B2 = B.add(raialEdge.getReverse())
  if(!doWallsObstructLineSegment(A1, B1, walls)) {
    return doWallsObstructLineSegment(A2, B2, walls)
  }
  return true
}

export function findClosestPointOfIntersectionWithWalls(
  A: Vector2D,
  B: Vector2D,
  walls: Wall2D[]
): {
  result: boolean,
  distance?: number,
  ip?: Vector2D
} {
  let retResult = false
  let distance = MaxFloat
  let ip: Vector2D
  for (const wall of walls) {
    const {result, dist, point} = lineIntersection2D(A, B, wall.from(), wall.to())
    if(result) {
      if(dist < distance) {
        retResult = true
        distance = dist
        ip = point
      }
    }
  }
  return {
    result: retResult,
    distance,
    ip
  }
}

export function doWallsIntersectCircle(walls: Wall2D[], p: Vector2D, r: number) {
  for (const wall of walls) {
    if(lineSegmentCircleIntersection(wall.from(), wall.to(), p, r)) {
      return true
    }
  }
  return false
}