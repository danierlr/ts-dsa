function firstMissingPositive(nums: number[]): number {
	for(let i = 0; i < nums.length; i += 1){
		let num = nums[i]!

		while(num != i + 1){
			
		}
	}
}

describe('tests', () => {
  it('desc 0', () => {
    const res = firstMissingPositive([1, 2, 0])

    expect(res).toEqual(3)
  })
})
