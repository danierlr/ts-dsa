import { describe, it, expect } from '@jest/globals'

function subarraySum(nums: number[], k: number): number {
    const prefixSumCounts = new Map<number, number>() // key = prefix sum, value = count

		let sum = 0
		let subArrayCount = 0

		prefixSumCounts.set(0, 1)

		for(let num of nums){
			sum += num

			const wantedPrefix = sum - k

			const count = prefixSumCounts.get(wantedPrefix)

			if(count !== undefined){
				subArrayCount += count
			}

			const prefixCount = prefixSumCounts.get(sum)
			if (prefixCount === undefined) {
        prefixSumCounts.set(sum, 1)
      } else {
        prefixSumCounts.set(sum, prefixCount + 1)
      }
		}

		return subArrayCount
};

describe('example desc', () => {
	it('desc 0', () => {
		const result = subarraySum([1, 1, 1], 2)
		expect(result).toEqual(2)
	})

	it('desc 1', () => {
		const result = subarraySum([1, 2, 3], 3)
		expect(result).toEqual(2)
	})
})
