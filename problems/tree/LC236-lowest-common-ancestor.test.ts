import { describe, it, expect } from '@jest/globals'

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  const parents = new Set<TreeNode>()

  const nodeToParent = new Map<TreeNode, TreeNode | null>()

  const updateParent = (node: TreeNode | null) => {
    if (!node) {
      return
    }

    if (node.left) {
      nodeToParent.set(node.left, node)
      updateParent(node.left)
    }

    if (node.right) {
      nodeToParent.set(node.right, node)
      updateParent(node.right)
    }
  }

	updateParent(root)

  let node = p

  while (node !== null) {
    parents.add(node)

    node = nodeToParent.get(node) ?? null
  }

	node = q

	while(node !== null){
		if (parents.has(node)) {
      return node
    }

		node = nodeToParent.get(node) ?? null
	}

	return null
}

describe('example desc', () => {
  it('desc 0', () => {
    const n8 = new TreeNode(4, null, null)
    const n7 = new TreeNode(7, null, null)
    const n6 = new TreeNode(8, null, null)
    const n5 = new TreeNode(0, null, null)
    const n4 = new TreeNode(2, n7, n8)
    const n3 = new TreeNode(6, null, null)
    const n2 = new TreeNode(1, n5, n6)
    const n1 = new TreeNode(5, n3, n4)
    const n0 = new TreeNode(3, n1, n2)

    const result = lowestCommonAncestor(n0, n1, n2)
    expect(result?.val).toEqual(3)
  })
})
