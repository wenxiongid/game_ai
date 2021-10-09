import BaseGameEntity from './base_game_entity';
import StateMachine from './state_machine';
import { DoHouseWork, WifesGlobalState } from "./miner_wife_state";

export default class MinersWife extends BaseGameEntity {
  constructor(id) {
    super(id);
    this.stateMachine = new StateMachine(this);
    this.stateMachine.setCurrentState(DoHouseWork);
    this.stateMachine.setGlobalState(WifesGlobalState);
    this.m_Location = "shack";
    this.isCooking = false;
  }
  getFSM() {
    return this.stateMachine;
  }
  update() {
    this.stateMachine.update();
  }
  handleMessage(telegram){
    return this.stateMachine.handleMessage(telegram);
  }
  cooking(){
    return this.isCooking;
  }
  setCooking(isCooking){
    this.isCooking = isCooking;
  }
}