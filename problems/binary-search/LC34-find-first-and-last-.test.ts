function searchRange(nums: number[], target: number): number[] {
  let rangeFirst = -1
  let rangeLast = -1

  let first = 0
  let end = nums.length

  while (first < end) {
    const mid = Math.floor((first + end) / 2)

    if (nums[mid]! >= target) {
      end = mid
    } else {
      first = mid + 1
    }
  }

  if (first < nums.length && nums[first] === target) {
    rangeFirst = first
  }

  first = 0
  end = nums.length

  while (first < end) {
    const mid = Math.floor((first + end) / 2)

    if (nums[mid]! > target) {
      end = mid
    } else {
      first = mid + 1
    }
  }

  if (nums[first - 1] === target) {
    rangeLast = first - 1
  }

  return [rangeFirst, rangeLast]
}

describe('tests', () => {
  it('desc 0', () => {
    const res = searchRange([5, 7, 7, 8, 8, 10], 8)

    expect(res).toEqual([3, 4])
  })

  it('desc 1', () => {
    const res = searchRange([5, 7, 7, 8, 8, 10], 6)

    expect(res).toEqual([-1, -1])
  })

  it('desc 2', () => {
    const res = searchRange([], 0)

    expect(res).toEqual([-1, -1])
  })
})
