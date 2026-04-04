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

// function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
//   const numIndexByValue = new Map<number, number>()

//   for (let i = 0; i < nums.length; i++) {
//     numIndexByValue.set(nums[i]!, i)
//   }

// 	const numsSorted = nums.concat().sort((a, b) => b - a)

// 	const buildSubtree = (indexFirst: number, indexEnd: number): TreeNode | null => {
// 		const length = indexEnd - indexFirst

// 		if(length <= 0){
// 			return null
// 		}

// 		// if(length)
// 	}

// 	// const root = buildSubtree()
// }

describe('example desc', () => {
  it('desc 0', () => {
    // const result = constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])
    expect(1).toEqual(1)
  })
})
