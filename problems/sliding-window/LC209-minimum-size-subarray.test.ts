import { describe, it, expect } from '@jest/globals'

function minSubArrayLen(target: number, nums: number[]): number {
  let minLength: number = nums.length + 1

  let start = 0
  let end = 0
  let sum = 0

  while (end < nums.length) {
    while (sum < target && end < nums.length) {
      sum += nums[end]!
      end += 1
    }

    while (sum >= target && start < end) {
      if (sum >= target) {
        minLength = Math.min(end - start, minLength)
      }

      sum -= nums[start]!
      start += 1
    }
  }

  if (minLength === nums.length + 1) {
    return 0
  }

  return minLength
}

describe('example desc', () => {
  const result = minSubArrayLen(7, [2, 3, 1, 2, 4, 3])

  it('example case', () => {
    expect(result).toEqual(2)
  })
})
