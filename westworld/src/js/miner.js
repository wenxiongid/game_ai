import BaseGameEntity from './base_game_entity';
import StateMachine from './state_machine';
import {GoHomeAndSleepTilRested} from "./state";

const STATE = {
  comfortLevel: 5,
  maxNuggets: 3,
  thirstLevel: 5,
  tirednessThreshold: 5
};

export default class Miner extends BaseGameEntity {
  constructor(id) {
    super(id);
    this.stateMachine = new StateMachine(this);
    this.stateMachine.setCurrentState(GoHomeAndSleepTilRested);
    this.m_Location = "shack";
    this.m_iGoldCarried = 0;
    this.m_iMoneyInBank = 0;
    this.m_iThirsty = 0;
    this.m_iFatigue = 0;
  }
  getFSM() {
    return this.stateMachine;
  }
  update() {
    this.m_iThirsty += 1;
    this.stateMachine.update();
  }
  changeLocation(pNewLocation) {
    this.m_Location = pNewLocation;
  }
  location() {
    return this.m_Location;
  }
  addToGoldCarried(count) {
    this.m_iGoldCarried += count;
    if (this.m_iGoldCarried < 0) {
      this.m_iGoldCarried = 0;
    }
  }
  setGoldCarried(count) {
    this.m_iGoldCarried = count;
  }
  goldCarried() {
    return this.m_iGoldCarried;
  }
  increaseFatigue() {
    this.m_iFatigue++;
  }
  decreaseFatigue() {
    this.m_iFatigue--;
  }
  fatigued() {
    return this.m_iFatigue > STATE.tirednessThreshold;
  }
  pocketsFull() {
    return this.m_iGoldCarried >= STATE.maxNuggets;
  }
  thirsty() {
    return this.m_iThirsty >= STATE.thirstLevel;
  }
  addToWealth(count) {
    this.m_iMoneyInBank += this.m_iGoldCarried;
    if (this.m_iMoneyInBank < 0) {
      this.m_iMoneyInBank = 0;
    }
  }
  wealth() {
    return this.m_iMoneyInBank;
  }
  wealthEnough() {
    return this.wealth() >= STATE.comfortLevel;
  }
  buyAndDrinkAWhiskey() {
    this.m_iThirsty = 0;
    this.m_iMoneyInBank -= 2;
  }
  handleMessage(telegram) {
    return this.stateMachine.handleMessage(telegram);
  }
}