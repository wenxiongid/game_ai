import { TEAM_COLOR } from './soccer_team';
import Vector2D, {
	vec2DDistance
} from './common/2d/vector2d';
import gdi from './common/misc/cgdi';
import Regulator from './common/time/regulator';
import PRM from './params';

class SupportSpot{
	constructor(pos, value) {
		this.m_vPos = pos;
		this.m_dScore = value;
	}
}

class SupportSpotCalculator{
	constructor(numX, numY, team) {
		this.m_pTeam = team;
		this.m_Spots = [];
		this.m_pBestSupportingSpot = null;
		const playingField = team.pitch().playingArea();
		let heightOfSSRegion = playingField.height() * 0.8;
		let widthOfSSRegion = playingField.width() * 0.9;
		let sliceX = widthOfSSRegion / numX;
		let sliceY = heightOfSSRegion / numY;
		let left = playingField.left() + (playingField.width() - widthOfSSRegion) / 2 + sliceX / 2;
		let right = playingField.right() - (playingField.width() - widthOfSSRegion) / 2 - sliceX / 2;
		let top = playingField.top() + (playingField.height() - heightOfSSRegion) / 2 + sliceY / 2;
		for(let x = 0; x < numX / 2 - 1; x++){
			for(let y = 0; y < numY; y++){
				if(this.m_pTeam.teamColor == TEAM_COLOR.blue){
					this.m_Spots.push(new SupportSpot(new Vector2D(left + x * sliceX, top + y * sliceY), 0));
				}else{
					this.m_Spots.push(new SupportSpot(new Vector2D(right - x * sliceX, top + y * sliceY), 0));
				}
			}
		}
		this.m_pRegulator = new Regulator(PRM.SupportSpotUpdateFreq);
	}
	render(){
		gdi.greyPen();
		for(let spt = 0; spt < this.m_Spots.length; spt++){
			gdi.circle(this.m_Spots[spt].m_vPos, this.m_Spots[spt].m_dScore);
		}
		if(this.m_pBestSupportingSpot){
			gdi.redPen();
			gdi.circle(this.m_pBestSupportingSpot.m_vPos, this.m_pBestSupportingSpot.m_dScore);
		}
	}
	determineBestSupportingPosition(){
		if(!this.m_pRegulator.isReady() && this.m_pBestSupportingSpot){
			return this.m_pBestSupportingSpot.m_vPos;
		}
		this.m_pBestSupportingSpot = null;
		let bestScoreSoFar = 0;
		for(let i = 0; i < this.m_Spots.length; i++){
			let curSpot = this.m_Spots[i];
			curSpot.m_dScore = 1;
			if(this.m_pTeam.isPassSafeFromAllOpponents(this.m_pTeam.controllingPlayer().pos(), curSpot.m_vPos, null, PRM.MaxPassingForce)){
				curSpot.m_dScore += PRM.Spot_CanPassScore;
			}
			if(this.m_pTeam.canShoot(curSpot.m_vPos, PRM.MaxShootingForce)){
				curSpot.m_dScore += PRM.Spot_CanScoreFromPositionScore;
			}
			if(this.m_pTeam.supportingPlayer()){
				const optimalDistance = 200;
				let dist = vec2DDistance(this.m_pTeam.controllingPlayer().pos(), curSpot.m_vPos);
				let temp = Math.abs(optimalDistance - dist);
				if(temp < optimalDistance){
					curSpot.m_dScore += PRM.Spot_DistFromControllingPlayerScore * (optimalDistance - temp) / optimalDistance;
				}
			}
			if(curSpot.m_dScore > bestScoreSoFar){
				bestScoreSoFar = curSpot.m_dScore;
				this.m_pBestSupportingSpot = curSpot;
			}
		}
		return this.m_pBestSupportingSpot.m_vPos;
	};
	getBestSupportingSpot(){
		if(this.m_pBestSupportingSpot){
			return this.m_pBestSupportingSpot.m_vPos;
		}else{
			return this.determineBestSupportingPosition();
		}
	};
}

export default SupportSpotCalculator;