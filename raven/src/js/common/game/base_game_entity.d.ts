import ITelegram from "../messaging/telegram.d";
import IVector2D from "../2D/Vector2D/index.d";

export default interface IBaseGameEntity {
  m_ID: number
  m_dBoundingRadius: number
  m_vPos: IVector2D
  m_vScale: IVector2D
  m_EntityType: number
  m_bTag: boolean
  update(): void
  render(): void
  pos(): IVector2D
  handleMessage(telegram: ITelegram): boolean
  write(): void
  read(): void
  pos(): IVector2D
  setPos(pos: IVector2D): void
  bRadius(): number
  setBRadius(r: number): void
  id(): number
  isTagged(): boolean
  tag(): void
  unTag(): void
  scale(): IVector2D
  setScale(scale: IVector2D): void
  entityType(): number
  setEntityType(type: number): void
}