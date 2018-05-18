import getNameOfEntity, { ENTITYNAME } from './entity_name';
import MessageDispatcher from './message_dispatcher';

export var EnterMineAndDigForNugget = {
  enter: function(pMiner) {
    if(pMiner.location() != 'goldmine'){
      console.log(`${getNameOfEntity(pMiner.id())}: 走进金矿`);
      pMiner.changeLocation('goldmine');
    }
  },
  execute: function(pMiner) {
    pMiner.addToGoldCarried(1);
    pMiner.increaseFatigue();
    console.log(`${getNameOfEntity(pMiner.id())}: 捡起一块金`);
    if(pMiner.pocketsFull()){
      pMiner.getFSM().changeState(VisitBankAndDepositGold);
    }
    if(pMiner.thirsty()){
      pMiner.getFSM().changeState(QuenchThirst);
    }
  },
  exit: function(pMiner) {
    console.log(`${getNameOfEntity(pMiner.id())}: 捡够了，出去了`);
  },
  onMessage(pMiner, telegram){
    return false;
  }
};

export var VisitBankAndDepositGold = {
  enter: function(pMiner){
    if(pMiner.location() != 'bank'){
      console.log(`${getNameOfEntity(pMiner.id())}: 去银行存钱了Yeah`);
      pMiner.changeLocation('bank');
    }
  },
  execute: function(pMiner){
    pMiner.addToWealth(pMiner.goldCarried());
    pMiner.setGoldCarried(0);
    console.log(`${getNameOfEntity(pMiner.id())}: 存钱. 现在总共存了: ${pMiner.wealth()}`);
    if(pMiner.wealthEnough()){
      console.log(`${getNameOfEntity(pMiner.id())}: WooHoo! 够有钱了. 回家睡觉`);
      pMiner.getFSM().changeState(GoHomeAndSleepTilRested);
    }else{
      pMiner.getFSM().changeState(EnterMineAndDigForNugget);
    }
  },
  exit: function(pMiner){
    console.log(`${getNameOfEntity(pMiner.id())}: 走出银行`);
  },
  onMessage(pMiner, telegram){
    return false;
  }
};

export var QuenchThirst = {
  enter: function(pMiner) {
    if(pMiner.location() != 'saloon'){
      pMiner.changeLocation('saloon');
      console.log(`${getNameOfEntity(pMiner.id())}: 渴死我了! 去酒吧`);
    }
  },
  execute: function(pMiner) {
    if(pMiner.thirsty()){
      pMiner.buyAndDrinkAWhiskey();
      console.log(`${getNameOfEntity(pMiner.id())}: 点了一杯酒`);
      pMiner.getFSM().changeState(EnterMineAndDigForNugget);
    }else{
      console.log('error drink');
    }
  },
  exit: function(pMiner) {
    console.log(`${getNameOfEntity(pMiner.id())}: 走出酒吧，舒服多了`);
  },
  onMessage(pMiner, telegram){
    return false;
  }
};

export var GoHomeAndSleepTilRested = {
  enter: function(pMiner) {
    if(pMiner.location() != 'shack'){
      console.log(`${getNameOfEntity(pMiner.id())}: 回家`);
      pMiner.changeLocation('shack');
      MessageDispatcher.dispatchMessage(0, pMiner.id(), ENTITYNAME.ent_Elsa, 'MSG_HiHoneyImHome');
    }
  },
  execute: function(pMiner) {
    if(!pMiner.fatigued()){
      console.log(`${getNameOfEntity(pMiner.id())}: 睡了个好觉! 该去干活了`);
      pMiner.getFSM().changeState(EnterMineAndDigForNugget);
    }else{
      pMiner.decreaseFatigue();
      console.log(`${getNameOfEntity(pMiner.id())}: ZZZZ...`);
    }
  },
  exit: function(pMiner) {
    console.log(`${getNameOfEntity(pMiner.id())}: 走出家门`);
  },
  onMessage(pMiner, telegram){
    switch(telegram.msg){
      case 'MSG_StewReady':
        console.log(`${getNameOfEntity(pMiner.id())}于${new Date().getTime()}收到telegram`);
        console.log(`${getNameOfEntity(pMiner.id())}: 好的，吃饭喇`);
        pMiner.getFSM().changeState(EatStew);
        return true;
    }
    return false;
  }
};

export var EatStew = {
  enter: function(pMiner){
    console.log(`${getNameOfEntity(pMiner.id())}: 老婆闻起来好香啊!`);
  },
  execute: function(pMiner){
    console.log(`${getNameOfEntity(pMiner.id())}: 握嘈握嘈好吃好吃!!!`);
    pMiner.getFSM().revertToPreviousState();
  },
  exit: function(pMiner){
    console.log(`${getNameOfEntity(pMiner.id())}: 谢谢老婆，回来再见`);
  },
  onMessage: function(pMiner){
    return false;
  }
};