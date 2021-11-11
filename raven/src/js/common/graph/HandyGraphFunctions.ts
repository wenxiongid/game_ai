import { vec2DDistance } from "../2D/Vector2D";
import SparseGraph from "./SparseGraph";

export function calculateAverageGraphEdgeLength(g: SparseGraph) {
  let totalLength = 0
  let numEdgesCounted = 0
  for (let i = 0; i < g.m_Nodes.length; i++) {
    for (let j = 0; j < g.m_Edges[i].length; j++) {
      const pE = g.m_Edges[i][j]
      ++numEdgesCounted
      totalLength += vec2DDistance(g.getNode(pE.from()).pos(), g.getNode(pE.to()).pos())
    }
  }
  return totalLength / numEdgesCounted
}