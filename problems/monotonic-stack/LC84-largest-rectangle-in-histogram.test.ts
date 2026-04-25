type Entry = {
	index: number,
	height: number,
}

function largestRectangleArea(heights: number[]): number {
	const smallerStack: Entry[] = [] // increasing
	let maxArea = 0

	heights.push(0)

	for(let index = 0; index < heights.length; index += 1){

		let lastUnwind: Entry | null = null

		while (
      smallerStack.length > 0 &&
      heights[index]! < smallerStack[smallerStack.length - 1]!.height
    ) {
      const prevEntry = smallerStack.pop()!
      const prevArea = (index - prevEntry.index) * prevEntry.height

      maxArea = Math.max(maxArea, prevArea)

			lastUnwind = prevEntry
    }

		if(lastUnwind === null){
			smallerStack.push({
        index,
        height: heights[index]!,
      })
		} else {
			smallerStack.push({
        index: lastUnwind.index,
        height: heights[index]!,
      })
		}

		maxArea = Math.max(maxArea, heights[index]!)
	}

	return maxArea
}

describe('tests', () => {
	
  it('desc 0', () => {
		const res = largestRectangleArea([2, 1, 5, 6, 2, 3])
    expect(res).toEqual(10)
  })

  it('test 0', () => {
    const res = largestRectangleArea([2, 1, 2])
    expect(res).toEqual(3)
  })
})


// [2,1,5,6,2,3]