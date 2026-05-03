function minDistance(word1: string, word2: string): number {
  let wordX = word1
  let wordY = word2

  if (wordX.length > wordY.length) {
    const tmp = wordX
    wordX = wordY
    wordY = tmp
  }

  if (wordX.length === 0) {
    return wordY.length
  }

  let minOpsCurr: number[] = Array<number>(wordX.length).fill(0)
  let minOpsPrev: number[] = Array<number>(wordX.length).fill(0)

  for (let y = 0; y < wordY.length; y++) {
    for (let x = 0; x < wordX.length; x++) {
      let minOps = 0

      if (x > 0 && y > 0) {
        minOps = minOpsPrev[x - 1]!
      } else {
        minOps = Math.max(x, y)
      }

      if (wordX[x]! !== wordY[y]!) {
        minOps += 1
      }

      if (x > 0) {
        minOps = Math.min(minOps, minOpsCurr[x - 1]! + 1)
      }

      if (y > 0) {
        minOps = Math.min(minOps, minOpsPrev[x]! + 1)
      }

      minOpsCurr[x] = minOps
    }

    const tmp = minOpsCurr
    minOpsCurr = minOpsPrev
    minOpsPrev = tmp
  }

  return minOpsPrev[wordX.length - 1]!
}

describe('tests', () => {
  it('desc 0', () => {
    const res = minDistance('horse', 'ros')

    expect(res).toEqual(3)
  })

  it('desc 1', () => {
    const res = minDistance('intention', 'execution')

    expect(res).toEqual(5)
  })

  it('test 0', () => {
    const res = minDistance('zoologicoarchaeologist', 'zoopsychologist')

    expect(res).toEqual(10)
  })
})
