function coinChange(coins: number[], amount: number): number {
  let countsByAmount = new Array<number | null>(amount + 1).fill(null)

	countsByAmount[0] = 0

  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    for (let coin of coins) {
      const prevAmount = currentAmount - coin

      if (prevAmount < 0 || countsByAmount[prevAmount] === null) {
        continue
      }

      if (countsByAmount[currentAmount] === null) {
        countsByAmount[currentAmount] = countsByAmount[prevAmount]! + 1
      } else {
        countsByAmount[currentAmount] = Math.min(
          countsByAmount[currentAmount]!,
          countsByAmount[prevAmount]! + 1
        )
      }
    }
  }

  return countsByAmount[amount] ?? -1
}

describe('tests', () => {
  it('desc 0', () => {
    const res = coinChange([1, 2, 5], 11)

    expect(res).toEqual(3)
  })
})
