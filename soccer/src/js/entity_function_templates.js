import {
	twoCirclesOverlapped,
	distToLineSegment
} from './common/2d/geometry';
import { vec2DDistanceSq } from './common/2d/vector2d';

const maxDouble = 999999;

function overlapped(ob, conOb, minDistBetweenObstacles = 40){
	for(let i = 0; i < conOb.length; i++){
		let it = conOb[i];
		if(twoCirclesOverlapped(ob.pos().x, ob.pos().y, ob.bRadius() + minDistBetweenObstacles, it.pos().x, it.pos().y, it.bRadius())){
			return true;
		}
	}
	return false;
}

function tagNeighbors(entity, containerOfEntities, radius){
	for(let i = 0; i < containerOfEntities.length; i++){
		let curEntity = containerOfEntities[i];
		curEntity.unTag();
		let to = curEntity.pos().add(entity.pos().getReverse());
		let range = radius + curEntity.bRadius();
		if(curEntity != entity && to.lengthSq() < range * range){
			curEntity.tag();
		}
	}
}

function enforceNonPenetrationConstraint(entity, containerOfEntities){
	for(let i = 0; i < containerOfEntities.length; i++){
		let curEntity = containerOfEntities[i];
		if(curEntity != entity){
			let toEntity = entity.pos().add(curEntity.pos().getReverse());
			let distFromEachOther = toEntity.length();
			let amountOfOverLap = curEntity.bRadius() + entity.bRadius() - distFromEachOther;
			if(amountOfOverLap >= 0){
				entity.setPos(entity.pos().add(toEntity.crossNum(1 / distFromEachOther * amountOfOverLap)));
			}
		}
	}
}

function getEntityLineSegmentIntersections(entities, theOneToIgnore, A, B, range = maxDouble){
	let hits = [];
	for(let i = 0; i < entities.length; i++){
		let it = entities[i];
		if(it.id() === theOneToIgnore || vec2DDistanceSq(it.pos(), A) > range * range){
			// do nothing
		}else{
			if(distToLineSegment(A, B, it.pos()) < it.bRadius()){
				hits.push(it);
			}
		}
	}
	return hits;
}

function getClosestEntityLineSegmentIntersection(entities, theOneToIgnore, A, B, range = MaxDouble){
	let closestEntity = null;
	let closestDist = maxDouble;
	for(let i = 0; i < entities.length; i++){
		let it = entities[i];
		let distSq = vec2DDistanceSq(it.pos(), A);
		if(it.id() === theOneToIgnore || distSq > range * range){
			// do nothing
		}else{
			if(distToLineSegment(A, B, it.pos()) < it.bRadius()){
				if(distSq < closestDist){
					closestDist = distSq;
					closestEntity = it;
				}
			}
		}
	}
	return closestEntity;
}

export {
	overlapped,
	tagNeighbors,
	enforceNonPenetrationConstraint,
	getEntityLineSegmentIntersections,
	getClosestEntityLineSegmentIntersection
};