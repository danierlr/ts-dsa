import { TreeNode, makeTree, describe, expect } from "../../utils/structures";

// ─── Problem ──────────────────────────────────────────────────────────────────
// Maximum Depth of Binary Tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree/

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Max Depth of Binary Tree", () => {
  expect("depth 3", maxDepth(makeTree([3, 9, 20, null, null, 15, 7])), 3);
  expect("depth 2", maxDepth(makeTree([1, null, 2])), 2);
  expect("empty", maxDepth(null), 0);
  expect("one node", maxDepth(makeTree([1])), 1);
});
