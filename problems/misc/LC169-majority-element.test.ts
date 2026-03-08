import { describe, it, expect } from '@jest/globals'

function majorityElement(nums: number[]): number {
  let mostFrequent = nums[0]!
  let overFrequency = 1

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === mostFrequent) {
      overFrequency += 1
    } else if (overFrequency > 0) {
      overFrequency -= 1
    } else {
      mostFrequent = nums[i]!
      overFrequency = 1
    }
  }

  return mostFrequent
}

describe('example desc', () => {
  const result = majorityElement([3, 2, 3])

  it('example case', () => {
    expect(result).toEqual(3)
  })
})
