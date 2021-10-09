import C2DMatrix from './c2dmatrix';

function pointToWorldSpace(point, agentHeading, agentSide, agentPosition){
	let transPoint = point.clone();
	let matTrandform = new C2DMatrix();
	matTrandform.rotate(agentHeading, agentSide);
	matTrandform.translate(agentPosition.x, agentPosition.y);
	matTrandform.transformVector2D(transPoint);
	return transPoint;
}

function vectorToWorldSpace(vec, agentHeading, agentSide){
	let transVec = vec.clone();
	let matTrandform = new C2DMatrix();
	matTrandform.rotate(agentHeading, agentSide);
	matTrandform.transformVector2D(transVec);
	return transVec;
}

function pointToLocalSpace(point, agentHeading, agentSide, agentPosition){
	let transPoint = point.clone();
	let matTrandform = new C2DMatrix();
	let tx = agentPosition.getReverse().dot(agentHeading);
	let ty = agentPosition.getReverse().dot(agentSide);
	matTrandform._11 = agentHeading.x; matTrandform._12 = agentSide.x;
	matTrandform._21 = agentHeading.y; matTrandform._22 = agentSide.y;
	matTrandform._31 = tx; matTrandform._32 = ty;
	matTrandform.transformVector2D(transPoint);
	return transPoint;
}

function vec2dRotateAroundOrigin(v, ang){
	let mat = new C2DMatrix();
	mat.rotate(ang);
	mat.transformVector2D(v);
}

function worldTransform(points, pos, forward, side){
	let transVector2Ds = [];
	for(let i = 0; i < points.length; i++){
		transVector2Ds[i] = points[i].clone();
	}
	let matTransform = new C2DMatrix();
	matTransform.rotate(forward, side);
	matTransform.translate(pos.x, pos.y);
	matTransform.transformVector2Ds(transVector2Ds);
	return transVector2Ds;
}

export {
	pointToWorldSpace,
	vectorToWorldSpace,
	pointToLocalSpace,
	vec2dRotateAroundOrigin,
	worldTransform
};