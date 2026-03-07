// ─── Linked List ────────────────────────────────────────────────────────────

export class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

/** Build a linked list from values: makeList(1,2,3) → 1→2→3 */
export function makeList(...vals: number[]): ListNode | null {
  const dummy = new ListNode();
  let cur = dummy;
  for (const v of vals) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

/** Print linked list: 1 → 2 → 3 → null */
export function printList(head: ListNode | null): void {
  const out: number[] = [];
  while (head) {
    out.push(head.val);
    head = head.next;
  }
  console.log(out.join(" → ") + " → null");
}

/** Convert linked list to array */
export function listToArray(head: ListNode | null): number[] {
  const out: number[] = [];
  while (head) {
    out.push(head.val);
    head = head.next;
  }
  return out;
}

// ─── Binary Tree ─────────────────────────────────────────────────────────────

export class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

/**
 * Build a tree from LeetCode's level-order array format.
 * makeTree([1, 2, 3, null, null, 4, 5])
 *       1
 *      / \
 *     2   3
 *        / \
 *       4   5
 */
export function makeTree(vals: (number | null)[]): TreeNode | null {
  if (!vals.length || vals[0] == null) return null;
  const root = new TreeNode(vals[0]);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < vals.length) {
    const node = queue.shift()!;
    if (i < vals.length && vals[i] != null) {
      node.left = new TreeNode(vals[i] as number);
      queue.push(node.left);
    }
    i++;
    if (i < vals.length && vals[i] != null) {
      node.right = new TreeNode(vals[i] as number);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

/** Print tree as level-order array (LeetCode format) */
export function printTree(root: TreeNode | null): void {
  if (!root) {
    console.log("[]");
    return;
  }
  const out: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (!node) {
      out.push(null);
      continue;
    }
    out.push(node.val);
    queue.push(node.left);
    queue.push(node.right);
  }
  // trim trailing nulls
  while (out[out.length - 1] == null) out.pop();
  console.log("[" + out.join(", ") + "]");
}

// ─── Test Helpers ─────────────────────────────────────────────────────────────

/** Simple assertion with label */
export function expect<T>(label: string, got: T, expected: T): void {
  const pass = JSON.stringify(got) === JSON.stringify(expected);
  if (pass) {
    console.log(`  ✅ ${label}`);
  } else {
    console.log(`  ❌ ${label}`);
    console.log(`     expected: ${JSON.stringify(expected)}`);
    console.log(`     got:      ${JSON.stringify(got)}`);
  }
}

/** Run a group of tests with a heading */
export function describe(name: string, fn: () => void): void {
  console.log(`\n▶ ${name}`);
  fn();
}
