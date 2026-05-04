type Vec = {
  x: number
  y: number
}

const toStr = (vec: Vec) => `${vec.x}_${vec.y}`

function exist(board: string[][], word: string): boolean {
  const endX = board.length
  const endY = board[0]!.length

  let found = false

  const visited = new Set<string>()

  const checkNext = (vec: Vec, startIndex: number) => {
    if (
      vec.x < 0 ||
      vec.x >= endX ||
      vec.y < 0 ||
      vec.y >= endY ||
      found ||
      startIndex >= word.length
    ) {
      return
    }

    const xyKey = toStr(vec)

    if (visited.has(xyKey)) {
      return
    }

    const boardChar = board[vec.x]![vec.y]
    const wordChar = word[startIndex]!

    if (boardChar !== wordChar) {
      return
    }

    found = startIndex === word.length - 1
    visited.add(xyKey)

    checkNext({ x: vec.x - 1, y: vec.y }, startIndex + 1)
    checkNext({ x: vec.x, y: vec.y - 1 }, startIndex + 1)
    checkNext({ x: vec.x + 1, y: vec.y }, startIndex + 1)
    checkNext({ x: vec.x, y: vec.y + 1 }, startIndex + 1)

    visited.delete(xyKey)
  }

  for (let x = 0; x < endX; x += 1) {
    for (let y = 0; y < endY; y += 1) {
      checkNext({ x, y }, 0)

      if (found) {
        break
      }
    }

    if (found) {
      break
    }
  }

  return found
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = exist(
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'ABCCED'
    )

    expect(res).toEqual(true)
  })

  it('desc 1', () => {
    const res = exist(
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'SEE'
    )

    expect(res).toEqual(true)
  })

  it('desc 2', () => {
    const res = exist(
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'ABCB'
    )

    expect(res).toEqual(false)
  })
})
