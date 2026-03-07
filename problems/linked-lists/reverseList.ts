import { ListNode, makeList, listToArray, describe, expect } from "../../utils/structures";

// ─── Problem ──────────────────────────────────────────────────────────────────
// Reverse Linked List
// https://leetcode.com/problems/reverse-linked-list/

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Reverse Linked List", () => {
  expect("5 nodes", listToArray(reverseList(makeList(1, 2, 3, 4, 5))), [5, 4, 3, 2, 1]);
  expect("2 nodes", listToArray(reverseList(makeList(1, 2))), [2, 1]);
  expect("1 node", listToArray(reverseList(makeList(1))), [1]);
  expect("empty", listToArray(reverseList(null)), []);
});
