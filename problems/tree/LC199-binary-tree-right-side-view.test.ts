import { describe, it, expect } from '@jest/globals'

import { TreeNode } from '@/utils/Tree'
import { Queue } from '@/utils/Queue'

function rightSideView(root: TreeNode | null): number[] {
  const result: number[] = []

	const queue: Queue<TreeNode> = new Queue();

	if(root == null){
		return []
	}

	queue.enqueue(root)

	let level: number = 0

	while(queue.size > 0){
		const numNodesInLevel = queue.size;

		for(let i = 0; i < numNodesInLevel; i++){
			const node = queue.dequeue()!

			if(node.left){
				queue.enqueue(node.left)
			}

			if(node.right){
				queue.enqueue(node.right)
			}

			if(i === numNodesInLevel - 1){
				result.push(node.val)
			}
		}

		level += 1
	}

	return result
};

describe('example desc', () => {
	it('desc 0', () => {
		// const result = maxPathSum([1, 2, 3])
		expect(1).toEqual(1)
	})
})
