const toKey = (x: number, y: number) => `${x}_${y}`

type Vec = {
  x: number
  y: number
}

function pacificAtlantic(heights: number[][]): number[][] {
  const lenX = heights.length
  const lenY = heights[0]!.length

  const pacificNodes = new Set<string>()
  const atlanticNodes = new Set<string>()

  const visited = new Set<string>()

  const result: number[][] = []

  let nodesToExplore: Vec[] = []

  //

  for (let x = 0; x < lenX; x += 1) {
    nodesToExplore.push({ x, y: 0 })
  }

  for (let y = 1; y < lenY; y += 1) {
    nodesToExplore.push({ x: 0, y })
  }

  while (nodesToExplore.length > 0) {
    const node = nodesToExplore.pop()!
    const { x, y } = node

    if (x >= lenX || y >= lenY) {
      continue
    }

    const height = heights[x]![y]!

    const canFlowNorth =
      node.y === 0 || (heights[x]![y - 1]! <= height && pacificNodes.has(toKey(x, y - 1)))
    const canFlowWest =
      node.x === 0 || (heights[x - 1]![y]! <= height && pacificNodes.has(toKey(x - 1, y)))

    if (canFlowWest || canFlowNorth) {
      pacificNodes.add(toKey(x, y))
    }

    nodesToExplore.push({ x: x + 1, y })
    nodesToExplore.push({ x, y: y + 1 })
  }

  //

  nodesToExplore = []

  for (let x = 0; x < lenX; x += 1) {
    nodesToExplore.push({ x, y: lenY - 1 })
  }

  for (let y = 1; y < lenY; y += 1) {
    nodesToExplore.push({ x: lenX - 1, y })
  }

  while (nodesToExplore.length > 0) {
    const node = nodesToExplore.pop()!
    const { x, y } = node

    if (x < 0 || y < 0) {
      continue
    }

    const height = heights[x]![y]!

    const canFlowSouth =
      node.y >= lenY - 1 || (heights[x]![y + 1]! <= height && at.has(toKey(x, y - 1)))
    const canFlowEast =
      node.x >= lenX - 1 || (heights[x - 1]![y]! <= height && pacificNodes.has(toKey(x - 1, y)))

    if (canFlowEast || canFlowNorth) {
      pacificNodes.add(toKey(x, y))
    }

    nodesToExplore.push({ x: x + 1, y })
    nodesToExplore.push({ x, y: y + 1 })
  }

  return result
}

describe('tests', () => {
  const res = canFinish(2, [[1, 0]])

  it('desc 0', () => {
    expect(true).toEqual(res)
  })
})
