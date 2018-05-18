import Region from './common/game/region';
import Goal from './goal';
import Vector2D from './common/2d/vector2d';
import PRM from './params';
import SoccerBall from './soccer_ball';

const NumRegionsHorizontal = 6;
const NumRegionsVertical = 3;

class SoccerPitch{
	constructor(cxClient, cyClient) {
		this.m_vecWalls = [];
		this.m_pPlayingArea = new Region(20, 20, cxClient - 20, cyClient - 20);
		this.m_Regions = [];
		this.m_bGoalKeeperHasBall = false;
		this.m_bGameOn = true;
		this.m_bPaused = false;
		this.m_cxClient = cxClient;
		this.m_cyClient = cyClient;
		this.createRegions(this.playingArea().width() / NumRegionsHorizontal, this.playingArea().height() / NumRegionsVertical);
		this.m_pRedGoal = new Goal(new Vector2D(this.m_pPlayingArea.left(), (cy - PRM.GoalWidth) / 2), new Vector2D(this.m_pPlayingArea.left(), (cy + PRM.GoalWidth) / 2), new Vector2D(1, 0));
		this.m_pBlueGoal = new Goal(new Vector2D(this.m_pPlayingArea.right(), (cy - PRM.GoalWidth) / 2), new Vector2D(this.m_pPlayingArea.right(), (cy + PRM.GoalWidth) / 2), new Vector2D(-1, 0));
		this.m_pBall = new SoccerBall(new Vector2D(this.m_cxClient / 2, this.m_cyClient / 2), PRM.BallSize, PRM.BallMass, this.m_vecWalls);
		this.m_pRedTeam = ;
		this.m_pBlueTeam = ;
	}
	createRegions(width, height){
		// 
	}
	update(){}
	render(){}
	togglePause(){
		this.m_bPaused = !this.m_bPaused;
	}
	paused(){
		return this.m_bPaused;
	}
	cxClient(){
		return this.m_cxClient;
	}
	cyClient(){
		return this.m_cyClient;
	}
	goalKeeperHasBall(){
		return this.m_bGoalKeeperHasBall;
	}
	setGoalKeeperHasBall(b){
		this.m_bGoalKeeperHasBall = b;
	}
	playingArea(){
		return this.m_pPlayingArea;
	}
	walls(){
		return this.m_vecWalls;
	}
	ball(){
		return this.m_pBall;
	}
	getRegionFromIndex(idx){
		if(idx >= 0 && idx < this.m_Regions.length){
			return this.m_Regions[idx];
		}
	}
	gameOn(){
		return this.m_bGameOn;
	}
	setGameOn(){
		this.m_bGameOn = true;
	}
	setGameOff(){
		this.m_bGameOn = false;
	}
}

export default SoccerPitch;