import { describe, it, expect } from '@jest/globals'
import { NewLineKind } from 'typescript'

function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b)

  const quadruples: number[][] = []

  for (let fixedA = 0; fixedA < nums.length; fixedA++) {
    if (fixedA > 0 && nums[fixedA] === nums[fixedA - 1]) {
      continue
    }

    for (let fixedB = fixedA + 1; fixedB < nums.length; fixedB++) {
      if (fixedB > fixedA + 1 && nums[fixedB] === nums[fixedB - 1]) {
        continue
      }

      let sumAB = nums[fixedA]! + nums[fixedB]!
      let left = fixedB + 1
      let right = nums.length - 1

      while (left < right) {
        const sum = sumAB + nums[left]! + nums[right]!

        if (sum <= target) {
          if (sum === target) {
            quadruples.push([nums[fixedA]!, nums[fixedB]!, nums[left]!, nums[right]!])
          }
          left += 1

          while (left < right && nums[left] === nums[left - 1]) {
            left += 1
          }
        } else {
          right -= 1
        }
      }
    }
  }

  return quadruples
}

describe('example desc', () => {
  it('desc 0', () => {
    const result = fourSum([1, 0, -1, 0, -2, 2], 0)
    expect(result).toEqual([
      [-2, -1, 1, 2],
      [-2, 0, 0, 2],
      [-1, 0, 0, 1],
    ])
  })
})
