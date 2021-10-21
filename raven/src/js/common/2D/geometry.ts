import Vector2D, { vec2DDistance } from "./Vector2D";

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