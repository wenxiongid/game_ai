const MaxFloat = 999999;

function clamp(arg, minVal, maxVal){
	let ret = arg;
	if(ret < minVal){
		ret = minVal;
	}
	if(ret > maxVal){
		ret = maxVal;
	}
	return ret;
}

function randomClamped(){
	return Math.random() - Math.random();
}

function timeGetTime(){
	return (new Date()).getTime();
}

function randFloat(){
	return Math.random();
}

function isEqual(a, b){
	if(Math.abs(a - b) < 1e-12){
		return true;
	}
	return false;
}

function randInRange(x, y){
	return x + randFloat() * (y - x);
}

function randInt(x, y){
	if(y >= x){
		return Math.floor(Math.random() * (y - x + 1) + x);
	}
}

function randBool() {
	return Math.random() > 0.5
}

export {
	clamp,
	randomClamped,
	MaxFloat,
	timeGetTime,
	randFloat,
	isEqual,
	randInRange,
	randInt,
	randBool
}