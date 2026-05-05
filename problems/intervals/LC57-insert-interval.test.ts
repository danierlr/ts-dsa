function insert(intervals: number[][], newInterval: number[]): number[][] {
  let first: number = 0
  let end: number = intervals.length

  // newInterval.start > interval[x] then merged

  while (first < end) {
    const mid = Math.floor((first + end) / 2)

    if (intervals[mid]![0]! > newInterval[0]!) {
      end = mid
    } else {
      first = mid + 1
    }
  }

  let index = first - 1
  let resIntervals: number[][] = []

  let insStart = newInterval[0]!
  let insEnd = newInterval[1]!

  if (index >= 0) {
    resIntervals = intervals.slice(0, index)

    const prevInterval = intervals[index]!

    if (prevInterval[1]! < insStart) {
      resIntervals.push(prevInterval)
    } else {
      insStart = prevInterval[0]!
      insEnd = Math.max(insEnd, prevInterval[1]!)
    }

    index += 1
  } else {
    index = 0
  }

  while (index < intervals.length && insEnd >= intervals[index]![0]!) {
    insEnd = Math.max(insEnd, intervals[index]![1]!)
    index += 1
  }

  resIntervals.push([insStart, insEnd])

  for (let i = index; i < intervals.length; i += 1) {
    resIntervals.push(intervals[i]!)
  }

  return resIntervals
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = insert(
      [
        [1, 3],
        [6, 9],
      ],
      [2, 5]
    )

    expect(res).toEqual([
      [1, 5],
      [6, 9],
    ])
  })

  it('desc 1', () => {
    const res = insert(
      [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
        [12, 16],
      ],
      [4, 8]
    )

    expect(res).toEqual([
      [1, 2],
      [3, 10],
      [12, 16],
    ])
  })
})
