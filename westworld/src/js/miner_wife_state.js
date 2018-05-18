import getNameOfEntity, { ENTITYNAME } from "./entity_name";
import MessageDispatcher from "./message_dispatcher";

export var WifesGlobalState = {
  enter: function(wife){},
  execute: function(wife){
    if(Math.random() < 0.1){
      wife.getFSM().changeState(VisitBathroom);
    }
  },
  exit: function(wife){},
  onMessage: function(wife, telegram){
    switch(telegram.msg){
      case 'MSG_HiHoneyImHome':
        console.log(`${getNameOfEntity(wife.id())}于${new Date().getTime()}收到telegram`);
        console.log(`${getNameOfEntity(wife.id())}: 亲爱的你回来喇，我下面给你吃哈`);
        wife.getFSM().changeState(CookStew);
        return true;
    }
    return false;
  }
};

export var DoHouseWork = {
  enter: function(wife){},
  execute: function(wife){
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        console.log(`${getNameOfEntity(wife.id())}: 擦地板`);
        break;
      case 1:
        console.log(`${getNameOfEntity(wife.id())}: 洗盘子`);
        break;
      case 2:
        console.log(`${getNameOfEntity(wife.id())}: 整理被子`);
        break;
    }
  },
  exit: function(wife){},
  onMessage: function(wife, telegram){
    return false;
  }
};

export var VisitBathroom = {
  enter: function(wife){
    console.log(`${getNameOfEntity(wife.id())}: 跑进洗手间，需要释放一下`);
  },
  execute: function(wife){
    console.log(`${getNameOfEntity(wife.id())}: 啊～～舒服`);
    wife.getFSM().revertToPreviousState();
  },
  exit: function(wife){
    console.log(`${getNameOfEntity(wife.id())}: 走出洗手间`);
  },
  onMessage: function(wife, telegram){
    return false;
  }
};

export var CookStew = {
  enter: function(wife){
    if(!wife.cooking()){
      console.log(`${getNameOfEntity(wife.id())}: 开锅下面`);
      MessageDispatcher.dispatchMessage(1500, wife.id(), wife.id(), 'MSG_StewReady');
      wife.setCooking(true);
    }
  },
  execute: function(wife){
    console.log(`${getNameOfEntity(wife.id())}: 忙着下面`);
  },
  exit: function(wife){
    console.log(`${getNameOfEntity(wife.id())}: 上桌喇`);
  },
  onMessage: function(wife, telegram){
    switch(telegram.msg){
      case 'MSG_StewReady':
        console.log(`${getNameOfEntity(wife.id())}于${new Date().getTime()}收到telegram`);
        console.log(`${getNameOfEntity(wife.id())}: 面好喇`);
        MessageDispatcher.dispatchMessage(0, wife.id(), ENTITYNAME.ent_Miner_Bob, "MSG_StewReady");
        wife.setCooking(false);
        wife.getFSM().changeState(DoHouseWork);
        return true;
    }
    return false;
  }
};