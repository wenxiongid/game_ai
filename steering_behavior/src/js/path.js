import gdi from './common/misc/cgdi';
import Vector2D from './common/2d/vector2d';
import {
	vec2dRotateAroundOrigin
} from './common/2d/transformations';

class Path{
	constructor(numWaypoints, minX, minY, maxX, maxY, looped) {
		this.m_WayPoints = [];
		this.curWaypoint = this.m_WayPoints[0];
		this.m_bLooped = looped || false;
		this.createRandomPath(numWaypoints, minX, minY, maxX, maxY);
	}
	currentWaypoint(){
		return this.curWaypoint;
	}
	finished(){
		return !(this.curWaypoint != this.m_WayPoints[this.m_WayPoints.length - 1]);
	}
	setNextWaypoint(){
		if(this.m_WayPoints.length > 0){
			let curIndex = -1;
			for(let i = 0; i < this.m_WayPoints.length; i++){
				if(this.m_WayPoints[i] == this.curWaypoint){
					curIndex = i;
				}
			}
			if(curIndex >= 0){
				if(curIndex == this.m_WayPoints.length - 1){
					curIndex = 0;
				}else{
					++curIndex;
				}
				this.curWaypoint = this.m_WayPoints[curIndex];
			}
		}
	}
	createRandomPath(numWaypoints, minX, minY, maxX, maxY){
		this.m_WayPoints = [];
		let midX = (maxX + minX) / 2;
		let midY = (maxY + minY) / 2;
		let smaller = Math.min(midX, midY);
		let spacing = 2 * Math.PI / numWaypoints;
		for(let i = 0; i < numWaypoints; ++i){
			let radialDist = (0.2 + Math.random() * 0.8) * smaller;
			let temp = new Vector2D(radialDist, 0);
			vec2dRotateAroundOrigin(temp, i * spacing);
			temp.x += midX;
			temp.y += midY;
			this.m_WayPoints.push(temp);
		}
		this.curWaypoint = this.m_WayPoints[0];
		return this.m_WayPoints;
	}
	loopOn(){
		this.m_bLooped = true;
	}
	loopOff(){
		this.m_bLooped = false;
	}
	addWayPoint(newPoint){
		// 
	}
	set(path){
		if(path instanceof Path){
			this.m_WayPoints = path.getPath();
			this.curWaypoint = this.m_WayPoints[0];
		}
		if(path instanceof Array){
			this.m_WayPoints = path;
			this.curWaypoint = this.m_WayPoints[0];
		}
	}
	clear(){
		this.m_WayPoints = [];
	}
	getPath(){
		return this.m_WayPoints;
	}
	render(){
		gdi.orangePen();
		for(let i = 0; i < this.m_WayPoints.length; i++){
			let it = this.m_WayPoints[i];
			let wp;
			if(i != this.m_WayPoints.length - 1){
				wp = this.m_WayPoints[i + 1];
			}else{
				if(this.m_bLooped){
					wp = this.m_WayPoints[0];
				}
			}
			if(wp){
				gdi.line(wp, it);
			}
		}
	}
}

export {
	Path as default
};