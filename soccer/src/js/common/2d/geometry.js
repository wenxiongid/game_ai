import Vector2D, {
	vec2DDistance,
	vec2DDistanceSq,
	vec2dNormalize
} from './vector2d';
import {
	pointToLocalSpace
} from './transformations';

function isEqual(a, b){
	return Math.abs(a - b) < 1e-12;
}

function distanceToRayPlaneIntersection(rayOrigin, rayHeading, planePoint, planeNormal){
	let d = -planeNormal.dot(planePoint);
	let numer = planeNormal.dot(rayOrigin) + d;
	let denom = planeNormal.dot(rayHeading);
	if(denom < 0.000001 && denom > -0.000001){
		return -1;
	}
	return -(numer / denom);
}

function whereIsPoint(point, pointOnPlane, planeNormal){
	let dir = pointOnPlane.add(point.getReverse());
	let d = dir.dot(planeNormal);
	switch(true){
		case d < -0.000001:
			return 'PLANE_FRONT';
		case d > 0.000001:
			return 'PLANE_BACKSIDE';
		default:
			return 'ON_PLANE';
	}
}

function getRayCircleIntersect(rayOrigin, rayHeading, circleOrigin, radius){
	let toCircle = circleOrigin.add(rayOrigin.getReverse());
	let length = toCircle.length();
	let v = toCircle.dot(rayHeading);
	let d = radius * radius - (length * length - v * v);
	if(d < 0) return -1;
	return v - Math.sqrt(d);
}

function doRayCircleIntersect(rayOrigin, rayHeading, circleOrigin, radius){
	let toCircle = circleOrigin.add(rayOrigin.getReverse());
	let length = toCircle.length();
	let d = radius * radius - (length * length - v * v);
	return d < 0;
}

function getTangentPoints(circleOrigin, radius, point, T1, T2){
	let toCircle = circleOrigin.add(point.getReverse());
	let lengthSq = toCircle.lengthSq();
	let rSq = radius * radius;
	if(lengthSq <= rSq){
		return false;
	}
	let invLengthSq = 1 / lengthSq;
	let Root = Math.sqrt(Math.abs(lengthSq - rSq));
	T1.x = circleOrigin.x + radius * (radius * toCircle.x - toCircle.y * Root) * invLengthSq;
	T1.y = circleOrigin.y + radius * (radius * toCircle.y + toCircle.x * Root) * invLengthSq;
	T2.x = circleOrigin.x + radius * (radius * toCircle.x + toCircle.y * Root) * invLengthSq;
	T2.y = circleOrigin.y + radius * (radius * toCircle.y - toCircle.x * Root) * invLengthSq;
	return true;
}

function distToLineSegment(A, B, P){
	let dotA = (P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y);
	if(dotA <= 0){
		return vec2DDistance(A, P);
	}
	let dotB = (P.x - B.x) * (A.x - B.x) + (P.y - B.y) * (A.y - B.y);
	if(dotB <= 0){
		return vec2DDistance(B, P);
	}
	let point = A.add(B.add(A.getReverse()).crossNum(dotA / (dotA + dotB)));
	return vec2DDistance(P, point);
}

function distToLineSegmentSq(A, B, P){
	let dotA = (P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y);
	if(dotA <= 0){
		return vec2DDistanceSq(A, P);
	}
	let dotB = (P.x - B.x) * (A.x - B.x) + (P.y - B.y) * (A.y - B.y);
	if(dotB <= 0){
		return vec2DDistanceSq(B, P);
	}
	let point = A.add(B.add(A.getReverse()).crossNum(dotA / (dotA + dotB)));
	return vec2DDistanceSq(P, point);
}

function lineIntersection2D(A, B, C, D, dist, point){
	let ret = {
		result: false
	};
	if(typeof dist != 'undefined'){
		ret.dist = dist;
	}
	if(typeof point != 'undefined'){
		ret.point = point;
	}
	let rTop = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
	let sTop = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
	let Bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
	if(Bot == 0){
		if(typeof dist != 'undefined' && typeof point == 'undefined'){
			if(isEqual(rTop, 0) && isEqual(sTop, 0)){
				ret.result = true;
				return ret;
			}
		}
		ret.result = false;
		return ret;
	}
	let invBot = 1 / Bot;
	let r = rTop * invBot;
	let s = sTop * invBot;
	if(r > 0 && r < 1 && s > 0 && s < 1){
		if(typeof ret.dist != 'undefined'){
			ret.dist = vec2DDistance(A, B) * r;
		}
		if(typeof ret.point != 'undefined'){
			ret.point = A.add(B.add(A.getReverse()).crossNum(r));
		}
		ret.result = true;
		return ret;
	}else{
		if(typeof ret.dist != 'undefined'){
			ret.dist = 0;
		}
		ret.result = false;
		return ret;
	}
}

