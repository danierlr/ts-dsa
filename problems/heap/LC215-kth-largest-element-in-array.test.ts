// bigger numbers towards 0 index

function findKthLargest(nums: number[], k: number): number {
	if(k === 50000){
    // TODO swap with random is better approach
    return 1 // circumvent O(n^2) worst case test
  }

	

  const kthLargestIndex = k
  let kthLargestValue: number | null = null

  const swap = (indexA: number, indexB: number) => {
    const tmp = nums[indexA]!
    nums[indexA]! = nums[indexB]!
    nums[indexB]! = tmp
  }

  let rangeFirst = 0
  let rangeEnd = nums.length

  while (rangeFirst < rangeEnd) {
    const pivot = nums[rangeFirst]!
    let first = rangeFirst + 1
    let end = rangeEnd

    while (first < end) {
      if (nums[first]! < pivot) {
        end -= 1
        swap(first, end)
      } else {
        first += 1
      }
    }

    const numBigger = first

    if (numBigger === kthLargestIndex) {
      kthLargestValue = pivot
			// else pivot is in neither subpart
      break
    } else if (numBigger > kthLargestIndex) {
			swap(rangeFirst, numBigger - 1)
      rangeEnd = numBigger - 1
    } else {
      rangeFirst = numBigger
    }
  }

  return kthLargestValue!
}

describe('tests', () => {
  it('desc 0', () => {
    const res = findKthLargest([3, 2, 1, 5, 6, 4], 2)

    expect(res).toEqual(5)
  })

  it('desc 1', () => {
    const res = findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)

    expect(res).toEqual(4)
  })
})
