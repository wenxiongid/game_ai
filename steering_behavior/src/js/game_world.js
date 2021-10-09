import gdi from './common/misc/cgdi';
import Vector2D from './common/2d/vector2d';
import {
	tagNeighbors,
	enforceNonPenetrationConstraint,
	overlapped
} from './entity_function_templates';
import CellSpacePartition from './common/misc/cell_space_partition';
import {
	randomClamped
} from './common/misc/utils';
import {
	pointInCircle
} from './common/2d/geometry';
import Path from './path';
import PRM from './params';
import Vehicle from './vehicle';
import Smoother from './common/misc/smoother';
import Wall2D from './common/2d/wall2d';
import Obstacle from './obstacle';
import RESOURCE from './resource';
import InvertedAABBox2D from './common/2d/invertedaabbox2d';

class GameWorld{
	constructor(cx, cy) {
		let border = 30;
		this.m_Vehicles = [];
		this.m_Obstacles = [];
		this.m_Walls = [];
		this.m_pCellSpace = new CellSpacePartition(cx, cy, PRM.NumCellsX, PRM.NumCellsY, PRM.NumAgents);
		this.m_pPath = new Path(5, border, border, cx - border, cy - border, true);
		this.m_bPaused = false;
		this.m_cxClient = cx;
		this.m_cyClient = cy;
		this.m_vCrosshair = new Vector2D(cx / 2, cx / 2);
		this.m_dAvFrameTime = 0;
		this.m_bShowWalls = true;
		this.m_bShowObstacles = true;
		this.m_bShowPath = false;
		this.m_bShowDetectionBox = false;
		this.m_bShowWanderCircle = false;
		this.m_bShowFeelers = false;
		this.m_bShowSteeringForce = false;
		this.m_bShowFPS = true;
		this.m_bRenderNeighbors = false;
		this.m_bViewKeys = true;
		this.m_bShowCellSpaceInfo = true;
		// for(let a = 0; a < 2; a++){
		// 	let spawnPos = new Vector2D(cx / 2 * (1 + randomClamped()), cy / 2 * (1 + randomClamped()));
		// 	let pVehicle = new Vehicle(this, spawnPos, Math.random() * 2 * Math.PI, new Vector2D(), PRM.VehicleMass, PRM.MaxSteeringForce, PRM.MaxSpeed, PRM.MaxTurnRatePerSecond, PRM.VehicleScale);
		// 	pVehicle.steering().wanderOn();
		// 	this.m_Vehicles.push(pVehicle);
		// 	this.m_pCellSpace.addEntity(pVehicle);
		// }
		// for(let i = 0; i < 2; i++){
		// 	let vehicle = this.m_Vehicles[i];
		// 	let targetVehicle = this.m_Vehicles[1 - i];
		// 	// vehicle.steering().evadeOn(targetVehicle);
		// 	vehicle.steering().pursuitOn(targetVehicle);
		// }

		for(let a = 0; a < PRM.NumAgents; a++){
			let spawnPos = new Vector2D(cx / 2 * (1 + randomClamped()), cy / 2 * (1 + randomClamped()));
			let pVehicle = new Vehicle(this, spawnPos, Math.random() * 2 * Math.PI, new Vector2D(), PRM.VehicleMass, PRM.MaxSteeringForce, PRM.MaxSpeed, PRM.MaxTurnRatePerSecond, PRM.VehicleScale);
			pVehicle.steering().flockingOn();
			// pVehicle.smoothingOn();
			this.m_Vehicles.push(pVehicle);
			this.m_pCellSpace.addEntity(pVehicle);
		}
		// SHOAL
		let vehicle0Index = -1;
		for(let i = 0; i < PRM.NumAgents; i++){
			let vehicle = this.m_Vehicles[i];
			if(vehicle.id() === 0){
				vehicle.steering().flockingOff();
				vehicle.setScale(10);
				vehicle.steering().wanderOn();
				vehicle.setMaxSpeed(70);
				vehicle0Index = i;
			}
		}
		for(let i = 0; i < PRM.NumAgents; i++){
			if(i != vehicle0Index){
				this.m_Vehicles[i].steering().evadeOn(this.m_Vehicles[vehicle0Index]);
			}
		}
		// 
	}
	createObstacles(){
		for(let o = 0; o < PRM.NumObstacles; o++){
			let bOverlapped = true;
			let numTrys = 0;
			let numAllowableTrys = 2000;
			while(bOverlapped){
				numTrys++;
				if(numTrys > numAllowableTrys){
					return;
				}
				let radius = PRM.MinObstacleRadius + Math.floor(Math.random() * (PRM.MaxObstacleRadius - PRM.MinObstacleRadius + 1));
				let border = 10;
				let minGapBetweenObstacles = 20;
				let ob = new Obstacle(
					radius + border + Math.floor(Math.random() * (this.m_cxClient - 2 * radius - 2 * border + 1)),
					radius + border + Math.floor(Math.random() * (this.m_cyClient - 2 * radius - 30 - 2 * border + 1)),
					radius
				);
				if(!overlapped(ob, this.m_Obstacles, minGapBetweenObstacles)){
					this.m_Obstacles.push(ob);
					bOverlapped = false;
				}else{
					ob = null;
				}
			}
		}
	}
	createWalls(){
		let borderSize = 20;
		let cornerSize = 0.2;
		let vDist = this.m_cyClient - 2 * borderSize;
		let hDist = this.m_cxClient - 2 * borderSize;
		let numWallVerts = 8;
		let walls = [
			new Vector2D(hDist * cornerSize + borderSize, borderSize),
			new Vector2D(this.m_cxClient - borderSize - hDist * cornerSize, borderSize),
			new Vector2D(this.m_cxClient - borderSize, borderSize + vDist * cornerSize),
			new Vector2D(this.m_cxClient - borderSize, this.m_cyClient - borderSize - vDist * cornerSize),
			new Vector2D(this.m_cxClient - borderSize - hDist * cornerSize, this.m_cyClient - borderSize),
			new Vector2D(borderSize + hDist * cornerSize, this.m_cyClient - borderSize),
			new Vector2D(borderSize, this.m_cyClient - borderSize - vDist * cornerSize),
			new Vector2D(borderSize, borderSize + vDist * cornerSize)
		];
		for(let w = 0; w < numWallVerts - 1; w++){
			this.m_Walls.push(new Wall2D(walls[w], walls[w + 1]));
		}
		this.m_Walls.push(new Wall2D(walls[numWallVerts - 1], walls[0]));
	}
	update(time_elapsed){
		if(this.m_bPaused){
			return;
		}
		const sampleRate = 10;
		let frameRateSmoother = new Smoother(sampleRate, 0);
		this.m_dAvFrameTime = frameRateSmoother.update(time_elapsed);
		for(let a = 0; a < this.m_Vehicles.length; a++){
			this.m_Vehicles[a].update(time_elapsed);
		}
	}
	render(){
		gdi.transparentText();
		gdi.blackPen();
		for(let w = 0; w < this.m_Walls.length; w++){
			this.m_Walls[w].render(true);
		}
		gdi.blackPen();
		for(let ob = 0; ob < this.m_Obstacles.length; ob++){
			gdi.circle(this.m_Obstacles[ob].pos(), this.m_Obstacles[ob].bRadius());
		}
		for(let a = 0; a < this.m_Vehicles.length; a++){
			this.m_Vehicles[a].render();
			if(this.m_bShowCellSpaceInfo && a == 0){
				gdi.hollowBrush();
				let box = new InvertedAABBox2D(this.m_Vehicles[a].pos().add((new Vector2D(PRM.ViewDistance, PRM.ViewDistance)).getReverse()), this.m_Vehicles[a].pos().add(new Vector2D(PRM.ViewDistance, PRM.ViewDistance)));
				box.render();
				gdi.redPen();
				this.cellSpace().calculateNeighbors(this.m_Vehicles[a].pos(), PRM.ViewDistance);
				for(let i = 0; i < this.cellSpace().neighbours().length; i++){
					let pV = this.cellSpace().neighbours()[i];
					gdi.circle(pV.pos(), pV.bRadius());
				}
				gdi.greenPen();
				gdi.circle(this.m_Vehicles[a].pos(), PRM.ViewDistance);
			}
		}
		gdi.textColor(gdi.GREY);
		if(this.renderPath()){
			gdi.textAtPos(this.cxClient() / 2 - 80, this.cyClient() - 20, "Press 'U' for random path");
			this.m_pPath.render();
		}
		if(this.renderFPS()){
			gdi.textColor(gdi.GREY);
			gdi.textAtPos(5, this.cyClient() - 20, (1 / this.m_dAvFrameTime).toFixed(2));
		}
		if(this.m_bShowCellSpaceInfo){
			this.m_pCellSpace.renderCells();
		}
	}
	nonPenetraitionContraint(v){
		enforceNonPenetrationConstraint(v, this.m_Vehicles);
	}
	tagVehiclesWithinViewRange(pVehicle, range){
		tagNeighbors(pVehicle, this.m_Vehicles, range);
	}
	tagObstaclesWithinViewRange(pVehicle, range){
		tagNeighbors(pVehicle, this.m_Obstacles, range);
	}
	walls(){
		return this.m_Walls;
	}
	cellSpace(){
		return this.m_pCellSpace;
	}
	obstacles(){
		return this.m_Obstacles;
	}
	agents(){
		return this.m_Vehicles;
	}
	handleKeyPresses(wParam){
		switch(wParam){
			case 'u':
				delete this.m_pPath;
				let border = 60;
				this.m_pPath = new Path(3 + Math.floor(Math.random() * 5), border, this.cxClient() - border, this.cyClient() - border, true);
				this.m_bShowPath = true;
				for(let i = 0; i < this.m_Vehicles.length; i++){
					this.m_Vehicles[i].steering().setPath(this.m_pPath.getPath());
					if(this.m_Vehicles[i].id() !== 0){
						this.m_Vehicles[i].steering().followPathOn();
					}
				}
				break;
			case 'p':
				this.togglePause();
				break;
			case 'o':
				this.toggleRenderNeighbors();
				break;
			case 'i':
				for(let i = 0; i < this.m_Vehicles.length; i++){
					this.m_Vehicles[i].toggleSmoothing();
				}
				break;
			case 'y':
				this.m_bShowObstacles = !this.m_bShowObstacles;
				if(!this.m_bShowObstacles){
					this.m_Obstacles = [];
					for(let i = 0; i < this.m_Vehicles.length; i++){
						this.m_Vehicles[i].steering().obstacleAvoidanceOff();
					}
				}else{
					this.createObstacles();
					for(let i = 0; i < this.m_Vehicles.length; i++){
						this.m_Vehicles[i].steering().obstacleAvoidanceOn();
					}
				}
				break;
			case 'w':
				this.m_bShowWalls = !this.m_bShowWalls;
				if(!this.m_bShowWalls){
					this.m_Walls = [];
					for(let i = 0; i < this.m_Vehicles.length; i++){
						this.m_Vehicles[i].steering().wallAvoidanceOff();
					}
				}else{
					this.createWalls();
					for(let i = 0; i < this.m_Vehicles.length; i++){
						this.m_Vehicles[i].steering().wallAvoidanceOn();
					}
				}
				break;
		}
	}
	handleMenuItems(wParam, hwnd){
	}
	togglePause(){
		this.m_bPaused = !this.m_bPaused;
	}
	paused(){
		return this.m_bPaused;
	}
	crosshair(){
		return this.m_vCrosshair;
	}
	setCrosshair(p){
		let proposedPosition = new Vector2D(p.x, p.y);
		for(i = 0; i < this.m_Obstacles.lenght; i++){
			let curOb = this.m_Obstacles[i];
			if(pointInCircle(curOb.pos(), curOb.bRadius(), proposedPosition)){
				return;
			}
		}
		this.m_vCrosshair.x = p.x;
		this.m_vCrosshair.y = p.y;
	}
	cxClient(){
		return this.m_cxClient;
	}
	cyClient(){
		return this.m_cyClient;
	}
	renderWalls(){
		return this.m_bShowWalls;
	}
	renderObstacles(){
		return this.m_bShowObstacles;
	}
	renderPath(){
		return this.m_bShowPath;
	}
	renderDetectionBox(){
		return this.m_bShowDetectionBox;
	}
	renderWanderCircle(){
		return this.m_bShowWanderCircle;
	}
	renderFeelers(){
		return this.m_bShowFeelers;
	}
	renderSteeringForce(){
		return this.m_bShowSteeringForce;
	}
	renderFPS(){
		return this.m_bShowFPS;
	}
	toggleShowFPS(){
		this.m_bShowFPS = !this.m_bShowFPS;
	}
	toggleRenderNeighbors(){
		this.m_bRenderNeighbors = !this.m_bRenderNeighbors;
	}
	renderNeighbors(){
		return this.m_bRenderNeighbors;
	}
	toggleViewKeys(){
		this.m_bViewKeys = !this.m_bViewKeys;
	}
	viewKeys(){
		return this.m_bViewKeys;
	}
	destroy(){
		for(let a = 0; a < this.m_Vehicles.length; a++){
			delete this.m_Vehicles[a];
		}
		for(let ob = 0; ob < this.m_Obstacles.length; ob++){
			delete this.m_Obstacles[ob];
		}
		delete this.m_pCellSpace;
		delete this.m_pPath;
	}
}

export default GameWorld;