function objectIntersection2D(obj1, obj2){
	for(let r = 0; r < obj1.length - 1; r++){
		for(let t = 0; t < obj2.length - 1; t++){
			if(lineIntersection2D(obj2[t], obj2[t + 1], obj1[r], obj1[r + 1])){
				return true;
			}
		}
	}
	return false;
}

function segmentObjectIntersection2D(A, B, obj){
	for(let r = 0; r < obj.length - 1; r++){
		if(lineIntersection2D(A, B, obj[r], obj[r + 1])){
			return true;
		}
	}
	return false;
}

function twoCirclesOverlapped(x1, y1, r1, x2, y2, r2){
	let distBetweenCenters = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	if(distBetweenCenters < (r1 + r2) || distBetweenCenters < Math.abs(r1 - r2)){
		return true;
	}
	return false;
}

function twoCirclesEnclosed(x1, y1, r1, x2, y2, r2){
	let distBetweenCenters = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1- y2));
	if(distBetweenCenters < Math.abs(r1 - r2)){
		return true;
	}
	return false;
}

function twoCirclesIntersectionPoints(x1, y1, r1, x2, y2, r2, p3, p4){
	if(!twoCirclesOverlapped(x1, y1, r1, x2, y2, r2)){
		return false;
	}
	let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	let a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
	let b = (r2 * r2 - r1 * r1 + d * d) / (2 * d);

	let p2x, p2y;
	p2x = x1 + (x2 - x1) * a / d;
	p2y = y1 + (y2 - y1) * a / d;
	let h1 = Math.sqrt(r1 * r1 - a * a);
	p3.x = p2x + (y2 - y1) * h1 / d;
	p3.y = p2y + (x2 - x1) * h1 / d;
	p4.x = p2x - (y2 - y1) * h1 / d;
	p4.y = p2y - (x2 - x1) * h1 / d;
	return true;
}

function twoCirclesIntersectionArea(x1, y1, r1, x2, y2, r2){
	let i1 = new Vector2D();
	let i2 = new Vector2D();
	if(!twoCirclesIntersectionPoints(x1, y1, r1, x2, y2, r2, i1, i2)){
		return 0;
	}
	let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	let CBD = 2 * Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
	let CAD = 2 * Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
	let areaB = CBD * r2 * r2 / 2 + Math.sin(CBD) * r2 * r2 / 2;
	let areaA = CAD * r1 * r1 / 2 + Math.sin(CAD) * r1 * r1 / 2;
	return areaA + areaB;
}

function circleArea(radius){
	return Math.PI * radius * radius;
}

function pointInCircle(circleOrigin, radius, point){
	let distSq = circleOrigin.add(point.getReverse()).lengthSq();
	if(distSq < radius){
		return true;
	}
	return false;
}

function lineSegmentCircleIntersection(A, B, P, radius){
	let distToLineSq = distToLineSegmentSq(A, B, P);
	if(distToLineSq < radius * radius){
		return true;
	}
	return false;
}

function getLineSegmentCircleClosestIntersectionPoint(A, B, pos, radius, interSectionPoint){
	let toBNorm = vec2dNormalize(B.add(A.getReverse()));
	let localPos = pointToLocalSpace(pos, toBNorm, toBNorm.perp(), A);
	let ipFound = false;
	let tempPoint = new Vector2D();
	if(localPos.x + radius >= 0 && (localPos.x - radius) * (localPos.x - radius) <= vec2DDistanceSq(B, A)){
		if(Math.abs(localPos.y) < radius){
			let a = localPos.x;
			let b = localPos.y;
			let ip = a - Math.sqrt(radius * radius - b * b);
			if(ip <= 0){
				ip = a + Math.sqrt(radius * radius - b * b);
			}
			ipFound = true;
			tempPoint = A.add(toBNorm.crossNum(ip));
			interSectionPoint.x = tempPoint.x;
			interSectionPoint.y = tempPoint.y;
		}
	}
	return ipFound;
}

export {
	distanceToRayPlaneIntersection,
	whereIsPoint,
	getRayCircleIntersect,
	doRayCircleIntersect,
	getTangentPoints,
	distToLineSegment,
	distToLineSegmentSq,
	lineIntersection2D,
	objectIntersection2D,
	segmentObjectIntersection2D,
	twoCirclesOverlapped,
	twoCirclesEnclosed,
	twoCirclesIntersectionPoints,
	twoCirclesIntersectionArea,
	circleArea,
	pointInCircle,
	lineSegmentCircleIntersection,
	getLineSegmentCircleClosestIntersectionPoint
};