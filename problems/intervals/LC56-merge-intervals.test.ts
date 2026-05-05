function merge(intervals: number[][]): number[][] {
  const merged: number[][] = []

  intervals.sort((a, b) => a[0]! - b[0]!)

  let start = intervals[0]![0]!
  let end = intervals[0]![1]!

  for (let i = 1; i < intervals.length; i += 1) {
    const interval = intervals[i]!

    const currStart = interval[0]!
    const currEnd = interval[1]!

    if (currStart > end) {
      merged.push([start, end])
      start = currStart
      end = currEnd
    }

    end = Math.max(end, currEnd)
  }

  merged.push([start, end])

  return merged
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = merge([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ])

    expect(res).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ])
  })

  it('desc 1', () => {
    const res = merge([
      [1, 4],
      [4, 5],
    ])

    expect(res).toEqual([[1, 5]])
  })

  it('desc 3', () => {
    const res = merge([
      [4, 7],
      [1, 4],
    ])

    expect(res).toEqual([[1, 7]])
  })
})
