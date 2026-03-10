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

function pathSum(root: TreeNode | null, targetSum: number): number {
	// key = some sum; value = how many paths for that sum in current branch
	const sumToCount = new Map<number, number>()
	let pathCount = 0
	let sumFromRoot = 0

	if(root === null){
		return 0
	}

	sumToCount.set(0, 1)

	const traverse = (node: TreeNode) => {
		sumFromRoot += node.val
		const wantedPrefixCount = sumFromRoot - targetSum
		const count = sumToCount.get(wantedPrefixCount)

		if(count !== undefined){
			pathCount += count
		}

		const existingCount = sumToCount.get(sumFromRoot)

		if(existingCount === undefined){
			sumToCount.set(sumFromRoot, 1)
		} else {
			sumToCount.set(sumFromRoot, existingCount + 1)
		}

		if(node.left){
			traverse(node.left)
		}

		if(node.right){
			traverse(node.right)
		}

		if(existingCount === undefined){
			sumToCount.delete(sumFromRoot)
		} else {
			sumToCount.set(sumFromRoot, existingCount)
		}

		sumFromRoot -= node.val
	}

	traverse(root)

	return pathCount
}

describe('example desc', () => {
  it('desc 0', () => {

		const n0 = new TreeNode(3, null, null)
		const n1 = new TreeNode(-2, null, null)
		const n2 = new TreeNode(3, n0, n1)
		const n3 = new TreeNode(1, null, null)
		const n4 = new TreeNode(2, null, n3)
		const n5 = new TreeNode(5, n2, n4)
		const n6 = new TreeNode(11, null, null)
		const n7 = new TreeNode(-3, null, n6)
		const n8 = new TreeNode(10, n5, n7)

    const result = pathSum(n8, 8)
    expect(result).toEqual(3)
  })
})
