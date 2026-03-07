function triangleNumber(nums: number[]): number {
	let numTriangles = 0
	nums.sort((a, b) => a - b)

	for (let fixed = 2; fixed < nums.length; fixed++){
		// if(nums[fixed] == nums[fixed - 1]){
		// 	continue
		// }

		let left = 0
		let right = fixed - 1

		while(left < right){
			const length = nums[left]! + nums[right]!
			if (length > nums[fixed]!) {
        numTriangles += right - left

        right -= 1

        // while (left < right && nums[left + 1] === nums[left]) {
        //   left += 1
        // }
      } else  {
        left += 1
      }
		}
	}

	return numTriangles
}


describe('Two Sum', () => {
  it('desc 0', () => {
    const result = triangleNumber([2, 2, 3, 4])
    expect(result).toEqual(3)
  })

  it('desc 1', () => {
    const result = triangleNumber([4, 2, 3, 4])
    expect(result).toEqual(4)
  })
})
