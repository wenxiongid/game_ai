import getNameOfEntity from "./entity_name";
import EntityManager from './entity_manager';
import Telegram from './telegram';
import msgToStr from './message_types';

function sortPriorityQ(r1, r2){
  return r1.dispatchTime - r2.dispatchTime;
}

class MessageDispatcher{
  constructor(){
    this.prioritQ = [];
  }
  discharge(pReceiver, telegram){
    if(!pReceiver.handleMessage(telegram)){
      console.error('Message not handled');
    }
  }
  dispatchMessage(delay, senderID, receiverID, msg, extraInfo){
    var pSender = EntityManager.getEntityFromID(senderID);
    var pReceiver = EntityManager.getEntityFromID(receiverID);
    if(!pReceiver){
      console.error(`Warning! No Receiver with ID of ${receiverID} found`);
      return;
    }
    var telegram = new Telegram(0, senderID, receiverID, msg, extraInfo);
    if(delay <= 0){
      console.log(`即时telegram触发于: ${(new Date()).getTime()}, 由${getNameOfEntity(senderID)}发给${getNameOfEntity(receiverID)}, 信息为: ${msgToStr(msg)}`);
      this.discharge(pReceiver, telegram);
    }else{
      var currentTime = new Date().getTime();
      telegram.dispatchTime = currentTime + delay;
      this.prioritQ.push(telegram);
      this.prioritQ.sort(sortPriorityQ);
      console.log(`延时telegram记录于: ${new Date().getTime()}, 由${getNameOfEntity(senderID)}发给${getNameOfEntity(receiverID)}, 信息为: ${msgToStr(msg)}`);
    }
  }
  dispatchDelayedMessages(){
    var currentTime = new Date().getTime();
    while(this.prioritQ.length && this.prioritQ[0].dispatchTime < currentTime && this.prioritQ[0].dispatchTime > 0){
      var telegram = this.prioritQ[0];
      var pReceiver = EntityManager.getEntityFromID(telegram.receiverID);
      console.log(`队列telegram准备触发: 发给${getNameOfEntity(pReceiver.id())}. 消息为: ${msgToStr(telegram.msg)}`);
      this.discharge(pReceiver, telegram);
      this.prioritQ.shift();
    }
  }
}

export default new MessageDispatcher();