import {
	timeGetTime,
	randFloat,
	isEqual,
	randInRange
} from '../misc/utils';

class Regulator{
	constructor(numUpdatesPerSecondRqd) {
		this.m_dwNextUpdateTime = timeGetTime() + randFloat() * 1000;
		if(numUpdatesPerSecondRqd > 0){
			this.m_dUpdatePeriod = 1000 / numUpdatesPerSecondRqd;
		}else if(isEqual(0, numUpdatesPerSecondRqd)){
			this.m_dUpdatePeriod = 0;
		}else if(numUpdatesPerSecondRqd < 0){
			this.m_dUpdatePeriod = -1;
		}
	}
	isReady(){
		if(isEqual(0, this.m_dUpdatePeriod)){
			return true;
		}
		if(this.m_dUpdatePeriod < 0){
			return false;
		}
		let currentTime = timeGetTime();
		const updatePeriodVariator = 10;
		if(currentTime >= this.m_dwNextUpdateTime){
			this.m_dwNextUpdateTime = currentTime + this.m_dUpdatePeriod + randInRange(-updatePeriodVariator, updatePeriodVariator);
			return true;
		}
		return false;
	}
}