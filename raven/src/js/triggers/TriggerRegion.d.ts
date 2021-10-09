import IVector2D from "../common/2D/Vector2D/index.d";

export default interface ITriggerRegion {
  isTouching(entityPos: IVector2D, entityRadius: number): boolean
}