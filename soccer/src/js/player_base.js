import MovingEntity from './common/game/moving_entity';
import Vector2D, {
  vec2dNormalize,
  vec2DDistanceSq
} from './common/2d/vector2d';
import {
  MaxFloat
} from './common/misc/utils';
import SteeringBehavior from './steering_behavior';
import dispatcher from './common/messaging/message_dispatcher';
import MessageType from './soccer_messages';
import AutoList from './common/misc/autolist';
import PRM from './params';

const PLAYERROLE = {
  attacker: 'attacker',
  defender: 'defender',
  goalKeeper: 'goalKeeper'
};

function sortByDistanceToOpponentsGoal(p1, p2){
  return p1.distToOppGoal() < p2.distToOppGoal();
}

function sortByReversedDistanceToOpponentsGoal(p1, p2){
  return p1.distToOppGoal() > p2.distToOppGoal();
}

class PlayerBase extends MovingEntity{
  constructor(homeTeam, homeRegion, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, role) {
    super(homeTeam.pitch().getRegionFromIndex(homeRegion).center(),
      scale * 10,
      velocity,
      maxSpeed,
      heading,
      mass,
      new Vector2D(scale, scale),
      maxTurnRate,
      maxForce
    );
    AutoList.addMember(this);
    this.m_pTeam = homeTeam;
    this.m_dDistSqToBall = MaxFloat;
    this.m_iHomeRegion = homeRegion;
    this.m_iDefaultRegion = homeRegion;
    this.m_playerRole = role;
    this.m_vecPlayerVB = [];
    this.m_vecPlayerVBTrans = [];
    const NumPlayerVerts = 4;
    let player = [new Vector2D(-3, 8), new Vector2D(3, 10), new Vector2D(3, -10), new Vector2D(-3, -8)];
    for(let vtx = 0; vtx < NumPlayerVerts; vtx++){
      this.m_vecPlayerVB.push(player[vtx]);
      if(Math.abs(player[vtx].x) > this.m_dBoundingRadius){
        this.m_dBoundingRadius = Math.abs(player[vtx].x);
      }
      if(Math.abs(player[vtx].y) > this.m_dBoundingRadius){
        this.m_dBoundingRadius = Math.abs(player[vtx].y);
      }
    }
    this.m_pSteering = new SteeringBehavior(this, this.m_pTeam.pitch(), this.ball());
    this.m_pSteering.setTarget(homeTeam.pitch().getRegionFromIndex(homeRegion).center());
  }
  isThreatened(){
    let oppTeamMemberList = this.team().opponents().members();
    for(let i = 0; i < oppTeamMemberList.length; i++){
      let curOpp = oppTeamMemberList[i];
      if(this.positionInFrontOfPlayer(curOpp.pos()) && vec2DDistanceSq(this.pos(), curOpp.pos()) < PRM.PlayerComfortZoneSq){
        return true;
      }
    }
    return false;
  }
  trackBall(){
    this.rotateHeadingToFacePosition(this.ball().pos());
  }
  trackTarget(){
    this.setHeading(vec2dNormalize(this.steering().target().add(this.pos().getReverse())));
  }
  findSupport(){
    let bestSupportPly;
    if(this.team().supportingPlayer() == null){
      bestSupportPly = this.team().determineBestSupportingAttacker();
      this.team().setSupportingPlayer(bestSupportPly);
      dispatcher.dispatchMessage(0, this.id(), this.team().supportingPlayer().id(), MessageType.Msg_SupportAttacker, null);
    }
    bestSupportPly = this.team().determineBestSupportingAttacker();
    if(bestSupportPly && bestSupportPly != this.team().supportingPlayer()){
      if(this.team().supportingPlayer()){
        dispatcher.dispatchMessage(0, this.id(), this.team().supportingPlayer().id(), MessageType.Msg_GoHome, null);
      }
      this.team().setSupportingPlayer(bestSupportPly);
      dispatcher.dispatchMessage(0, this.id(), this.team().supportingPlayer().id(), MessageType.Msg_SupportAttacker, null);
    }
  }
  ballWithinKeeperRange(){
    return vec2DDistanceSq(this.pos(), this.ball().pos()) < PRM.KeeperInBallRangeSq;
  }
  ballWithinKickingRange(){
    return vec2DDistanceSq(this.pos(), this.ball().pos()) < PRM.PlayerKickingDistanceSq;
  }
  ballWithinReceivingRange(){
    return vec2DDistanceSq(this.pos(), this.ball().pos()) < PRM.BallWithinReceivingRangeSq;
  }
  inHomeRegion(){
    if(this.m_playerRole == PLAYERROLE.goalKeeper){
      return this.pitch().getRegionFromIndex(this.m_iHomeRegion).inside(this.pos(), 'NORMAL');
    }else{
      return this.pitch().getRegionFromIndex(this.m_iHomeRegion).inside(this.pos(), 'HALF_SIZE');
    }
  }
  isAheadOfAttacker(){
    return Math.abs(this.pos().x - this.team().opponentsGoal().center().x) < Math.abs(this.team().controllingPlayer().pos().x - this.team().opponentsGoal().center().x);
  }
  atSupportSpot(){}
  atTarget(){
    return vec2DDistanceSq(this.pos(), this.steering().target()) < PRM.PlayerInTargetRangeSq;
  }
  isClosestTeamMemberToBall(){
    return this.team().playerClosestToBall() == this;
  }
  positionInFrontOfPlayer(position){
    let toSubject = position.add(this.pos().getReverse());
    if(toSubject.dot(this.heading()) > 0){
      return true;
    }else{
      return false;
    }
  }
  isClosestPlayerOnPitchToBall(){
    return this.isClosestTeamMemberToBall() && this.distSqToBall() < this.team().opponents().closestDistToBallSq();
  }
  isControllingPlayer(){
    return this.team().controllingPlayer() == this;
  }
  inHotregion(){
    return Math.abs(this.pos().y - this.team().opponentsGoal().center().y) < this.pitch().playingArea().length / 3;
  }
  role(){
    return this.m_playerRole;
  }
  distSqToBall(){
    return this.m_dDistSqToBall;
  }
  setDistSqToBall(val){
    this.m_dDistSqToBall = val;
  }
  distToOppGoal(){
    return Math.abs(this.pos().x - this.team().opponentsGoal().center().x);
  }
  distToHomeGoal(){
    return Math.abs(this.pos().x - this.team().homeGoal().center().x);
  }
  setDefaultHomeRegion(){
    this.m_iHomeRegion = this.m_iDefaultRegion;
  }
  ball(){
    return this.team().pitch().ball();
  }
  pitch(){
    return this.team().pitch();
  }
  steering(){
    return this.m_pSteering;
  }
  homeRegion(){
    return this.pitch().getRegionFromIndex(this.m_iHomeRegion);
  }
  setHomeRegion(newRegion){
    this.m_iHomeRegion = newRegion;
  }
  team(){
    return this.m_pTeam;
  }
}

export {
  PlayerBase as default,
  PLAYERROLE
};