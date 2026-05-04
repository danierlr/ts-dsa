import { UnionFind } from '@/utils/UnionFind'

function findRedundantConnection(edges: number[][]): number[] {
  const numVertices = edges.length

  const uf = new UnionFind(
    Array(numVertices)
      .fill(null)
      .map((_, index) => index + 1)
  )

  for (const edge of edges) {
    const vertA = edge[0]!
    const vertB = edge[1]!

    if (uf.connected(vertA, vertB)) {
      return [vertA, vertB]
    }

    uf.union(vertA, vertB)
  }

  throw new Error('No cycle detected')
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = findRedundantConnection([
      [1, 2],
      [1, 3],
      [2, 3],
    ])

    expect(res).toEqual([2, 3])
  })

  it('desc 1', () => {
    const res = findRedundantConnection([
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 4],
      [1, 5],
    ])

    expect(res).toEqual([1, 4])
  })
})
