export default interface ITelegram {
  dispatchTime: number
  senderID: number
  receiverID: number
  msg: any
  extraInfo: any
}