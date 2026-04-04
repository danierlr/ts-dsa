export class GraphNodeLc {
  val: number
  neighbors: GraphNodeLc[]

  constructor(val?: number, neighbors?: GraphNodeLc[]) {
    this.val = val === undefined ? 0 : val
    this.neighbors = neighbors === undefined ? [] : neighbors
  }
}
