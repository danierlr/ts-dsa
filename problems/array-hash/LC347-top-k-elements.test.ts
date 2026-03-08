import { describe, it, expect } from '@jest/globals'

function topKFrequent(nums: number[], k: number): number[] {
  const topK: number[] = []

  const frequencies = new Map<number, number>()

  nums.forEach((num) => {
    const frequency = frequencies.get(num)
    if (frequency === undefined) {
      frequencies.set(num, 1)
    } else {
      frequencies.set(num, frequency + 1)
    }
  })

  const buckets: number[][] = Array(nums.length)

  for (let i = 0; i <= nums.length; i++) {
    buckets[i] = []
  }

  frequencies.forEach((frequency, num) => {
    buckets[frequency]!.push(num)
  })

  for (let i = nums.length; i >= 0; i -= 1) {
    for (let num of buckets[i]!) {
      topK.push(num)

      if (topK.length >= k) {
        break
      }
    }

    if (topK.length >= k) {
      break
    }
  }

  return topK
}

describe('example desc', () => {
  

  it('example case', () => {
		const result = topKFrequent([1, 1, 1, 2, 2, 3], 2)
    expect(result).toEqual([1, 2])
  })

	it('1 case', () => {
		const result = topKFrequent([1], 1)
    expect(result).toEqual([1])
  })
})
