import ITelegram from './telegram'

export default class Telegram implements ITelegram{
  dispatchTime: number
  senderID: number
  receiverID: number
  msg: any
  extraInfo: any
  constructor(
    dispatchTime: number,
    senderID: number,
    receiverID: number,
    msg: any,
    extraInfo: any
  ) {
    this.dispatchTime = dispatchTime;
    this.senderID = senderID;
    this.receiverID = receiverID;
    this.msg = msg;
    this.extraInfo = extraInfo;
  }
}