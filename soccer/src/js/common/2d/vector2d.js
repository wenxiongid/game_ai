const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;

class Vector2D{
	constructor(x, y) {
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
	}
	add(vec){
		return new Vector2D(this.x + vec.x, this.y + vec.y);
	}
	crossNum(val){
		return new Vector2D(this.x * val, this.y * val);
	}
	dot(vec){
		return this.x * vec.x + this.y * vec.y;
	}
	sign(vec){
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
	distance(vec){
		return Math.sqrt(this.distanceSq(vec));
	}
	distanceSq(vec){
		let xDiff = vec.x - this.x;
		let yDiff = vec.y - this.y;
		return xDiff * xDiff + yDiff * yDiff;
	}
	truncate(max){
		if(this.length() > max){
			this.normalize();
			this.x *= max;
			this.y *= max;
		}
	}
	getReverse(){
		return new Vector2D(-this.x, -this.y);
	}
	reflect(normVec){
		let diff = 2 * this.dot(normVec) * normVec.getReverse();
		this.x += diff;
		this.y += diff;
	}
	clone(){
		return new Vector2D(this.x, this.y);
	}
}

function vec2dNormalize(vec){
	let length = vec.length();
	return new Vector2D(vec.x / length, vec.y / length);
}

function wrapAround(pos, maxX, maxY){
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

function vec2DDistanceSq(v1, v2){
	let ySeparation = v2.y - v1.y;
	let xSeparation = v2.x - v1.x;
	return ySeparation * ySeparation + xSeparation * xSeparation;
}

function vec2DDistance(v1, v2){
	return Math.sqrt(vec2DDistanceSq(v1, v2));
}

export {
	Vector2D as default,
	vec2dNormalize,
	wrapAround,
	vec2DDistanceSq,
	vec2DDistance
};