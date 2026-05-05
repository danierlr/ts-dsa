function canCompleteCircuit(gas: number[], cost: number[]): number {
  const numStations = gas.length
  let tank = 0

  let startStation = 0

  for (let station = 0; station < numStations; station += 1) {
    tank = tank + gas[station]! - cost[station]!

    if (tank < 0) {
      tank = 0
      startStation = station + 1
    }
  }

  if (startStation === numStations) {
    return -1
  }

  for (let station = 0; station < startStation; station += 1) {
    tank = tank + gas[station]! - cost[station]!

    if (tank < 0) {
      return -1
    }
  }

  return startStation
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])

    expect(res).toEqual(3)
  })

  it('desc 1', () => {
    const res = canCompleteCircuit([2, 3, 4], [3, 4, 3])

    expect(res).toEqual(-1)
  })
})
