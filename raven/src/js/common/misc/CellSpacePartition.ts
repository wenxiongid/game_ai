import InvertedAABBox2D from "../2D/InvertedAABBox2D";
import Vector2D, { vec2DDistanceSq } from "../2D/Vector2D";

interface entity {
  pos(): Vector2D
}

class Cell {
  members: entity[]
  bbox: InvertedAABBox2D
  constructor(topLeft: Vector2D, botRight: Vector2D) {
    this.bbox = new InvertedAABBox2D(topLeft, botRight)
    this.members = []
  }
}

export default class CellSpacePartition {
  m_Cells: Cell[]
  m_Neighbors: entity[]
  m_curNeighborIndex: number
  m_dSpaceWidth: number
  m_dSpaceHeight: number
  m_iNumCellsX: number
  m_iNumCellsY: number
  m_dCellSizeX: number
  m_dCellSizeY: number
  positionToIndex(pos: Vector2D): number {
    let idx = Math.floor(this.m_iNumCellsX * pos.x / this.m_dSpaceWidth) +
      Math.floor(this.m_iNumCellsY * pos.y / this.m_dSpaceHeight) * this.m_iNumCellsX
    if(idx > this.m_Cells.length - 1) idx = this.m_Cells.length - 1
    return idx
  }
  constructor(width: number, height: number, cellsX: number, cellsY: number, maxEntitys: number) {
    this.m_dSpaceWidth = width
    this.m_dSpaceHeight = height
    this.m_iNumCellsX = cellsX
    this.m_iNumCellsY = cellsY
    this.m_Cells = []
    this.m_Neighbors = []
    this.m_dCellSizeX = width / cellsX
    this.m_dCellSizeY = height / cellsY
    for (let y = 0; y < this.m_iNumCellsY; y++) {
      for (let x = 0; x < this.m_iNumCellsX; x++) {
        const left = x * this.m_dCellSizeX
        const right = left + this.m_dCellSizeX
        const top = y * this.m_dCellSizeY
        const bottom = top + this.m_dCellSizeY
        const cell = new Cell(new Vector2D(top, left), new Vector2D(right, bottom))
        this.m_Cells.push(cell)
      }
    }
  }
  addEntity(ent: entity) {
    const idx = this.positionToIndex(ent.pos())
    this.m_Cells[idx].members.push(ent)
  }
  updateEntity(ent: entity, oldPos: Vector2D) {
    const oldIdx = this.positionToIndex(oldPos)
    const newIdx = this.positionToIndex(ent.pos())
    if(oldIdx === newIdx) return
    const oldMembers = this.m_Cells[oldIdx].members
    for (let i = 0; i < oldMembers.length; i++) {
      if(oldMembers[i] === ent) {
        this.m_Cells[oldIdx].members = oldMembers.splice(i, 1)
        break
      }
    }
    this.m_Cells[newIdx].members.push(ent)
  }
  calculateNeighbors(targetPos: Vector2D, queryRadius: number) {
    this.m_Neighbors = []
    const queryBox = new InvertedAABBox2D(
      targetPos.add(new Vector2D(-queryRadius, -queryRadius)),
      targetPos.add(new Vector2D(queryRadius, queryRadius))
    )
    for (const curCell of this.m_Cells) {
      if(curCell.bbox.isOverlappedWith(queryBox) && curCell.members.length) {
        for (const it of curCell.members) {
          if(vec2DDistanceSq(it.pos(), targetPos) < queryRadius * queryRadius) {
            this.m_Neighbors.push(it)
          }
        }
      }
    }
  }
  begin(): entity {
    this.m_curNeighborIndex = 0
    return this.m_Neighbors[this.m_curNeighborIndex]
  }
  next(): entity {
    this.m_curNeighborIndex++
    return this.m_Neighbors[this.m_curNeighborIndex]
  }
  end(): boolean {
    return this.m_curNeighborIndex >= this.m_Neighbors.length || !this.m_Neighbors[this.m_curNeighborIndex]
  }
  emptyCells() {
    for (const cell of this.m_Cells) {
      cell.members = []
    }
  }
  renderCells() {
    for (const curCell of this.m_Cells) {
      curCell.bbox.render(false)
    }
  }
}