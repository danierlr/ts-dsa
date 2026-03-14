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

function levelOrder(root: TreeNode | null): number[][] {
	const allValues: number[][] = []

	const traverse = (node: TreeNode | null, level: number) => {
		if(node === null){
			return
		}

		const levelValues = allValues[level] || []
		allValues[level] = levelValues
		
		levelValues.push(node.val)

		traverse(node.left, level + 1)
		traverse(node.right, level + 1)
	}

	traverse(root, 0)

	return allValues
}

describe('example desc', () => {
  it('desc 0', () => {
    const n1 = new TreeNode(9, null, null)

    const n3 = new TreeNode(15, null, null)
    const n4 = new TreeNode(7, null, null)

    const n2 = new TreeNode(20, n3, n4)
    const n0 = new TreeNode(3, n1, n2)

    const result = levelOrder(n0)
    expect(result).toEqual([[3], [9, 20], [15, 7]])
  })
})
