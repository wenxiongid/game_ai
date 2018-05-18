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

export {
	clamp,
	randomClamped
}