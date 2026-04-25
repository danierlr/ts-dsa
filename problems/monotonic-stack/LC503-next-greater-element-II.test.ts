function nextGreaterElements(nums: number[]): number[] {
	const decrValuesIndexes: number[] = []
	const nextBiggerValues = Array(nums.length).fill(-1)

	const traverse = (index: number) => {
		while(decrValuesIndexes.length > 0 && nums[index] > nums[decrValuesIndexes[decrValuesIndexes.length - 1]]){
			const prevSmallerIndex = decrValuesIndexes.pop()

			nextBiggerValues[prevSmallerIndex] = nums[index]
		}

		decrValuesIndexes.push(index)
	}

	for(let i = 0; i < nums.length; i += 1){
		traverse(i)
	}

	for(let i = 0; i < nums.length; i += 1){
		traverse(i)
	}

	return nextBiggerValues
}

describe('tests', () => {
  it('desc 0', () => {
		const res = nextGreaterElements([1, 2, 1])
    expect(res).toEqual([2, -1, 2])
  })

	it('desc 0', () => {
    const res = nextGreaterElements([1, 2, 3, 4, 3])
    expect(res).toEqual([2, 3, 4, -1, 4])
  })
})
