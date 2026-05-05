// old solution

function canJump(nums: number[]): boolean {
  let jumpingDistance: number = nums[0]!
  let i = 0

  while (i < nums.length - 1 && jumpingDistance > 0) {
    i += 1
    jumpingDistance -= 1

    jumpingDistance = Math.max(jumpingDistance, nums[i]!)
  }

  return i === nums.length - 1
}

describe('example desc', () => {
  it('desc 0', () => {
    expect(1).toEqual(1)
  })
})
