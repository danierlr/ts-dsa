import { Queue } from '@/utils/Queue'

interface Vec {
  x: number
  y: number
}

function orangesRotting(grid: number[][]): number {
  const lenX = grid.length
  const lenY = grid[0]!.length
  const frontier = new Queue<Vec>()
  const notRotten = new Set<string>()

  const toStr = (vec: Vec) => `${vec.x}_${vec.y}`

  let daysPassed = 0

  for (let x = 0; x < lenX; x += 1) {
    for (let y = 0; y < lenY; y += 1) {
      const gridValue = grid[x]![y]

      if (gridValue === 1) {
        notRotten.add(toStr({ x, y }))
      } else if (gridValue === 2) {
        frontier.enqueue({ x, y })
      }
    }
  }

  if (frontier.size > 0) {
    while (frontier.size > 0) {
      const numRottedPreviously = frontier.size

      const rot = (vec: Vec) => {
        if (vec.x < 0 || vec.y < 0 || vec.x >= lenX || vec.y >= lenY) {
          return
        }

        const gridValue = grid[vec.x]![vec.y]

        if (gridValue === 2 || gridValue === 0) {
          return
        }

        grid[vec.x]![vec.y] = 2

        frontier.enqueue(vec)
        notRotten.delete(toStr(vec))
      }

      for (let i = 0; i < numRottedPreviously; i += 1) {
        const rottenLoc = frontier.dequeue()!

        rot({ x: rottenLoc.x - 1, y: rottenLoc.y })
        rot({ x: rottenLoc.x + 1, y: rottenLoc.y })
        rot({ x: rottenLoc.x, y: rottenLoc.y - 1 })
        rot({ x: rottenLoc.x, y: rottenLoc.y + 1 })
      }

      daysPassed += 1
    }

    daysPassed -= 1
  }

  if (notRotten.size > 0) {
    return -1
  }

  return daysPassed
}

describe('tests', () => {
  it('desc 0', () => {
    const res = orangesRotting([
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ])

    expect(res).toEqual(4)
  })
})
