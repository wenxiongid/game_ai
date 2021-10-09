import { vec2DDistance } from "../2D/Vector2D";
import SparseGraph from "./SparseGraph";

export function heuristic_Euclid_calculate(g: SparseGraph, nd1: number, nd2: number) {
  return vec2DDistance(g.getNode(nd1).pos(), g.getNode(nd2).pos())
}

export function heuristic_Noisy_Euclid_calculate(g: SparseGraph, nd1: number, nd2: number) {
  return vec2DDistance(g.getNode(nd1).pos(), g.getNode(nd2).pos()) + Math.random() * 0.2 + 0.9
}

export function heuristic_Dijkstra_calculate(g: SparseGraph, nd1: number, nd2: number) {
  return 0
}