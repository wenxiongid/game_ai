export default class Telegram {
  constructor(dispatchTime, senderID, receiverID, msg, extraInfo) {
    this.dispatchTime = dispatchTime;
    this.senderID = senderID;
    this.receiverID = receiverID;
    this.msg = msg;
    this.extraInfo = extraInfo;
  }
}