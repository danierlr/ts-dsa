import { describe, it, expect } from '@jest/globals'

import { Queue } from '@/utils/Queue'

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

function buildTree(preorder: number[], inorder: number[]): (number | null)[] {
  const nodeByValue = new Map<number, TreeNode>()
  const inorderIndexByValue = new Map<number, number>()

  for (let i = 0; i < preorder.length; i++) {
    const node: TreeNode = {
      val: preorder[i]!,
      left: null,
      right: null,
    }

    nodeByValue.set(preorder[i]!, node)
  }

  for (let i = 0; i < inorder.length; i++) {
    inorderIndexByValue.set(inorder[i]!, i)
  }

  const findSubtree = (
    inorderStart: number,
    preorderStart: number,
    length: number
  ): TreeNode | null => {
    if (length <= 0) {
      return null
    }

    const value: number = preorder[preorderStart]!
    const inorderIndex = inorderIndexByValue.get(value)!

    const leftLength = inorderIndex - inorderStart
    const rightLength = length - leftLength - 1

    const node: TreeNode = {
      val: value,
      left: null,
      right: null,
    }

    node.left = findSubtree(inorderStart, preorderStart + 1, leftLength)
    node.right = findSubtree(inorderIndex + 1, inorderIndex + 1, rightLength)

    return node
  }

  const root = findSubtree(0, 0, inorder.length)

  const findDepth = (node: TreeNode | null): number => {
    if (node === null) {
      return 0
    }

    const leftDepth = findDepth(node.left)
    const rightDepth = findDepth(node.right)

    return Math.max(leftDepth, rightDepth) + 1
  }

  const maxDepth = findDepth(root)

  let nodes: (TreeNode | null)[] = [root]
  let levelNodes: (TreeNode | null)[] = [root]

  for (let depth = 1; depth < maxDepth; depth += 1) {
    const nextLevelNodes: (TreeNode | null)[] = []

    for (let node of levelNodes) {
      let childNode: TreeNode | null = null

      childNode = node?.left ?? null
      nextLevelNodes.push(childNode)
      nodes.push(childNode)

      childNode = node?.right ?? null
      nextLevelNodes.push(childNode)
      nodes.push(childNode)
    }

    levelNodes = nextLevelNodes
  }

  const result: (number | null)[] = nodes.map((node) => node?.val ?? null)

  return result
}

describe('example desc', () => {
  it('desc 0', () => {
    const result = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
    expect(result).toEqual([3, 9, 20, null, null, 15, 7])
  })

  it('desc 0', () => {
    const result = buildTree([-1], [-1])
    expect(result).toEqual([-1])
  })

	  it('case 0', () => {
      const result = buildTree([1, 2, 3], [2, 3, 1])
      expect(result).toEqual([-1])
    })
})
