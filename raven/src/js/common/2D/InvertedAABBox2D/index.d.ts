import IVector2D from '../Vector2D/index.d';

export default interface IInvertedAABBox2D {
  m_vTopLeft: IVector2D
  m_vBottomRight: IVector2D
  m_vCenter: IVector2D
  isOverlappedWith(other: IInvertedAABBox2D): boolean
  topLeft(): IVector2D
  bottomRight(): IVector2D
  top(): number
  left(): number
  bottom(): number
  right(): number
  center(): IVector2D
  render(renderCenter: boolean): void
}