import {
	lineIntersection2D
} from './common/2d/geometry';

class Goal{
	constructor(left, right, facing) {
		this.m_vLeftPost = left;
		this.m_vRightPost = right;
		this.m_vFacing = facing;
		this.m_vCenter = left.add(right).crossNum(1 / 2);
		this.m_iNumGoalsScored = 0;
	}
	scored(ball){
		if(lineIntersection2D(ball.pos(), ball.oldPos(), this.m_vLeftPost, this.m_vRightPost)){
			++this.m_iNumGoalsScored;
			return true;
		}
		return false;
	}
	center(){
		return this.m_vCenter;
	}
	facing(){
		return this.m_vFacing;
	}
	leftPost(){
		return this.m_vLeftPost;
	}
	rightPost(){
		return this.m_vRightPost;
	}
	numGoalsScored(){
		return this.m_iNumGoalsScored;
	}
	resetGoalScored(){
		this.m_iNumGoalsScored = 0;
	}
}

export default Goal;