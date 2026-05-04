import { Trie, TrieNode } from '@/utils/Trie'

type Vec = {
  x: number
  y: number
}

const toStr = (vec: Vec) => `${vec.x}_${vec.y}`

function findWords(board: string[][], words: string[]): string[] {
  const endX = board.length
  const endY = board[0]!.length

  const matchedWords = new Set<string>()

  const trie = new Trie()

  for (let word of words) {
    trie.add(word)
  }

  const included = new Set<string>()

  const charStack: string[] = []

  const findWord = (vec: Vec, trieNode: TrieNode) => {
    if (vec.x < 0 || vec.x >= endX || vec.y < 0 || vec.y >= endY) {
      return
    }

    const xyKey = toStr(vec)

    if (included.has(xyKey)) {
      return
    }

    const char = board[vec.x]![vec.y]!

    const nextNode = trieNode.children.get(char)

    if (!nextNode) {
      return
    }

    charStack.push(char)

    if (nextNode.isEnd) {
      const word = charStack.join('')
      matchedWords.add(word)
    }

    included.add(xyKey)

    findWord({ x: vec.x - 1, y: vec.y }, nextNode)
    findWord({ x: vec.x, y: vec.y - 1 }, nextNode)
    findWord({ x: vec.x + 1, y: vec.y }, nextNode)
    findWord({ x: vec.x, y: vec.y + 1 }, nextNode)

    charStack.pop()
    included.delete(xyKey)
  }

  const root = trie.findNode('')

  for (let x = 0; x < endX; x += 1) {
    for (let y = 0; y < endY; y += 1) {
      if (!root) {
        break
      }

      findWord({ x, y }, root)
    }
  }

  return Array.from(matchedWords)
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = findWords(
      [
        ['o', 'a', 'a', 'n'],
        ['e', 't', 'a', 'e'],
        ['i', 'h', 'k', 'r'],
        ['i', 'f', 'l', 'v'],
      ],
      ['oath', 'pea', 'eat', 'rain']
    ).sort()

    expect(res).toEqual(['eat', 'oath'].sort())
  })

  it('desc 1', () => {
    const res = findWords(
      [
        ['a', 'b'],
        ['c', 'd'],
      ],
      ['abcb']
    ).sort()

    expect(res).toEqual([].sort())
  })
})
