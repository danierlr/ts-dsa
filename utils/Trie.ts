export class TrieNode {
  public readonly children = new Map<string, TrieNode>()
  public isEnd: boolean = false
}

export class Trie {
  private root: TrieNode | null = null

  public add(value: string) {
    if (this.root === null) {
      this.root = new TrieNode()
    }

    let node = this.root

    for (let i = 0; i < value.length; i += 1) {
      const char = value[i]!

      let childNode = node.children.get(char)

      if (!childNode) {
        childNode = new TrieNode()
        node.children.set(char, childNode)
      }

      node = childNode
    }

    node.isEnd = true
  }

  public findNode(prefix: string): TrieNode | null {
    let node = this.root

    let i = 0

    while (node !== null && i < prefix.length) {
      const char = prefix[i]!

      node = node.children.get(char) ?? null

      i += 1
    }

    return node
  }

  public *wordsWithPrefix(prefix: string): Generator<string> {
    const node = this.findNode(prefix)

    if (!node) {
      return
    }

    function* dfs(node: TrieNode, path: string): Generator<string> {
      if (node.isEnd) {
        yield path
      }

      for (const [char, child] of node.children) {
        yield* dfs(child, path + char)
      }
    }

    yield* dfs(node, prefix)
  }

  public has(value: string) {
    const node = this.findNode(value)

    return Boolean(node) && node!.isEnd
  }
}
