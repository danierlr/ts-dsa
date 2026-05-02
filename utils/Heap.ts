export type Heap<T> = {
  peek: () => T

  has: (value: T) => boolean

  enqueue: (value: T) => void

  dequeue: () => T

  delete: (value: T) => boolean

  readonly size: number
}

// TODO allow duplicate values, remove returns removed valeus count
export class IndexedBinaryHeap<T> implements Heap<T> {
  private readonly items: T[] = []
  private readonly indexByValue = new Map<T, number>()

  // by default min-heap <= a - b
  constructor(private compare: (a: T, b: T) => number) {}

  private throwIfEmpty() {
    if (this.size === 0) {
      throw new Error('No elements present in the heap')
    }
  }

  private fixUp(index: number) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)

      const parentDominates = this.compare(this.items[parentIndex]!, this.items[index]!) <= 0

      if (parentDominates) {
        break
      }

      this.swap(index, parentIndex)

      index = parentIndex
    }
  }

  private fixDown(index: number) {
    const size = this.size
    while (index < size) {
      const leftChildIndex = index * 2 + 1
      const rightChildIndex = index * 2 + 2

      let dominantIndex = index

      if (leftChildIndex < size) {
        const childDominates =
          this.compare(this.items[leftChildIndex]!, this.items[dominantIndex]!) <= 0

        if (childDominates) {
          dominantIndex = leftChildIndex
        }
      }

      if (rightChildIndex < size) {
        const childDominates =
          this.compare(this.items[rightChildIndex]!, this.items[dominantIndex]!) <= 0

        if (childDominates) {
          dominantIndex = rightChildIndex
        }
      }

      if (dominantIndex === index) {
        break
      }

      this.swap(index, dominantIndex)

      index = dominantIndex
    }
  }

  private swap(indexA: number, indexB: number) {
    const tmp = this.items[indexA]!
    this.items[indexA] = this.items[indexB]!
    this.items[indexB] = tmp

    this.indexByValue.set(this.items[indexA], indexA)
    this.indexByValue.set(this.items[indexB], indexB)
  }

  public peek(): T {
    this.throwIfEmpty()

    return this.items[0]!
  }

  public has(value: T): boolean {
    return this.indexByValue.has(value)
  }

  public enqueue(value: T) {
    if (this.has(value)) {
      throw new Error(`Value ${value} is present in the heap already`)
    }

    const insertIndex = this.size

    this.items[insertIndex] = value
    this.indexByValue.set(value, insertIndex)

    this.fixUp(insertIndex)
  }

  public dequeue(): T {
    this.throwIfEmpty()

    const value = this.peek()

    this.delete(value)

    return value
  }

  public delete(value: T): boolean {
    if (!this.has(value)) {
      return false
    }

    const removedIndex = this.indexByValue.get(value)!
    const lastIndex = this.size - 1

    this.swap(removedIndex, lastIndex)

    this.indexByValue.delete(value)
    this.items.pop()

    if (this.size > 0 && removedIndex < this.size) {
      this.fixUp(removedIndex)
      this.fixDown(removedIndex)
    }

    return true
  }

  public get size(): number {
    return this.indexByValue.size
  }
}
