import { Trie as TrieStructure } from '@/utils/Trie'

class Trie {
  private trie = new TrieStructure()

  constructor() {}

  insert(word: string): void {
    this.trie.insert(word)
  }

  search(word: string): boolean {
    return this.trie.has(word)
  }

  startsWith(prefix: string): boolean {
    const gen = this.trie.wordsWithPrefix(prefix)

    const first = gen.next().value

    return Boolean(first)
  }
}

describe('example desc', () => {
  it('desc 0', () => {
    const trie = new Trie()

    expect(res).toEqual([])
  })
})
