import MessageType from './soccer_messages';
import Vector2D, {
	vec2dNormalize
} from './common/2d/vector2d';

const GlobalKeeperState = {
	enter: function(keeper){
		// 
	},
	execute: function(keeper){
		// 
	},
	exit: function(keeper){
		// 
	},
	onMessage: function(keeper, telegram){
		switch(telegram.msg){
			case MessageType.Msg_GoHome:
				keeper.setDefaultHomeRegion();
				keeper.getFSM().changeState(ReturnHome);
				return true;
				break;
			case MessageType.Msg_ReceiveBall:
				keeper.getFSM().changeState(InterceptBall);
				return true;
				break;
		}
		return false;
	}
};

const TendGoal = {
	enter: function(keeper){
		keeper.steering().interposeOn(PRM.GoalKeeperTendingDistance);
		keeper.steering().setTarget(keeper.getReadInterposeTarget());
	},
	execute: function(keeper){
		keeper.steering().setTarget(keeper.getReadInterposeTarget());
		if(keeper.ballWithinKeeperRange()){
			keeper.ball().trap();
			keeper.pitch().setGoalKeeperHasBall(true);
			keeper.getFSM().changeState(PutBallBackInPlay);
			return;
		}
		if(keeper.ballWithinRangeForIntercept() && !keeper.team().inControl()){
			keeper.getFSM().changeState(InterceptBall);
		}
		if(keeper.tooFarFromGoalMouth() && keeper.team().inControl()){
			keeper.getFSM().changeState(ReturnHome);
			return;
		}
	},
	exit: function(keeper){
		keeper.steering().interposeOff();
	},
	onMessage: function(keeper, telegram){
		return false;
	}
};

const InterceptBall = {
	enter: function(keeper){
		keeper.steering().pursuitOn();
	},
	execute: function(keeper){
		if(keeper.tooFarFromGoalMouth() && !keeper.isClosestPlayerOnPitchToBall()){
			keeper.getFSM().changeState(ReturnHome);
			return;
		}
		if(keeper.ballWithinKeeperRange()){
			keeper.ball().trap();
			keeper.pitch().setGoalKeeperHasBall(true);
			keeper.getFSM().changeState(PutBallBackInPlay);
		}
	},
	exit: function(keeper){
		keeper.steering().pursuitOff();
	},
	onMessage: function(keeper, telegram){
		return false;
	}
};

const ReturnHome = {
	enter: function(keeper){
		keeper.steering().arriveOn();
	},
	execute: function(keeper){
		keeper.steering().setTarget(keeper.homeRegion().center());
		if(keeper.inHomeRegion() || !keeper.team().inControl()){
			keeper.getFSM().changeState(TendGoal);
		}
	},
	exit: function(keeper){
		keeper.steering().arriveOff();
	},
	onMessage: function(keeper, telegram){
		return false;
	}
};

const PutBallBackInPlay = {
	enter: function(keeper){
		keeper.team().setControllingPlayer(keeper);
		keeper.team().opponents().returnAllFieldPlayersToHome();
		keeper.team().returnAllFieldPlayersToHome();
	},
	execute: function(keeper){
		let passInfo = keeper.team().findPass(keeper, PRM.MaxPassingForce, PRM.GoalkeeperMinPassDistance);
		if(passInfo.result){
			keeper.ball().kick(vec2dNormalize(passInfo.target.add(keeper.ball().pos().getReverse())), PRM.MaxPassingForce);
			keeper.pitch().setGoalKeeperHasBall(false);
			dispatcher.dispatchMessage(0, keeper.id(), passInfo.receiver.id(), MessageType.Msg_ReceiveBall, passInfo.target);
			keeper.getFSM().changeState(TendGoal);
			return;
		}
		keeper.setVelocity(new Vector2D());
	},
	exit: function(keeper){
		// 
	},
	onMessage: function(keeper, telegram){
		return false;
	}
};

export {
	GlobalKeeperState,
	TendGoal,
	InterceptBall,
	ReturnHome,
	PutBallBackInPlay
};