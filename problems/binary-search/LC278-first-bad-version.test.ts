var solution = function (isBadVersion: any) {
  return function (n: number): number {
    let first = 0
    let end = n

    while (first < end) {
      const mid = Math.floor((first + end) / 2)

      if (isBadVersion(mid)) {
        end = mid
      } else {
        first = mid + 1
      }
    }

    return first
  }
}

describe('tests', () => {
  it('desc 0', () => {
    expect(1).toEqual(1)
  })
})
