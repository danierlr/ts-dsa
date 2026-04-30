import { describe, it, expect } from '@jest/globals'

import { Queue } from '@/utils/Queue'

import { TreeNode, treeToArray } from '@/utils/Tree'

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  const stack: TreeNode[] = []

  let root: TreeNode | null = null

  for (let num of nums) {
    let node: TreeNode = {
      val: num,
      left: null,
      right: null,
    }

    let localRoot: TreeNode | null = stack.length > 0 ? stack[stack.length - 1]! : null
    let smallerSubtree: TreeNode | null = null

    while (localRoot != null && localRoot.val < node.val) {
      smallerSubtree = stack.pop()!
      localRoot = stack.length > 0 ? stack[stack.length - 1]! : null
    }

    node.left = smallerSubtree

    if (localRoot === null) {
      root = node
    } else {
      localRoot.right = node
    }

    stack.push(node)
  }

  return root
}

describe('example desc', () => {
  it('desc 0', () => {
    const calculatedTree = constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])

    const calculatedArr = treeToArray(calculatedTree)
    expect(calculatedArr).toEqual([
      6,
      3,
      5,
      null,
      2,
      0,
      null,
      null,
      null,
      null,
      1,
      null,
      null,
      null,
      null,
    ])
  })

  it('desc 1', () => {
    const calculatedTree = constructMaximumBinaryTree([3, 2, 1])

    const calculatedArr = treeToArray(calculatedTree)
    expect(calculatedArr).toEqual([3, null, 2, null, 1])
  })

  it('cust 0', () => {
    const calculatedTree = constructMaximumBinaryTree([3, 2, 4, 8, 5, 7, 0])

    const expectedNodes = Array(9)
      .fill(null)
      .map((_, index) => new TreeNode(index, null, null))

    expectedNodes[8]!.left = expectedNodes[4]!
    expectedNodes[8]!.right = expectedNodes[7]!
    expectedNodes[4]!.left = expectedNodes[3]!
    expectedNodes[3]!.right = expectedNodes[2]!
    expectedNodes[7]!.left = expectedNodes[5]!
    expectedNodes[7]!.right = expectedNodes[0]!

    const expectedTree = expectedNodes[8]!

    const calculatedArr = treeToArray(calculatedTree)
    const expectedArr = treeToArray(expectedTree)

    expect(calculatedArr).toEqual(expectedArr)
  })
})
