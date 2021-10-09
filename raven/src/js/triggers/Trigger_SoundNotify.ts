import { frameRate } from "../constant";
import IRaven_Bot from "../Raven_Bot/index.d";
import Trigger_LimitedLifeTime from "./Trigger_LimitedLifetime";
import dispatcher from '../common/messaging/message_dispatcher'
import message_type from "../Raven_Messages";

export default class Trigger_SoundNotify extends Trigger_LimitedLifeTime {
  m_pSoundSource: IRaven_Bot
  constructor(src: IRaven_Bot, range: number) {
    super(0, src.pos(), range, frameRate)
    this.addCircularTriggerRegion(this.pos(), this.bRadius())
    this.m_pSoundSource = src
  }
  try(bot: IRaven_Bot) {
    if(this.isTouchingTrigger(bot.pos(), bot.bRadius())) {
      dispatcher.dispatchMessage(
        0,
        this.m_pSoundSource.id(),
        bot.id(),
        message_type.Msg_GunshotSound,
        this.m_pSoundSource
      )
    }
  }
}