const MESSAGETYPE = {
  'MSG_HiHoneyImHome': '亲爱的我回来了',
  'MSG_StewReady': '晚饭准备好了'
};

export default function msgToStr(msg){
  if (MESSAGETYPE[msg]){
    return MESSAGETYPE[msg];
  }else{
    return 'Not recognized';
  }
}