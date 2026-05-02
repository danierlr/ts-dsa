function rob(nums: number[]): number {
  let prevValue = 0
  let prevPrevValue = 0

  let maxValue = 0

  for (let i = 0; i < nums.length; i += 1) {
    maxValue = Math.max(prevValue, prevPrevValue + nums[i]!)

    prevPrevValue = prevValue
    prevValue = maxValue
  }

  return maxValue
}

describe('tests', () => {
  it('desc 0', () => {
    const res = rob([1, 2, 3, 1])

    expect(res).toEqual(4)
  })
})
