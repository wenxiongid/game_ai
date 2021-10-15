import SparseGraph from "../common/graph/SparseGraph";

export enum CHECK_TYPE {
  findNodeIndex,
  findActiveTrigger
}

export function isSatisfied(g: SparseGraph, target: number, currentNodeIdx: number, type: CHECK_TYPE = CHECK_TYPE.findNodeIndex) {
  if(type === CHECK_TYPE.findNodeIndex) {
    return currentNodeIdx === target
  }
  if(type === CHECK_TYPE.findActiveTrigger) {
    let bSatisfied = false

    const node = g.getNode(currentNodeIdx)
    if(
      node.extraInfo() &&
      node.extraInfo().isActive() &&
      node.extraInfo().entityType() === target
    ) {
      bSatisfied = true
    }

    return bSatisfied
  }
  return false
}