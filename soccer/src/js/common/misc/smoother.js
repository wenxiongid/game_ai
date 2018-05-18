import Vector2D from '../2d/vector2d';

class Smoother{
	constructor(sampleSize, zeroValue) {
		this.m_History = [sampleSize, zeroValue];
		this.m_iNextUpdateSlot = 0;
		this.m_ZeroValue = zeroValue;
	}
	update(mostRecentValue){
		this.m_History[this.m_iNextUpdateSlot++] = mostRecentValue;
		if(this.m_iNextUpdateSlot == this.m_History.length){
			this.m_iNextUpdateSlot = 0;
		}
		let sum = this.m_ZeroValue;
		for(let i = 0; i < this.m_History.length; i++){
			let it = this.m_History[i];
			if(sum instanceof Vector2D){
				sum = sum.add(it);
			}else{
				sum += it;
			}
		}
		if(sum instanceof Vector2D){
			return sum.crossNum(1 / this.m_History.length);
		}else{
			return sum / this.m_History.length;
		}
	}
}

export default Smoother;