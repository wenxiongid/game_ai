import PRM from './params';
import MessageType from './soccer_messages';
import dispatcher from './common/messaging/message_dispatcher';
import Vector2D, {
  vec2dNormalize
} from './common/2d/vector2d';
import {
  randFloat
} from './common/misc/utils';
import {
  addNoiseToKick
} from './soccer_ball';
import {
  vec2dRotateAroundOrigin
} from './common/2d/transformations';

const GlobalPlayerState = {
  name: 'GlobalPlayerState',
  enter: function(player){},
  execute: function(player){
    if(player.ballWithinReceivingRange() && player.isControllingPlayer()){
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
        if(player.getFSM().isInstate(SupportAttacker)){
          return true;
        }
        player.steering().setTarget(player.team().getSupportSpot());
        player.getFSM().changeState(SupportAttacker);
        return true;
        break;
      case MessageType.Msg_Wait:
        player.getFSM().changeState(Wait);
        return true;
        break;
      case MessageType.Msg_GoHome:
        player.setDefaultHomeRegion();
        player.getFSM().changeState(ReturnToHomeRegion);
        return true;
        break;
      case MessageType.Msg_PassToMe:
        let receiver = telegram.extraInfo;
        if(player.team().receiver() != null || !player.ballWithinKickingRange()){
          console.warn('player cannot make requested pass');
          return true;
        }
        player.ball().kick(receiver.pos().add(player.ball().pos().getReverse()), PRM.MaxPassingForce);
        dispatcher.dispatchMessage(0, player.id(), receiver.id(), MessageType.Msg_ReceiveBall, receiver.pos());
        player.getFSM().changeState(Wait);
        player.findSupport();
        return true;
        break;
    }
    return false;
  }
};

const ChaseBall = {
  name: 'ChaseBall',
  enter: function(player){
    player.steering().seekOn();
  },
  execute: function(player){
    if(player.ballWithinKickingRange()){
      player.getFSM().changeState(KickBall);
      return;
    }
    if(player.isClosestTeamMemberToBall()){
      player.steering().setTarget(player.ball().pos());
      return;
    }
    player.getFSM().changeState(ReturnToHomeRegion);
  },
  exit: function(player){
    player.steering().seekOff();
  },
  onMessage: function(player, telegram){
    return false;
  }
};

const Dribble = {
  name: 'Dribble',
  enter: function(player){
    player.team().setControllingPlayer(player);
  },
  execute: function(player){
    let dot = player.team().homeGoal().facing().dot(player.heading());
    if(dot < 0){
      let direction = player.heading();
      let angle = Math.PI / 4 * -1 * player.team().homeGoal().facing().sign(player.heading());
      vec2dRotateAroundOrigin(direction, angle);
      const kickingForce = 0.8;
      player.ball().kick(direction, kickingForce);
    }else{
      player.ball().kick(player.team().homeGoal().facing(), PRM.MaxDribbleForce);
    }
    player.getFSM().changeState(ChaseBall);
    return;
  },
  exit: function(player){},
  onMessage: function(player, telegram){
    return false;
  }
};

const ReturnToHomeRegion = {
  name: 'ReturnToHomeRegion',
  enter: function(player){
    player.steering().arriveOn();
    if(!player.homeRegion().inside(player.steering().target(), 'HALF_SIZE')){
      player.steering().setTarget(player.homeRegion().center());
    }
  },
  execute: function(player){
    if(player.pitch().gameOn()){
      if(player.isClosestTeamMemberToBall() && player.team().receiver() == null && !player.pitch().goalKeeperHasBall()){
        player.getFSM().changeState(ChaseBall);
        return;
      }
    }
    if(player.pitch().gameOn() && player.homeRegion().inside(player.pos(), 'HALF_SIZE')){
      player.steering().setTarget(player.pos());
      player.getFSM().changeState(Wait);
    }else if(!player.pitch().gameOn() && player.atTarget()){
      player.getFSM().changeState(Wait);
    }
  },
  exit: function(player){
    player.steering().arriveOff();
  },
  onMessage: function(player, telegram){
    return false;
  }
};

const Wait = {
  name: 'Wait',
  enter: function(player){
    if(!player.pitch().gameOn()){
      player.steering().setTarget(player.homeRegion().center());
    }
  },
  execute: function(player){
    if(!player.atTarget()){
      player.steering().arriveOn();
      return;
    }else{
      player.steering().arriveOff();
      player.setVelocity(new Vector2D(0, 0));
      player.trackBall();
    }
    if(player.pitch().gameOn()){
      if(player.isClosestTeamMemberToBall() && player.team().receiver() == null && !player.pitch().goalKeeperHasBall()){
        player.getFSM().changeState(ChaseBall);
        return;
      }
    }
  },
  exit: function(player){},
  onMessage: function(player, telegram){
    return false;
  }
};

