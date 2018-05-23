import Region from './common/game/region';
import Goal from './goal';
import Vector2D from './common/2d/vector2d';
import PRM from './params';
import SoccerBall from './soccer_ball';
import SoccerTeam, {
	TEAM_COLOR
} from './soccer_team';
import Wall2D from './common/2d/wall2d';
import {
	Attacking,
	Defending,
	PrepareForKickOff
} from './team_state';
import gdi from './common/misc/cgdi';

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
		this.m_pRedGoal = new Goal(new Vector2D(this.m_pPlayingArea.left(), (cyClient - PRM.GoalWidth) / 2), new Vector2D(this.m_pPlayingArea.left(), (cyClient + PRM.GoalWidth) / 2), new Vector2D(1, 0));
		this.m_pBlueGoal = new Goal(new Vector2D(this.m_pPlayingArea.right(), (cyClient - PRM.GoalWidth) / 2), new Vector2D(this.m_pPlayingArea.right(), (cyClient + PRM.GoalWidth) / 2), new Vector2D(-1, 0));
		let topLeft = new Vector2D(this.m_pPlayingArea.left(), this.m_pPlayingArea.top());
		let topRight = new Vector2D(this.m_pPlayingArea.right(), this.m_pPlayingArea.top());
		let bottomRight = new Vector2D(this.m_pPlayingArea.right(), this.m_pPlayingArea.bottom());
		let bottomLeft = new Vector2D(this.m_pPlayingArea.left(), this.m_pPlayingArea.bottom());
		this.m_vecWalls.push(new Wall2D(bottomLeft, this.m_pRedGoal.rightPost()));
		this.m_vecWalls.push(new Wall2D(this.m_pRedGoal.leftPost(), topLeft));
		this.m_vecWalls.push(new Wall2D(topLeft, topRight));
		this.m_vecWalls.push(new Wall2D(topRight, this.m_pBlueGoal.leftPost()));
		this.m_vecWalls.push(new Wall2D(this.m_pBlueGoal.rightPost(), bottomRight));
		this.m_vecWalls.push(new Wall2D(bottomRight, bottomLeft));
		this.m_pBall = new SoccerBall(new Vector2D(this.m_cxClient / 2, this.m_cyClient / 2), PRM.BallSize, PRM.BallMass, this.m_vecWalls);
		this.m_pRedTeam = new SoccerTeam(this.m_pRedGoal, this.m_pBlueGoal, this, TEAM_COLOR.red);
		this.m_pBlueTeam = new SoccerTeam(this.m_pBlueGoal, this.m_pRedGoal, this, TEAM_COLOR.blue);
		this.m_pRedTeam.setOpponents(this.m_pBlueTeam);
		this.m_pBlueTeam.setOpponents(this.m_pRedTeam);
	}
	createRegions(width, height){
		let idx = NumRegionsHorizontal * NumRegionsVertical - 1;
		for(let col = 0; col < NumRegionsHorizontal; col++){
			for(let row = 0; row < NumRegionsVertical; row++){
				this.m_Regions[idx--] = new Region(this.playingArea().left() + col * width,
					this.playingArea().top() + row * height,
					this.playingArea().left() + (col + 1) * width,
					this.playingArea().top() + (row + 1) * height,
					idx
				);
			}
		}
	}
	update(timeElapsed){
		if(this.m_bPaused){
			return;
		}
		let tick = 0;
		this.m_pBall.update(timeElapsed);
		this.m_pRedTeam.update(timeElapsed);
		this.m_pBlueTeam.update(timeElapsed);
		if(this.m_pBlueGoal.scored(this.m_pBall) || this.m_pRedGoal.scored(this.m_pBall)){
			this.m_bGameOn = false;
			this.m_pBall.placeAtPosition(new Vector2D(this.m_cxClient / 2, this.m_cyClient / 2));
			this.m_pRedTeam.getFSM().changeState(PrepareForKickOff);
			this.m_pBlueTeam.getFSM().changeState(PrepareForKickOff);
		}
	}
	render(){
		gdi.darkGreenPen();
		gdi.darkGreenBrush();
		gdi.rect(0, 0, this.m_cxClient, this.m_cyClient);
		if(PRM.ViewRegions){
			for(let r = 0; r < this.m_Regions.length; r++){
				this.m_Regions[r].render(true);
			}
		}
		gdi.hollowBrush();
		//red goal
		gdi.redPen();
		gdi.rect(this.m_pPlayingArea.left(), (this.m_cyClient - PRM.GoalWidth) / 2, this.m_pPlayingArea.left() + 40, this.m_cyClient - (this.m_cyClient - PRM.GoalWidth) / 2);
		// blue goal
		gdi.bluePen();
		gdi.rect(this.m_pPlayingArea.right(), (this.m_cyClient - PRM.GoalWidth) / 2, this.m_pPlayingArea.right() - 40, this.m_cyClient - (this.m_cyClient - PRM.GoalWidth) / 2);
		// pitch marking
		gdi.whitePen();
		gdi.circle(this.m_pPlayingArea.center(), this.m_pPlayingArea.width() * 0.125);
		gdi.line(new Vector2D(this.m_pPlayingArea.center().x, this.m_pPlayingArea.top()), new Vector2D(this.m_pPlayingArea.center().x, this.m_pPlayingArea.bottom()));
		gdi.circle(this.m_pPlayingArea.center(), 2);
		// ball
		gdi.whitePen();
		gdi.whiteBrush();
		this.m_pBall.render();
		// team
		this.m_pRedTeam.render();
		this.m_pBlueTeam.render();
		// walls
		gdi.whitePen();
		for(let w = 0; w < this.m_vecWalls.length; w++){
			this.m_vecWalls[w].render();
		}
		gdi.textColor(gdi.RED);
		gdi.textAtPos((this.m_cxClient / 2) - 50, this.m_cyClient - 18, `Red: ${this.m_pBlueGoal.numGoalsScored()}`);
		gdi.textColor(gdi.BLUE);
		gdi.textAtPos((this.m_cxClient / 2) + 10, this.m_cyClient - 18, `Blue: ${this.m_pRedGoal.numGoalsScored()}`);
		return true;
	}
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