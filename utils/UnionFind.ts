type Node<T> = {
  value: T
  parent: Node<T> | null
  rank: number
}

export class UnionFind<T> {
  private nodes: Map<T, Node<T>> = new Map()
  private _count: number

  constructor(initialRoots: T[]) {
    initialRoots.forEach((root) => {
      const node = {
        value: root,
        parent: null,
        rank: 0,
      }

      this.nodes.set(root, node)
    })

    this._count = initialRoots.length
  }

  private findNode(value: T): Node<T> {
    let node: Node<T> | null = this.nodes.get(value) ?? null

    if (node === null) {
      throw new Error('Invalid operation - can not find node')
    }

		let root = node

		while(root.parent !== null){
			root = root.parent
		}

		while(node !== root){
			const current: Node<T> = node!
			const parent: Node<T> = node!.parent!
			current.parent = root

			node = parent
		}

    return node!
  }

  public find(value: T): T {
    const node = this.findNode(value)

    return node.value
  }

	/**
	 * 
	 * @param valueA 
	 * @param valueB 
	 * @returns whether two groups have been merged
	 */
  public union(valueA: T, valueB: T): boolean {
    let nodeRoot = this.findNode(valueA)
    let nodeMerged = this.findNode(valueB)

		if (nodeRoot === nodeMerged) {
      return false
    }

		if(nodeMerged.rank > nodeRoot.rank){
			const nodeTmp = nodeMerged
			nodeMerged = nodeRoot
			nodeRoot = nodeTmp
		}

		nodeMerged.parent = nodeRoot

		if(nodeRoot.rank === nodeMerged.rank){
			nodeRoot.rank += 1
		}

		this._count -= 1

		return true
  }

  public connected(valueA: T, valueB: T): boolean {
    return this.find(valueA) === this.find(valueB)
  }

  public get count(): number {
    return this._count
  }
}