const KickBall = {
  name: 'KickBall',
  enter: function(player){
    player.team().setControllingPlayer(player);
    if(!player.isReadyFornextKick()){
      player.getFSM().changeState(ChaseBall);
    }
  },
  execute: function(player){
    let toBall = player.ball().pos().add(player.pos().getReverse());
    let dot = player.heading().dot(vec2dNormalize(toBall));
    let ballTarget;
    let kickDirection;
    if(player.team().receiver() != null || player.pitch().goalKeeperHasBall() || dot < 0){
      console.warn('goaly has ball / ball behind player');
      player.getFSM().changeState(ChaseBall);
      return;
    }
    let power = PRM.MaxShootingForce * dot;
    let shootInfo = player.team().canShoot(player.ball().pos(), power);
    if(shootInfo.result || randFloat() < PRM.ChancePlayerAttemptsPotShot){
      ballTarget = addNoiseToKick(player.ball().pos(), shootInfo.target);
      kickDirection = ballTarget.add(player.ball().pos().getReverse());
      player.ball().kick(kickDirection, power);
      player.getFSM().changeState(Wait);
      player.findSupport();
      return;
    }
    power = PRM.MaxPassingForce * dot;
    let passInfo = player.team().findPass(player, power, PRM.MinPassDistance);
    if(player.isThreatened() && passInfo.result){
      ballTarget = addNoiseToKick(player.ball().pos(), passInfo.target);
      kickDirection = ballTarget.add(player.ball().pos().getReverse());
      player.ball().kick(kickDirection, power);
      dispatcher.dispatchMessage(0, player.id(), passInfo.receiver.id(), MessageType.Msg_ReceiveBall, ballTarget);
      player.getFSM().changeState(Wait);
      player.findSupport();
      return;
    }else{
      player.findSupport();
      player.getFSM().changeState(Dribble);
    }
  },
  exit: function(player){},
  onMessage: function(player, telegram){
    return false;
  }
};

const ReceiveBall = {
  name: 'ReceiveBall',
  enter: function(player){
    player.team().setReceiver(player);
    player.team().setControllingPlayer(player);
    const passThreatRadius = 70;
    if(player.inHotregion() || randFloat() < PRM.ChanceOfUsingArriveTypeReceiveBehavior &&
      !player.team().isOpponentWithinRadius(player.pos(), passThreatRadius)
    ){
      player.steering().arriveOn();
    }else{
      player.steering().pursuitOn();
    }
  },
  execute: function(player){
    if(player.ballWithinReceivingRange() || !player.team().inControl()){
      player.getFSM().changeState(ChaseBall);
      return;
    }
    if(player.steering().pursuitIsOn()){
      player.steering().setTarget(player.ball().pos());
    }
    if(player.atTarget()){
      player.steering().arriveOff();
      player.steering().pursuitOff();
      player.trackBall();
      player.setVelocity(new Vector2D(0, 0));
    }
  },
  exit: function(player){
    player.steering().arriveOff();
    player.steering().pursuitOff();
    player.team().setReceiver(null);
  },
  onMessage: function(player, telegram){
    return false;
  }
};

const SupportAttacker = {
  name: 'SupportAttacker',
  enter: function(player){
    player.steering().arriveOn();
    player.steering().setTarget(player.team().getSupportSpot());
  },
  execute: function(player){
    if(!player.team().inControl()){
      player.getFSM().changeState(ReturnToHomeRegion);
      return;
    }
    if(player.team().getSupportSpot() != player.steering().target()){
      player.steering().setTarget(player.team().getSupportSpot());
      player.steering().arriveOn();
    }
    if(player.team().canShoot(player.pos(), PRM.MaxShootingForce)){
      player.team().requestPass(player);
    }
    if(player.atTarget()){
      player.steering().arriveOff();
      player.trackBall();
      player.setVelocity(new Vector2D(0, 0));
      if(!player.isThreatened()){
        player.team().requestPass(player);
      }
    }
  },
  exit: function(player){
    player.team().setSupportingPlayer(null);
    player.steering().arriveOff();
  },
  onMessage: function(player, telegram){
    return false;
  }
};

export {
  GlobalPlayerState,
  ChaseBall,
  Dribble,
  ReturnToHomeRegion,
  Wait,
  KickBall,
  ReceiveBall,
  SupportAttacker
};