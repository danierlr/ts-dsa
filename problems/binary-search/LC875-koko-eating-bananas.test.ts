function minEatingSpeed(piles: number[], h: number): number {
  const maxHours = h
  let maxPile = piles[0]!

  for (let pile of piles) {
    maxPile = Math.max(maxPile, pile)
  }

  const checkIsFastEnough = (speed: number): boolean => {
    let numHours = 0
    let pileIndex = 0

    while (pileIndex < piles.length && numHours < maxHours) {
      const hours = Math.ceil(piles[pileIndex]! / speed)
      numHours += hours

      pileIndex += 1
    }

    return pileIndex === piles.length && numHours <= maxHours
  }

  let startSpeed = 0 // min - 1 for convenience
  let maxSpeed = maxPile

	if(piles.length === 1){
		return Math.ceil(piles[0]! / maxHours)
	}

  while (startSpeed + 1 < maxSpeed) {
    const midSpeed = Math.floor((startSpeed + maxSpeed) / 2)

    const fastEnough = checkIsFastEnough(midSpeed)

    if (fastEnough) {
      maxSpeed = midSpeed
    } else {
      startSpeed = midSpeed
    }
  }

  return maxSpeed
}

describe('tests', () => {
  it('desc 0', () => {
    const res = minEatingSpeed([3, 6, 7, 11], 8)

    expect(res).toEqual(4)
  })

	it('desc 1', () => {
    const res = minEatingSpeed([30, 11, 23, 4, 20], 5)

    expect(res).toEqual(30)
  })

	it('desc 2', () => {
    const res = minEatingSpeed([30, 11, 23, 4, 20], 6)

    expect(res).toEqual(23)
  })
})
