function search(nums: number[], target: number): number {
  let rotationEnd = 0

  const findRotationIndex = (start: number, end: number) => {
    if (start === end || nums[start]! < nums[end - 1]!) {
      return
    }

    if (start + 3 === end) {
			findRotationIndex(start, end - 1)
			findRotationIndex(start + 1, end)
      return
    }

		if(start + 2 === end) {
			if(nums[start]! > nums[end - 1]!){
				rotationEnd = end - 1
				return
			}
		}

		if(start + 2 > end){
			throw new Error("Invalid operation: ...")
		}

    const mid = Math.floor((start + end) / 2)

		if(nums[mid]! < nums[mid - 1]!){
			rotationEnd = mid
			return
		}

    findRotationIndex(start, mid)
    findRotationIndex(mid, end)
  }

	if(nums.length > 1){
		findRotationIndex(0, nums.length)
	}

  let index: number | null = null

  const findIndex = (start: number, end: number) => {
    if (index !== null || start === end || target < nums[start]! || target > nums[end - 1]!) {
      return
    }

		if(start + 1 === end && nums[start] === target){
			index = start
			return
		}

    const mid = Math.floor((start + end) / 2)

    findIndex(start, mid)
    findIndex(mid, end)
  }

  findIndex(0, rotationEnd)
  findIndex(rotationEnd, nums.length)

  return index ?? -1
}

describe('tests', () => {
  it('desc 0', () => {
    const res = search([4, 5, 6, 7, 0, 1, 2], 0)

    expect(res).toEqual(4)
  })

  it('desc 1', () => {
    const res = search([4, 5, 6, 7, 0, 1, 2], 3)

    expect(res).toEqual(-1)
  })

  it('desc 2', () => {
    const res = search([1], 0)

    expect(res).toEqual(-1)
  })

	it('test 0', () => {
    const res = search([3, 1], 0)

    expect(res).toEqual(-1)
  })

	it('test 1', () => {
    const res = search([7, 8, 1, 2, 3, 4, 5, 6], 2)

    expect(res).toEqual(3)
  })
})
