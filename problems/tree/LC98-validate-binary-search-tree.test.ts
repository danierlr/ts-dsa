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

function isValidBST(root: TreeNode | null): boolean {
  const checkChildren = (
    node: TreeNode | null,
    minVal: number | null,
    maxVal: number | null
  ): boolean => {
    if (!node) {
      return true
    }

		if(minVal !== null && node.val < minVal){
			return false
		}

		if (maxVal !== null && node.val > maxVal) {
      return false
    }

    if (node.left) {
			const valid = checkChildren(node.left, minVal, node.val - 1)

			if(!valid){
				return false
			}
    }
		
		if(node.right){
			const valid = checkChildren(node.right, node.val + 1, maxVal)

      if (!valid) {
        return false
      }
		}

    return true
  }

  return checkChildren(root, null, null)
}

describe('example desc', () => {
  it('desc 1', () => {
    const n1 = new TreeNode(1, null, null)
    const n3 = new TreeNode(3, null, null)
    const n6 = new TreeNode(6, null, null)
    const n4 = new TreeNode(4, n3, n6)
    const n5 = new TreeNode(5, n1, n4)

    const result = isValidBST(n5)
    expect(result).toEqual(false)
  })
})
