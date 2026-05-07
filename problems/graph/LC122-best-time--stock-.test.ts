import { describe, it, expect } from '@jest/globals'
import { Queue } from '@/utils/Queue'

function maxProfit(prices: number[]): number {
    
};

describe('tests', () => {
	it('desc 0', () => {
		const res = maxProfit([7, 1, 5, 3, 6, 4])

		expect(res).toEqual(7)
	})

	it('desc 1', () => {
		const grid = [(['0', '1', '0'], ['1', '0', '1'], ['0', '1', '0'])]

		const res = numIslands(grid)

		expect(res).toEqual(4)
	})
})
