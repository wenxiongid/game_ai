import IMovingEntity from '../common/game/moving_entity.d';
import IVector2D from '../common/2D/Vector2D/index.d';
import ITrigger from './Trigger.d';
import ITriggerRegion from './TriggerRegion';
import TriggerRegion_Circle from './TriggerRegion_Circle';
import TriggerRegion_Rectangle from './TriggerRegion_Rectangle';
import BaseGameEntity from '../common/game/base_game_entity';

export default class Trigger extends BaseGameEntity implements ITrigger {
  m_pRegionOfInfluence: ITriggerRegion
  m_bRemoveFromGame: boolean = false
  m_bActive: boolean = false
  m_iGraphNodeIndex: number
  setGraphNodeIndex(idx: number) {
    this.m_iGraphNodeIndex = idx
  }
  setToBeRemovedFromGame() {
    this.m_bRemoveFromGame = true
  }
  setInactive() {
    this.m_bActive = false
  }
  setActive() {
    this.m_bActive = true
  }
  try(entity: IMovingEntity) {}
  update() {}
  render() {}
  graphNodeIndex() {
    return this.m_iGraphNodeIndex
  }
  isToBeRemoved() {
    return this.m_bRemoveFromGame
  }
  isActive() {
    return this.m_bActive
  }
  addCircularTriggerRegion(center: IVector2D, radius: number) {
    this.m_pRegionOfInfluence = new TriggerRegion_Circle(center, radius)
  }
  addRectangularTriggerRegion(topLeft: IVector2D, bottomRight: IVector2D) {
    this.m_pRegionOfInfluence = new TriggerRegion_Rectangle(topLeft, bottomRight)
  }
  isTouchingTrigger(entityPos: IVector2D, entityRadius: number) {
    if(this.m_pRegionOfInfluence) {
      return this.m_pRegionOfInfluence.isTouching(entityPos, entityRadius)
    }
    return false
  }
}