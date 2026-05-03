function lengthOfLIS(nums: number[]): number {
  let tails: number[] = []

  for (let num of nums) {
    let first = 0
    let end = tails.length

    while (first < end) {
      const mid = Math.floor((first + end) / 2)

      if (tails[mid]! < num) {
        first = mid + 1
      } else {
        end = mid
      }
    }

    if (tails[first] === undefined || tails[first]! > num) {
      tails[first] = num
    }
  }

  return tails.length
}

describe('tests', () => {
  it('desc 0', () => {
    const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])

    expect(res).toEqual(4)
  })

  it('desc 1', () => {
    const res = lengthOfLIS([0, 1, 0, 3, 2, 3])

    expect(res).toEqual(4)
  })

  it('desc 2', () => {
    const res = lengthOfLIS([7, 7, 7, 7, 7, 7, 7])

    expect(res).toEqual(1)
  })
})
