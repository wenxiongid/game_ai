import IVector2D from "../common/2D/Vector2D/index.d";
import Trigger from "./Trigger";

export default class Trigger_LimitedLifeTime extends Trigger {
  m_iLifetime: number
  constructor(entityType: number, pos: IVector2D, r: number, lifetime: number) {
    super(entityType, pos, r)
    this.m_iLifetime = lifetime
  }
  update() {
    if(--this.m_iLifetime <= 0) {
      this.setToBeRemovedFromGame()
    }
  }
}