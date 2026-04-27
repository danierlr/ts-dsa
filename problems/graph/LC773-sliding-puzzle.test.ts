import { Queue } from '@/utils/Queue'

// 012345
// 0 1 2
// 3 4 5

type Permutation = {
  indexA: number
  indexB: number
}

const permutate = (value: string, permutation: Permutation): string => {
  let { indexA, indexB } = permutation

  if (indexA > indexB) {
    const tmp = indexA
    indexA = indexB
    indexB = tmp
  }

  const permutated = `${value.slice(0, indexA)}${value[indexB]}${value.slice(indexA + 1, indexB)}${value[indexA]}${value.slice(indexB + 1, value.length)}`

  return permutated
}

const permutations: Permutation[] = [
  {
    indexA: 0,
    indexB: 3,
  },
  {
    indexA: 1,
    indexB: 4,
  },
  {
    indexA: 2,
    indexB: 5,
  },
  {
    indexA: 0,
    indexB: 1,
  },
  {
    indexA: 1,
    indexB: 2,
  },
  {
    indexA: 3,
    indexB: 4,
  },
  {
    indexA: 4,
    indexB: 5,
  },
]

function slidingPuzzle(board: number[][]): number {
  const row0 = board[0]!
  const row1 = board[1]!

  const toStr = (boardElems: number[]) => boardElems.map((elem) => elem.toString()).join('')

  const initial = toStr([row0[0]!, row0[1]!, row0[2]!, row1[0]!, row1[1]!, row1[2]!])
  const wanted = '123450'

  const visited = new Set<string>()
  const frontier = new Queue<string>()

  frontier.enqueue(initial)
  visited.add(initial)

  let numMoves = 0

  while (frontier.size > 0) {
    let numMovePermutations = frontier.size
    for (let i = 0; i < numMovePermutations; i++) {
      const current = frontier.dequeue()!

      if (current === wanted) {
        return numMoves
      }

      const index0 = current.indexOf('0')
      const possiblePermutations = permutations.filter(
        (p) => p.indexA === index0 || p.indexB === index0
      )

      for (let permutation of possiblePermutations) {
        const permutated = permutate(current, permutation)

        if (visited.has(permutated)) {
          continue
        }

        visited.add(permutated)
        frontier.enqueue(permutated)
      }
    }

    numMoves += 1
  }

  return -1
}

describe('tests', () => {
  it('desc 0', () => {
    const res = slidingPuzzle([
      [1, 2, 3],
      [4, 0, 5],
    ])

    expect(res).toEqual(1)
  })

  it('desc 1', () => {
    const res = slidingPuzzle([
      [1, 2, 3],
      [5, 4, 0],
    ])

    expect(res).toEqual(-1)
  })

  it('desc 2', () => {
    const res = slidingPuzzle([
      [4, 1, 2],
      [5, 0, 3],
    ])

    expect(res).toEqual(5)
  })
})
