import gdi from '../misc/cgdi';
import Vector2D, {
	vec2dNormalize
} from './vector2d';

class Wall2D{
	constructor(A, B, N) {
		this.m_vA = new Vector2D();
		this.m_vB = new Vector2D();
		this.m_vN = new Vector2D();
		if(A && B){
			this.m_vA = A;
			this.m_vB = B;
			if(N){
				this.m_vN = N;
			}else{
				this.calculateNormal();
			}
		}
	}
	calculateNormal(){
		let temp = vec2dNormalize(this.m_vB.add(this.m_vA.getReverse()));
		this.m_vN.x = -temp.y;
		this.m_vN.y = temp.x;
	}
	render(renderNormals = false){
		gdi.line(this.m_vA, this.m_vB);
		if(renderNormals){
			let midX = (this.m_vA.x + this.m_vB.x) / 2;
			let midY = (this.m_vA.y + this.m_vB.y) / 2;

			gdi.line(new Vector2D(midX, midY), new Vector2D((midX + (this.m_vN.x * 5)), (midY + (this.m_vN.y * 5))));
		}
	}
	from(){
		return this.m_vA;
	}
	setFrom(v){
		this.m_vA = v;
		this.calculateNormal();
	}
	to(){
		return this.m_vB;
	}
	setTo(v){
		this.m_vB = v;
		this.calculateNormal();
	}
	normal(){
		return this.m_vN;
	}
	setNormal(n){
		this.m_vN = n;
	}
	center(){
		return this.m_vA.add(this.m_vB).crossNum(0.5);
	}
}

export default Wall2D;