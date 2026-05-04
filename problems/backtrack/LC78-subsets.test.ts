function subsets(nums: number[]): number[][] {
  const subsets: number[][] = []
  const included = new Set<number>()

  const findSubsets = (startIndex: number) => {
    const newSubset = Array.from(included)
    subsets.push(newSubset)

    for (let i = startIndex; i < nums.length; i += 1) {
      const num = nums[i]!

      if (included.has(num)) {
        continue
      }

      included.add(num)

      findSubsets(i + 1)

      included.delete(num)
    }
  }

  findSubsets(0)

  return subsets
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = subsets([1, 2, 3]).sort()

    expect(res).toEqual([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]].sort())
  })
})
