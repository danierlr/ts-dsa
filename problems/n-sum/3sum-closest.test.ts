import { describe, it, expect } from '@jest/globals'

function threeSumClosest(nums: number[], target: number): number {
  let result = nums[0]! + nums[1]! + nums[2]!

	nums.sort((a, b) => a - b)

  for (let fixed = 0; fixed < nums.length; fixed++) {
		if(fixed > 0 && nums[fixed] === nums[fixed - 1]){
			fixed += 1
			continue
		}

    let left = fixed + 1
    let right = nums.length - 1

		while(left < right){
			const sum = nums[fixed]! + nums[left]! + nums[right]!

			if(Math.abs(sum - target) < Math.abs(result - target)){
				result = sum
			}

			if(sum === target){
				break
			} else if(sum > target){
				right -= 1
			} else {
				left += 1
			}
		}
  }

  return result
}

describe('Two Sum', () => {
  it('desc 0', () => {
    const result = threeSumClosest([-1, 2, 1, -4], 1)
    expect(result).toEqual(2)
  })

  it('failing 0', () => {
    const result = threeSumClosest([4, 0, 5, -5, 3, 3, 0, -4, -5], -2)
    expect(result).toEqual(-2)
  })
})
