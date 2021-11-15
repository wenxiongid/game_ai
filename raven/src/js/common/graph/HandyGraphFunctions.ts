import { vec2DDistance } from "../2D/Vector2D";
import gdi from "../misc/cgdi";
import { Graph_SearchDijkstra } from "./GraphAlgorithms";
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

export function GraphHelper_DrawUsingGDI(graph: SparseGraph, color: string, drawNodeIds:boolean = false) {
  if(graph.numNodes() === 0) return
  gdi.setPenColor(color)
  gdi.hollowBrush()

  for (const pN of graph.m_Nodes) {
    gdi.circle(pN.pos(), 2)
    if(drawNodeIds) {
      gdi.textColor('rgb(200, 200, 200)')
      gdi.textAtPos(pN.pos().x + 5, pN.pos().y - 5, pN.index())
    }
    if(graph.m_Edges[pN.index()]) {
      for (const edge of graph.m_Edges[pN.index()]) {
        gdi.line(pN.pos(), graph.getNode(edge.to()).pos())
      }
    }
  }
}

export function createAllPairsCostsTable(g: SparseGraph): number[][] {
  const pathCost = []
  for (let source = 0; source < g.numNodes(); source++) {
    pathCost[source] = []
    const search = new Graph_SearchDijkstra(g, source)
    for (let target = 0; target < g.numNodes(); target++) {
      if(source !== target) {
        pathCost[source][target] = search.getCostToNode(target)
      }
    }
  }
  return pathCost
}