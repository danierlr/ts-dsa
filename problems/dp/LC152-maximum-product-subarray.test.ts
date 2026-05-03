function maxProduct(nums: number[]): number {
  let max = nums[0]!

  let maxProd = nums[0]!
  let minProd = nums[0]!

  for (let i = 1; i < nums.length; i += 1) {
    const num = nums[i]!

    const currMax = Math.max(num, maxProd * num, minProd * num)
    const currMin = Math.min(num, maxProd * num, minProd * num)

    maxProd = currMax
    minProd = currMin

    max = Math.max(max, maxProd)
  }

  return max
}

describe('tests', () => {
  it('desc 0', () => {
    const res = maxProduct([2, 3, -2, 4])

    expect(res).toEqual(6)
  })

  it('desc 1', () => {
    const res = maxProduct([-2, 0, -1])

    expect(res).toEqual(0)
  })
})

// kadane
