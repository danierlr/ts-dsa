interface Car {
	position: number,
	timeToDest: number
}

function carFleet(target: number, position: number[], speed: number[]): number {
	const numCars = position.length

	const cars: Car[] = position
		.map((_, index) => ({
	    position: position[index]!,
	    timeToDest: (target - position[index]!) / speed[index]!,
	  }))
		.sort((a, b) => {
			return a.position - b.position
		})



  let carIndex = numCars - 1
  let packLeadTime: number = 0
  let numPacks = 0

  while (carIndex >= 0) {
		packLeadTime = cars[carIndex]!.timeToDest
    numPacks += 1

    while (carIndex >= 0 && cars[carIndex]!.timeToDest <= packLeadTime) {
      carIndex -= 1
    }
  }

  return numPacks
}

describe('tests', () => {
  it('desc 0', () => {
		const res = carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])

    expect(res).toEqual(3)
  })
})
