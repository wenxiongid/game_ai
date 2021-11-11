import Vector2D from "../common/2D/Vector2D";
import BaseGameEntity from "../common/game/base_game_entity";
import message_dispatcher from "../common/messaging/message_dispatcher";
import ITelegram from "../common/messaging/telegram";
import gdi from "../common/misc/cgdi";
import TYPE from "../raven_objectEnumerations";
import ITrigger from "./Trigger";
import Trigger from "./Trigger";

export default class Trigger_OnButtonSendMsg extends Trigger implements ITrigger {
  m_iReceiver: number
  m_iMessageToSend: number
  constructor(type: TYPE, pos: Vector2D, receiver: number, messageType: number, radius?: number, id?: number) {
    super(type, pos, radius || 5, id || 0)
    this.m_iReceiver = receiver
    this.m_iMessageToSend = messageType
  }
  try(pEnt: BaseGameEntity) {
    if(this.isTouchingTrigger(pEnt.pos(), pEnt.bRadius())) {
      message_dispatcher.dispatchMessage(
        0,
        this.id(),
        this.m_iReceiver,
        this.m_iMessageToSend,
        null
      )
    }
  }
  update() {}
  render() {
    gdi.orangePen()
    const sz = this.bRadius()
    const pos = this.pos()
    gdi.line(new Vector2D(pos.x - sz, pos.y - sz), new Vector2D(pos.x + sz, pos.y - sz))
    gdi.line(new Vector2D(pos.x + sz, pos.y - sz), new Vector2D(pos.x + sz, pos.y + sz))
    gdi.line(new Vector2D(pos.x + sz, pos.y + sz), new Vector2D(pos.x - sz, pos.y + sz))
    gdi.line(new Vector2D(pos.x - sz, pos.y + sz), new Vector2D(pos.x - sz, pos.y - sz))
  }
  handleMessage(msg: ITelegram) {
    return false
  }
}