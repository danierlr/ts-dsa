export class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val
		this.left = left === undefined ? null : left
		this.right = right === undefined ? null : right
	}
}

export const treeToArray = (root: TreeNode | null): (number | null)[] => {
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
