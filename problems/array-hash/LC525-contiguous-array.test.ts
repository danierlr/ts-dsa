import { describe, it, expect } from '@jest/globals'
import { NewLineKind } from 'typescript'

function findMaxLength(nums: number[]): number {
  const sumToIndex = new Map<number, number>()

  let maxLength = 0
  let currentSum = 0

  sumToIndex.set(0, -1)

  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i]
    currentSum += num === 0 ? -1 : 1

    const prefixIndex = sumToIndex.get(currentSum)

    if (prefixIndex === undefined) {
      sumToIndex.set(currentSum, i)
    } else {
      maxLength = Math.max(maxLength, i - prefixIndex)
    }
  }

  return maxLength
}

describe('example desc', () => {
  it('desc 0', () => {
    const result = findMaxLength([0, 1])
    expect(result).toEqual(2)
  })

  it('desc 1', () => {
    const result = findMaxLength([0, 1, 0])
    expect(result).toEqual(2)
  })

  it('desc 2', () => {
    const result = findMaxLength([0, 1, 1, 1, 1, 1, 0, 0, 0])
    expect(result).toEqual(6)
  })
})
