import IRaven_Bot from "../Raven_Bot/index.d";
import ITrigger from "./Trigger.d";

export default class TriggerSystem {
  m_Triggers: (ITrigger | null)[] = []
  updateTriggers() {
    for(let i = 0; i < this.m_Triggers.length; i++) {
      const trigger = this.m_Triggers[i]
      if(trigger) {
        if(trigger.isToBeRemoved()) {
          this.m_Triggers[i] = null
        } else {
          trigger.update()
        }
      }
    }
  }
  tryTriggers(bots: IRaven_Bot[]) {
    for (const bot of bots) {
      if(bot.isReadyForTriggerUpdate() && bot.isAlive()) {
        for (const trigger of this.m_Triggers) {
          if(trigger) {
            trigger.try(bot)
          }
        }
      }
    }
  }
  clear() {
    for(let i = 0; i < this.m_Triggers.length; i++) {
      this.m_Triggers[i] = null
    }
    this.m_Triggers = []
  }
  update(bots: IRaven_Bot[]) {
    this.updateTriggers()
    this.tryTriggers(bots)
  }
  register(trigger: ITrigger) {
    this.m_Triggers.push(trigger)
  }
  render() {
    for (const trigger of this.m_Triggers) {
      if(trigger) {
        trigger.render()
      }
    }
  }
}