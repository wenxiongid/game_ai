import PRM from './params';
import MessageType from './soccer_messages';

const GlobalPlayerState = {
	enter: function(player){},
	execute: function(player){
		if(player.ballWithReceivingRange() && player.isControllingPlayer()){
			player.setMaxSpeed(PRM.PlayerMaxSpeedWithBall);
		}else{
			player.setMaxSpeed(PRM.PlayerMaxSpeedWithoutBall);
		}
	},
	exit: function(player){},
	onMessage: function(player, telegram){
		switch(telegram.msg){
			case MessageType.Msg_ReceiveBall:
				player.steering().setTarget(telegram.extraInfo);
				player.getFSM().changeState(ReceiveBall);
				return true;
				break;
			case MessageType.Msg_SupportAttacker:
				break;
			case MessageType.Msg_Wait:
				break;
			case MessageType.Msg_GoHome:
				break;
			case MessageType.Msg_PassToMe:
				break;
		}
	}
};

const ChaseBall = {
	enter: function(player){},
	execute: function(player){},
	exit: function(player){},
	onMessage: function(player, telegram){
		return false;
	}
};

const Dribble = {
	enter: function(player){},
	execute: function(player){},
	exit: function(player){},
	onMessage: function(player, telegram){
		return false;
	}
};

const ReturnToHomeRegion = {
	enter: function(player){},
	execute: function(player){},
	exit: function(player){},
	onMessage: function(player, telegram){
		return false;
	}
};

const Wait = {
	enter: function(player){},
	execute: function(player){},
	exit: function(player){},
	onMessage: function(player, telegram){
		return false;
	}
};

const KickBall = {
	enter: function(player){},
	execute: function(player){},
	exit: function(player){},
	onMessage: function(player, telegram){
		return false;
	}
};

const ReceiveBall = {
	enter: function(player){},
	execute: function(player){},
	exit: function(player){},
	onMessage: function(player, telegram){
		return false;
	}
};

const SupportAttacker = {
	enter: function(player){},
	execute: function(player){},
	exit: function(player){},
	onMessage: function(player, telegram){
		return false;
	}
};