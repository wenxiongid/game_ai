import gdi from '../misc/cgdi';

class InvertedAABBox2D{
	constructor(tl, br) {
		this.m_vTopLeft = tl;
		this.m_vBottomRight = br;
		this.m_vCenter = tl.add(br).crossNum(0.5);
	}
	isOverlappedWith(other){
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
		gdi.line(this.left(), this.top(), this.right(), this.top());
		gdi.line(this.left(), this.bottom(), this.right(), this.bottom());
		gdi.line(this.left(), this.top(), this.left(), this.bottom());
		gdi.line(this.right(), this.top(), this.right(), this.bottom());
		if(renderCenter){
			gdi.circle(this.m_vCenter, 5);
		}
	}
}

export default InvertedAABBox2D;