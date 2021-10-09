import IMovingEntity from '../common/game/moving_entity.d';
import IVector2D from "../common/2D/Vector2D";
import ITriggerRegion from "./TriggerRegion.d";
import IBaseGameEntity from '../common/game/base_game_entity.d';

export default interface ITrigger extends IBaseGameEntity {
  m_pRegionOfInfluence: ITriggerRegion
  m_bRemoveFromGame: boolean
  m_bActive: boolean
  m_iGraphNodeIndex: number
  setGraphNodeIndex(idx: number): void
  setToBeRemovedFromGame(): void
  setInactive(): void
  setActive(): void
  isTouchingTrigger(entotyPos: IVector2D, entityRadius: number): boolean
  addCircularTriggerRegion(center: IVector2D, radius: number): void
  addRectangularTriggerRegion(topLeft: IVector2D, bottomRight: IVector2D): void
  try(entity: IMovingEntity): void
  update(): void
  graphNodeIndex(): number
  isToBeRemoved(): boolean
  isActive(): boolean
  render(): void
}