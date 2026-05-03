function uniquePaths(m: number, n: number): number {
  let maxX = m
  let maxY = n

  if (maxX > maxY) {
    const tmp = maxX
    maxX = maxY
    maxY = tmp
  }

  let pathsCurr = Array<number>(maxX).fill(0)
  let pathsPrev = Array<number>(maxX).fill(0)

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      pathsCurr[x] = 0

      if (x === 0 && y === 0) {
        pathsCurr[x] = 1
      }

      if (x > 0) {
        pathsCurr[x]! += pathsCurr[x - 1]!
      }

      if (y > 0) {
        pathsCurr[x]! += pathsPrev[x]!
      }
    }

    const tmp = pathsCurr
    pathsCurr = pathsPrev
    pathsPrev = tmp
  }

  return pathsPrev[maxX - 1]!
}

describe('tests', () => {
  it('desc 0', () => {
    const res = uniquePaths(3, 7)

    expect(res).toEqual(28)
  })

  it('desc 0', () => {
    const res = uniquePaths(3, 2)

    expect(res).toEqual(3)
  })
})
