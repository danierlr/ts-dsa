function dailyTemperatures(temperatures: number[]): number[] {
	const numDays = temperatures.length
	const waitDays: number[] = new Array(temperatures.length).fill(0)

	const prevHotterDaysIndexes: number[] = []

	for(let dayIndex = 0; dayIndex < numDays; dayIndex += 1){
		const currentTemp = temperatures[dayIndex]!

		while (
      prevHotterDaysIndexes.length > 0 &&
      currentTemp > temperatures[prevHotterDaysIndexes[prevHotterDaysIndexes.length - 1]!]!
    ) {
      const prevIndex = prevHotterDaysIndexes.pop()!

      waitDays[prevIndex] = dayIndex - prevIndex
    }

		prevHotterDaysIndexes.push(dayIndex)
	}

	return waitDays
}



describe('tests', () => {
  const res = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])

  it('desc 0', () => {
    expect([1, 1, 4, 2, 1, 1, 0, 0]).toEqual(res)
  })
})
