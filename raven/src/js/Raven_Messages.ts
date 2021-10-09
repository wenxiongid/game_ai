enum message_type {
  Msg_Blank,
  Msg_PathReady,
  Msg_NoPathAvailable,
  Msg_TakeThatMF, 
  Msg_YouGotMeYouSOB,
  Msg_GoalQueueEmpty,
  Msg_OpenSesame,
  Msg_GunshotSound,
  Msg_UserHasRemovedBot
}

export function messageToString(msg: number) {
  switch(msg) {
    case message_type.Msg_PathReady:
      return "Msg_PathReady";
    case message_type.Msg_NoPathAvailable:
      return "Msg_NoPathAvailable";
    case message_type.Msg_TakeThatMF:
      return "Msg_TakeThatMF";
    case message_type.Msg_YouGotMeYouSOB:
      return "Msg_YouGotMeYouSOB";
    case message_type.Msg_GoalQueueEmpty:
      return "Msg_GoalQueueEmpty";
    case message_type.Msg_OpenSesame:
      return "Msg_OpenSesame";
    case message_type.Msg_GunshotSound:
      return "Msg_GunshotSound";
    case message_type.Msg_UserHasRemovedBot:
      return "Msg_UserHasRemovedBot";
    default:
      return "Undefined message!";
  }
}

export default message_type