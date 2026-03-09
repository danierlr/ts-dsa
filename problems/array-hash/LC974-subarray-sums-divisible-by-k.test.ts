import { describe, it, expect } from '@jest/globals'

function subarraysDivByK(nums: number[], k: number): number {
  const mod = (n: number, m: number) => {
		return ((n % m) + m) % m
	}

  const remainderToCount = new Map<number, number>()

  let numSubArrays = 0

  let sum = 0

  remainderToCount.set(0, 1)

  for (let index = 0; index < nums.length; index += 1) {
    sum += nums[index]!

    const remainder = mod(sum, k)
    const wantedRemainderPrefix = remainder

    const prevArrCount = remainderToCount.get(wantedRemainderPrefix)

    if (prevArrCount !== undefined) {
      numSubArrays += prevArrCount
    }

    const remainderCount = remainderToCount.get(remainder)
    if (remainderCount) {
      remainderToCount.set(remainder, remainderCount + 1)
    } else {
      remainderToCount.set(remainder, 1)
    }
  }

  return numSubArrays
}

describe('example desc', () => {
  it('desc 0', () => {
    const result = subarraysDivByK([4, 5, 0, -2, -3, 1], 5)
    expect(result).toEqual(7)
  })

  it('desc 1', () => {
    const result = subarraysDivByK([5], 9)
    expect(result).toEqual(0)
  })

	 it('jug 0', () => {
     const result = subarraysDivByK([-1, 2, 9], 2)
     expect(result).toEqual(2)
   })
})
