import IVector2D from './index.d'

const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;

export default class Vector2D implements IVector2D{
  x: number
  y: number
	constructor(x: number, y: number) {
		this.x = x || 0;
		this.y = y || 0;
	}
	zero(){
		this.x = 0;
		this.y = 0;
	}
	isZero(){
		return this.x * this.x + this.y * this.y <= 0;
	}
	length(){
		return Math.sqrt(this.lengthSq());
	}
	lengthSq(){
		return Math.pow(this.x, 2) + Math.pow(this.y, 2);
	}
	normalize(){
		let length = this.length();
		this.x /= length;
		this.y /= length;
		return this;
	}
	add(vec: IVector2D){
		return new Vector2D(this.x + vec.x, this.y + vec.y);
	}
	crossNum(val: number){
		return new Vector2D(this.x * val, this.y * val);
	}
	dot(vec: IVector2D){
		return this.x * vec.x + this.y * vec.y;
	}
	sign(vec: IVector2D){
		// Y axis pointing down, x axis pointing right
		if(this.y * vec.x > this.x * vec.y){
			return ANTICLOCKWISE;
		}else{
			return CLOCKWISE;
		}
	}
	perp(){
		return new Vector2D(-this.y, this.x);
	}
	distance(vec: IVector2D){
		return Math.sqrt(this.distanceSq(vec));
	}
	distanceSq(vec: IVector2D){
		let xDiff = vec.x - this.x;
		let yDiff = vec.y - this.y;
		return xDiff * xDiff + yDiff * yDiff;
	}
	truncate(max: number){
		if(this.length() > max){
			this.normalize();
			this.x *= max;
			this.y *= max;
		}
	}
	getReverse(){
		return new Vector2D(-this.x, -this.y);
	}
	reflect(normVec: IVector2D){
		let diff = normVec.getReverse().crossNum(2 * this.dot(normVec));
		this.x += diff.x;
		this.y += diff.y;
	}
	clone(){
		return new Vector2D(this.x, this.y);
	}
}

export function vec2dNormalize(vec: IVector2D){
	let length = vec.length();
	return new Vector2D(vec.x / length, vec.y / length);
}

export function wrapAround(pos: IVector2D, maxX: number, maxY: number){
	if(pos.x > maxX){
		pos.x = 0;
	}
	if(pos.x < 0){
		pos.x = maxX;
	}
	if(pos.y > maxY){
		pos.y = 0;
	}
	if(pos.y < 0){
		pos.y = maxY;
	}
}

export function vec2DDistanceSq(v1: IVector2D, v2: IVector2D){
	let ySeparation = v2.y - v1.y;
	let xSeparation = v2.x - v1.x;
	return ySeparation * ySeparation + xSeparation * xSeparation;
}

export function vec2DDistance(v1: IVector2D, v2: IVector2D){
	return Math.sqrt(vec2DDistanceSq(v1, v2));
}

export function notInsideRegion(p: IVector2D, topLeft: IVector2D, bottomRight: IVector2D): boolean {
	return p.x < topLeft.x || p.x > bottomRight.x || p.y < topLeft.y || p.y > bottomRight.y
}

export function insideRegion(p: IVector2D, topLeft: IVector2D, bottomRight: IVector2D): boolean {
	return !notInsideRegion(p, topLeft, bottomRight)
}

export function isSecondInFOVOfFirst(posFirst: IVector2D, facingFirst: IVector2D, posSecond: IVector2D, fov: number): boolean {
	const toTarget: IVector2D = vec2dNormalize(new Vector2D(posSecond.x - posFirst.x, posSecond.y - posFirst.y))
	return facingFirst.dot(toTarget) >= Math.cos(fov / 2)
}