import { describe, it, expect } from '@jest/globals'
import { Queue } from '@/utils/Queue'

interface Vec2 {
  x: number
  y: number
}

function numIslands(grid: string[][]): number {
  let numIslands = 0

  // grid[x][y]
  const endX = grid.length
  const endY = grid[0]!.length

  let visitedGrid: (true | undefined)[][] = Array(endX).fill([])

  const visitIsland = (startNode: Vec2) => {
    const edgeNodes = new Queue<Vec2>()
    edgeNodes.enqueue(startNode)

    const visitNeighbor = (node: Vec2) => {
      if (node.x < 0 || node.x >= endX || node.y < 0 || node.y >= endY) {
        return
      }

      if (visitedGrid[node.x]![node.y]) {
        return
      }

      if (grid[node.x]![node.y] !== '1') {
        return
      }

      edgeNodes.enqueue(node)
    }

    while (edgeNodes.size > 0) {
      const node = edgeNodes.dequeue()!

      if (visitedGrid[node.x]![node.y]) {
        continue
      }

      visitedGrid[node.x]![node.y] = true

      visitNeighbor({ x: node.x - 1, y: node.y })
      visitNeighbor({ x: node.x, y: node.y - 1 })
      visitNeighbor({ x: node.x + 1, y: node.y })
      visitNeighbor({ x: node.x, y: node.y + 1 })
    }
  }

  for (let x = 0; x < endX; x++) {
    for (let y = 0; y < endY; y++) {
      const isLand = grid[x]![y] === '0'

      if (!isLand) {
        continue
      }

      const isVisited = visitedGrid[x]![y]

      if (isVisited) {
        continue
      }

      visitIsland({ x, y })

      numIslands += 1
    }
  }

  return numIslands
}

describe('tests', () => {
  it('desc 0', () => {
    const grid = [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ]

    const res = numIslands(grid)

    expect(res).toEqual(1)
  })

  it('desc 1', () => {
    const grid = [(['0', '1', '0'], ['1', '0', '1'], ['0', '1', '0'])]

    const res = numIslands(grid)

    expect(res).toEqual(4)
  })
})
