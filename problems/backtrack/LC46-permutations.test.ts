function permute(nums: number[]): number[][] {
  const permutations: number[][] = []

  const available = new Set<number>(
    Array(nums.length)
      .fill(null)
      .map((_, index) => nums[index]!)
  )

  const stack: number[] = []

  const find = () => {
    for (let i = 0; i < nums.length; i += 1) {
      const num = nums[i]!

      if (!available.has(num)) {
        continue
      }

      available.delete(num)
      stack.push(num)

      if (available.size) {
        find()
      } else {
        permutations.push(stack.slice())
      }

      available.add(num)
      stack.pop()
    }
  }

  find()

  return permutations
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = permute([1, 2, 3]).sort()

    expect(res).toEqual(
      [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ].sort()
    )
  })
})
