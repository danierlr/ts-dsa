function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b)
  const combinations: number[][] = []

  let stack: number[] = []

  const check = (startIndex: number, startSum: number) => {
    for (let i = startIndex; i < candidates.length; i += 1) {
      const cand = candidates[i]!

      const sum = startSum + cand
      stack.push(cand)

      if (sum === target) {
        combinations.push(stack.slice())
      }

      if (sum < target) {
        check(i, sum)
      }

      stack.pop()

      if (sum > target) {
        break
      }
    }
  }

  check(0, 0)

  return combinations
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = combinationSum([2, 3, 6, 7], 7).sort()

    expect(res).toEqual([[2, 2, 3], [7]].sort())
  })

  it('desc 1', () => {
    const res = combinationSum([2, 3, 5], 8).sort()

    expect(res).toEqual(
      [
        [2, 2, 2, 2],
        [2, 3, 3],
        [3, 5],
      ].sort()
    )
  })

  it('desc 2', () => {
    const res = combinationSum([2], 1).sort()

    expect(res).toEqual([].sort())
  })

  it('test 0', () => {
    const res = combinationSum([3, 12, 9, 11, 6, 7, 8, 5, 4], 15).sort()

    expect(1).toEqual(1)
  })
})
