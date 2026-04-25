function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const subsetNums = nums1
	const nums = nums2

	const nextGreatestByValue = new Map<number, number>()

	const indexes: number[] = []

	for(let i = 0; i < nums.length; i += 1){
		while(indexes.length > 0 && nums[i] > nums[indexes[indexes.length - 1]]){
			const smallerIndex = indexes.pop()

			nextGreatestByValue.set(nums[smallerIndex], nums[i])
		}

		indexes.push(i)
	}

	const res: number[] = []

	for(let i = 0; i < subsetNums.length; i += 1){
		res.push(nextGreatestByValue.get(subsetNums[i]) ?? -1)
	}

	return res
};

describe('tests', () => {
  it('desc 0', () => {
		const res = nextGreaterElements([4,1,2], [1,3,4,2])
    expect(res).toEqual([-1,3,-1])
  })

	it('desc 0', () => {
    const res = nextGreaterElements([2,4], [1,2,3,4])
    expect(res).toEqual([3,-1])
  })
})
