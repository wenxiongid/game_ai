import InvertedAABBox2D from '../2d/invertedaabbox2d';
import Vector2D, {
	vec2DDistanceSq
} from '../2d/vector2d';

class Cell{
	constructor(topLeft, botRight) {
		this.members = [];
		this.bBox = new InvertedAABBox2D(topLeft, botRight);
	}
}

class CellSpacePartition{
	constructor(width, height, cellsX, cellsY, maxEntitys) {
		this.m_Cells = [];
		this.m_Neighbors = [];
		this.m_curNeighbor = null;
		this.m_dSpaceWidth = width;
		this.m_dSpaceHeight = height;
		this.m_iNumCellsX = cellsX;
		this.m_iNumCellsY = cellsY;
		this.m_dCellSizeX = width / cellsX;
		this.m_dCellSizeY = height / cellsY;
		for(let y = 0; y < this.m_iNumCellsY; y++){
			for(let x = 0; x < this.m_iNumCellsX; x++){
				let left = x * this.m_dCellSizeX;
				let right = left + this.m_dCellSizeX;
				let top = y * this.m_dCellSizeY;
				let bot = top + this.m_dCellSizeY;
				this.m_Cells.push(new Cell(new Vector2D(left, top), new Vector2D(right, bot)));
			}
		}
	}
	neighbours(){
		return this.m_Neighbors;
	}
	calculateNeighbors(targetPos, queryRadius){
		this.m_Neighbors = [];
		let queryBox = new InvertedAABBox2D(targetPos.add((new Vector2D(queryRadius, queryRadius)).getReverse()), targetPos.add(new Vector2D(queryRadius, queryRadius)));
		let curCell;
		for(let i = 0; i < this.m_Cells.length; i++){
			curCell = this.m_Cells[i];
			if(curCell.bBox.isOverlappedWith(queryBox) && curCell.members.length != 0){
				for(let j = 0; j < curCell.members.length; j++){
					let it = curCell.members[j];
					if(vec2DDistanceSq(it.pos(), targetPos) < queryRadius){
						this.m_Neighbors.push(it);
					}
				}
			}
		}
	}
	emptyCells(){
		let it;
		for(let i = 0; i < this.m_Cells.length; i++){
			it.members = [];
		}
	}
	positionToIndex(pos){
		let idx = Math.floor(pos.x / (this.m_dSpaceWidth /  this.m_iNumCellsX)) + Math.floor(pos.y / (this.m_dSpaceHeight / this.m_iNumCellsY)) * this.m_iNumCellsX;
		if(idx > this.m_Cells.length - 1){
			idx = this.m_Cells.length - 1;
		}
		return idx;
	}
	addEntity(ent){
		let idx = this.positionToIndex(ent.pos());
		this.m_Cells[idx].members.push(ent);
	}
	updateEntity(ent, oldPos){
		let oldIdx = this.positionToIndex(oldPos);
		let newIdx = this.positionToIndex(ent.pos());
		if(newIdx == oldIdx){
			return;
		}
		let tempOldMembers = [];
		for(let i = 0; i < this.m_Cells[oldIdx].members.length; i++){
			if(this.m_Cells[oldIdx].members[i] != ent){
				tempOldMembers.push(this.m_Cells[oldIdx].members[i]);
			}
		}
		this.m_Cells[oldIdx].members = tempOldMembers;
		this.m_Cells[newIdx].members.push(ent);
	}
	renderCells(){
		for(let i = 0; i < this.m_Cells.length; i++){
			let curCell = this.m_Cells[i];
			curCell.bBox.render(false);
		}
	}
}

export {
	CellSpacePartition as default
};