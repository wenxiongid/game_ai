import gdi from '../../misc/cgdi';
import IVector2D from '../Vector2D/index.d';
import IInvertedAABBox2D from './index.d'

export default class InvertedAABBox2D implements IInvertedAABBox2D {
  m_vTopLeft: IVector2D
  m_vBottomRight: IVector2D
  m_vCenter: IVector2D

	constructor(tl: IVector2D, br: IVector2D) {
		this.m_vTopLeft = tl;
		this.m_vBottomRight = br;
		this.m_vCenter = tl.add(br).crossNum(0.5);
	}
	isOverlappedWith(other: IInvertedAABBox2D){
		return !(other.top() > this.bottom() || other.bottom() < this.top() || other.left() > this.right() || other.right() < this.left());
	}
	topLeft(){
		return this.m_vTopLeft;
	}
	bottomRight(){
		return this.m_vBottomRight;
	}
	top(){
		return this.m_vTopLeft.y;
	}
	left(){
		return this.m_vTopLeft.x;
	}
	bottom(){
		return this.m_vBottomRight.y;
	}
	right(){
		return this.m_vBottomRight.x;
	}
	center(){
		return this.m_vCenter;
	}
	render(renderCenter = false){
		gdi.line({x: this.left(), y: this.top()}, {x: this.right(), y: this.top()});
		gdi.line({x: this.left(), y: this.bottom()}, {x: this.right(), y: this.bottom()});
		gdi.line({x: this.left(), y: this.top()}, {x: this.left(), y: this.bottom()});
		gdi.line({x: this.right(), y: this.top()}, {x: this.right(), y: this.bottom()});
		if(renderCenter){
			gdi.circle(this.m_vCenter, 5);
		}
	}
}
