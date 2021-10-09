import IVector2D from "./common/2D/Vector2D/index.d";
import IRaven_Bot from "./Raven_Bot/index.d";

export default interface IRaven_TargetingSystem {
  m_pOwner: IRaven_Bot
  m_pCurrentTarget: IRaven_Bot
  update(): void
  isTargetPresent(): boolean
  isTargetWithinFOV(): boolean
  isTargetShootable(): boolean
  getLastRecordedPosition(): IVector2D
  getTimeTargetHasBeenVisible(): number
  getTimeTargetHasBeenOutOfView(): number
  getTarget(): IRaven_Bot
  clearTarget(): void
}