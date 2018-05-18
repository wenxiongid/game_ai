import gdi from '../misc/cgdi';
import Vector2D from '../2d/vector2d';

class Region{
	constructor(left, top, right, bottom, id = -1) {
		this.m_dTop = top || 0;
		this.m_dLeft = left || 0;
		this.m_dRight = right || 0;
		this.m_dBottom = bottom || 0;
		this.m_dWidth = Math.abs(right - left);
		this.m_dHeight = Math.abs(bottom - top);
		this.m_vCenter = new Vector2D((left + right) / 2, (top + bottom) / 2);
		this.m_iID = id;
	}
	render(showID = 0){
		gdi.hollowBrush();
		gdi.greenPen();
		gdi.rect(this.m_dLeft, this.m_dTop, this.m_dRight, this.m_dBottom);
		if(showID){
			gdi.textColor(gdi.green);
			gdi.textAtPos(this.center(), this.id());
		}
	}
	inside(pos, r = 'NORMAL'){
		if(r == 'NORMAL'){
			return pos.x > this.m_dLeft && pos.x < this.m_dRight && pox.y > this.m_dTop && pos.y < this.m_dBottom;
		}else{
			let marginX = this.width() * 0.25;
			let marginY = this.height() * 0.25;
			return pos.x > this.m_dLeft + marginX && pos.x < this.m_dRight - marginX && pos.y > this.m_dTop + marginY && pos.y < this.m_dBottom - marginY;
		}
	}
	getRandomPosition(){
		return new Vector2D(this.m_dLeft + Math.random() * (this.m_dRight - this.m_dLeft), this.m_dTop + Math.random() * (this.m_dBottom - this.m_dTop));
	}
	top(){
		return this.m_dTop;
	}
	bottom(){
		return this.m_dBottom;
	}
	left(){
		return this.m_dLeft;
	}
	right(){
		return this.m_dRight;
	}
	width(){
		return Math.abs(this.m_dRight - this.m_dLeft);
	}
	height(){
		return Math.abs(this.m_dTop - this.m_dTop);
	}
	length(){
		return Math.max(this.width(), this.height());
	}
	breadth(){
		return Math.min(this.width(), this.height());
	}
	center(){
		return this.m_vCenter;
	}
	id(){
		return this.m_iID;
	}
}

export default Region;