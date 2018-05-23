import { TEAM_COLOR } from './soccer_team';

function changePlayerHomeRegions(team, newRegions){
	for(let player = 0; player < newRegions.length; player++){
		team.setPlayerHomeRegion(player, newRegions[player]);
	}
}

const Attacking = {
	enter: function(team){
		const BlueRegions = [1, 12, 14, 6, 4];
		const RedRegions = [16, 3, 5, 9, 13];
		if(team.teamColor() == TEAM_COLOR.blue){
			changePlayerHomeRegions(team, BlueRegions);
		}else{
			changePlayerHomeRegions(team, RedRegions);
		}
		team.updateTargetsOfWaitingPlayers();
	},
	execute: function(team){
		if(!team.inControl()){
			team.getFSM().changeState(Defending);
			return;
		}
		team.determineBestSupportingPosition();
	},
	exit: function(team){
		team.setSupportingPlayer(null);
	},
	onMessage: function(team, telegram){
		return false;
	}
};

const Defending = {
	enter: function(team){
		const BlueRegions = [1, 6, 8, 3, 5];
		const RedRegions = [16, 9, 11, 12, 14];
		if(team.teamColor() == TEAM_COLOR.blue){
			changePlayerHomeRegions(team, BlueRegions);
		}else{
			changePlayerHomeRegions(team, RedRegions);
		}
		team.updateTargetsOfWaitingPlayers();
	},
	execute: function(team){
		if(team.inControl()){
			team.getFSM().changeState(Attacking);
		}
	},
	exit: function(team){},
	onMessage: function(team, telegram){
		return false;
	}
};

const PrepareForKickOff = {
	enter: function(team){
		team.setControllingPlayer(null);
		team.setSupportingPlayer(null);
		team.setReceiver(null);
		team.setPlayerClosestToBall(null);
		team.returnAllFieldPlayersToHome();
	},
	execute: function(team){
		if(team.allPlayersAtHome() && team.opponents().allPlayersAtHome()){
			team.getFSM().changeState(Defending);
		}
	},
	exit: function(team){
		team.pitch().setGameOn();
	},
	onMessage: function(team, telegram){
		return false;
	}
};

export {
	Attacking,
	Defending,
	PrepareForKickOff
};