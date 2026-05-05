class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let node = head

  let reverseTail = null

  while (node) {
    const nextNode = node.next

    node.next = reverseTail

    reverseTail = node

    node = nextNode
  }

  return reverseTail
}
