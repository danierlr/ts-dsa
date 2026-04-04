import { describe, it, expect } from '@jest/globals'

import { TreeNode } from '@/utils/Tree'

function maxPathSum(root: TreeNode | null): number {
  let maxSum = -1001

  const traverse = (node: TreeNode | null): number => {
    if (!node) {
      return 0
    }

    const leftSum = traverse(node.left)
    const rightSum = traverse(node.right)

    const lrSum = leftSum + rightSum + node.val
    maxSum = Math.max(maxSum, lrSum)

    const upMax = Math.max(leftSum, rightSum, 0) + node.val
    maxSum = Math.max(maxSum, upMax)

    return upMax
  }

  traverse(root)

  return maxSum
}

describe('example desc', () => {
  it('desc 0', () => {
    // const result = maxPathSum([1, 2, 3])
    expect(1).toEqual(1)
  })
})
