function canPartition(nums: number[]): boolean {
  let sum = nums.reduce((currSum, currValue) => currSum + currValue, 0)

  if (sum % 2 === 1) {
    return false
  }

  sum = sum / 2

  const sumPossible: boolean[] = Array<boolean>(sum + 1).fill(false) // [x] means x is achievable

  sumPossible[0] = true

  for (let num of nums) {
    for (let currSum = sum; currSum >= num; currSum -= 1) {
      const prevSum = currSum - num

      sumPossible[currSum] = sumPossible[currSum]! || sumPossible[prevSum]!
    }
  }

  return sumPossible[sum]!
}

describe('tests', () => {
  it('desc 0', () => {
    const res = canPartition([1, 5, 11, 5])

    expect(res).toEqual(true)
  })

  it('desc 1', () => {
    const res = canPartition([1, 2, 3, 5])

    expect(res).toEqual(false)
  })

  it('test 0', () => {
    const res = canPartition([1, 2, 5])

    expect(res).toEqual(false)
  })

  it('test 1', () => {
    const res = canPartition([100])

    expect(res).toEqual(false)
  })
})
