import { Queue } from '@/utils/Queue'

type Vec = {
  x: number
  y: number
}

function pacificAtlantic(heights: number[][]): number[][] {
  // heights[x][y]
  // nw - pacific
  // se - atlantic

  const bothReachable: Vec[] = []

  const lenX = heights.length
  const lenY = heights[0]!.length
  const heightsMap = heights
  const reachableNWMap: (true | undefined)[][] = Array(lenX)
    .fill(null)
    .map(() => [])
  const reachableSEMap: (true | undefined)[][] = Array(lenX)
    .fill(null)
    .map(() => [])

  const frontier = new Queue<Vec>()

  const applyNWReachable = (vec: Vec) => {
    frontier.enqueue(vec)
    reachableNWMap[vec.x]![vec.y]! = true
  }

  for (let x = 0; x < lenX; x += 1) {
    applyNWReachable({ x, y: 0 })
  }

  for (let y = 1; y < lenY; y += 1) {
    applyNWReachable({ x: 0, y })
  }

  while (frontier.size > 0) {
    const vec = frontier.dequeue()!

    const currentHeight = heightsMap[vec.x]![vec.y]!

    const visitNeighbor = (neighVec: Vec) => {
      if (neighVec.x < 0 || neighVec.x >= lenX || neighVec.y < 0 || neighVec.y >= lenY) {
        return
      }

      if (
        reachableNWMap[neighVec.x]![neighVec.y] === true ||
        currentHeight > heightsMap[neighVec.x]![neighVec.y]!
      ) {
        return
      }

      applyNWReachable(neighVec)
    }

    visitNeighbor({ x: vec.x - 1, y: vec.y })
    visitNeighbor({ x: vec.x + 1, y: vec.y })
    visitNeighbor({ x: vec.x, y: vec.y - 1 })
    visitNeighbor({ x: vec.x, y: vec.y + 1 })
  }

  const markIfBothReachable = (vec: Vec) => {
    if (reachableNWMap[vec.x]![vec.y]! === true && reachableSEMap[vec.x]![vec.y]! === true) {
      bothReachable.push(vec)
    }
  }

  const applySEReachable = (vec: Vec) => {
    frontier.enqueue(vec)
    reachableSEMap[vec.x]![vec.y]! = true
    markIfBothReachable(vec)
  }

  for (let x = 0; x < lenX; x += 1) {
    applySEReachable({ x, y: lenY - 1 })
  }

  for (let y = 0; y < lenY - 1; y += 1) {
    applySEReachable({ x: lenX - 1, y })
  }

  while (frontier.size > 0) {
    const vec = frontier.dequeue()!

    const currentHeight = heightsMap[vec.x]![vec.y]!

    const visitNeighbor = (neighVec: Vec) => {
      if (neighVec.x < 0 || neighVec.x >= lenX || neighVec.y < 0 || neighVec.y >= lenY) {
        return
      }

      if (
        reachableSEMap[neighVec.x]![neighVec.y] === true ||
        currentHeight > heightsMap[neighVec.x]![neighVec.y]!
      ) {
        return
      }

      applySEReachable(neighVec)
    }

    visitNeighbor({ x: vec.x - 1, y: vec.y })
    visitNeighbor({ x: vec.x + 1, y: vec.y })
    visitNeighbor({ x: vec.x, y: vec.y - 1 })
    visitNeighbor({ x: vec.x, y: vec.y + 1 })
  }

  return bothReachable.map((vec) => [vec.x, vec.y])
}

describe('tests', () => {
  it('desc 0', () => {
    const res = pacificAtlantic([
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ])

    expect(res).toEqual([
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ])
  })

  it('test 0', () => {
    const res = pacificAtlantic([
      [2, 1],
      [1, 2],
    ])

    expect(res).toEqual([
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    ])
  })
})
