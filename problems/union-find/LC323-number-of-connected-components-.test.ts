import { UnionFind } from '@/utils/UnionFind'

function countComponents(n: number, edges: number[][]): number {
  const uf = new UnionFind<number>(
    Array(n)
      .fill(null)
      .map((_, index) => index)
  )

	for(let edge of edges){
		uf.union(edge[0]!, edge[1]!)
	}

	return uf.count
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = countComponents(5, [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ])

    expect(res).toEqual(1)
  })

  it('desc 1', () => {
    const res = countComponents(5, [
      [0, 1],
      [1, 2],
      [3, 4],
    ])

    expect(res).toEqual(2)
  })
})
