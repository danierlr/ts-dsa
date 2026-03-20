import { describe, it, expect } from '@jest/globals'

import { TreeNode, treeToArray } from '@/utils/Tree'

function sortedArrayToBST(nums: number[]): TreeNode | null {
  const findSubtree = (start: number, end: number): TreeNode | null => {
    if (end <= start) {
      return null
    }

    const mid = start + Math.floor((end - start) / 2)

    const node: TreeNode = {
      left: null,
      right: null,
      val: nums[mid]!,
    }

    node.left = findSubtree(start, mid)
    node.right = findSubtree(mid + 1, end)

    return node
  }

  return findSubtree(0, nums.length)
}

describe('example desc', () => {
  it('desc 0', () => {
    const tree = sortedArrayToBST([-10, -3, 0, 5, 9])
    const array = treeToArray(tree)

    console.log('array', array)

    expect(1).toEqual(1)
  })
})
