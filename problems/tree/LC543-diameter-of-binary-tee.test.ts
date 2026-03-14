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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0

	const checkDiameter = (node: TreeNode | null): number => {
		if(node === null){
			return 0
		}

		const leftDepth = checkDiameter(node.left)
		const rightDepth = checkDiameter(node.right)
		
		diameter = Math.max(diameter, leftDepth + rightDepth)
		return Math.max(leftDepth, rightDepth) + 1
	}
	
  checkDiameter(root)

	return diameter
}

describe('example desc', () => {
	it('desc 0', () => {
		const n5 = new TreeNode(5, null, null)
		const n4 = new TreeNode(4, null, null)
		const n3 = new TreeNode(3, null, null)
		const n2 = new TreeNode(2, n4, n5)
		const n1 = new TreeNode(1, n2, n3)


		const result = diameterOfBinaryTree(n1)
		expect(result).toEqual(3)
	})
})
