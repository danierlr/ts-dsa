function longestCommonSubsequence(textA: string, textB: string): number {
  const textX = textA.length > textB.length ? textB : textA
  const textY = textA.length > textB.length ? textA : textB

  let countsXCurr: number[] = Array(textX.length + 1).fill(0)
  let countsXPrev: number[] = Array(textX.length + 1).fill(0)

  const advance = () => {
    const tmp = countsXCurr
    countsXCurr = countsXPrev
    countsXPrev = tmp
  }

  for (let y = 0; y < textY.length; y++) {
    for (let x = 0; x < textX.length; x += 1) {
      if (textX[x] === textY[y]) {
        countsXCurr[x + 1] = countsXPrev[x]! + 1
      } else {
        countsXCurr[x + 1] = Math.max(countsXCurr[x]!, countsXPrev[x + 1]!)
      }
    }

    advance()
  }

  return countsXPrev[textX.length]!
}

describe('tests', () => {
  it('desc 0', () => {
    const res = longestCommonSubsequence('abcde', 'ace')

    expect(res).toEqual(3)
  })

  it('desc 1', () => {
    const res = longestCommonSubsequence('abc', 'abc')

    expect(res).toEqual(3)
  })

  it('desc 2', () => {
    const res = longestCommonSubsequence('abc', 'def')

    expect(res).toEqual(0)
  })
})
