import { Heap, IndexedBinaryHeap } from '@/utils/Heap'

type Wrapper = {
  // the heap stucture does not support duplicate values
  value: number
}

class MedianFinder {
  private smallers = new IndexedBinaryHeap<Wrapper>((a, b) => b.value - a.value) // max heap
  private biggers = new IndexedBinaryHeap<Wrapper>((a, b) => a.value - b.value) // min heap

  constructor() {}

  addNum(num: number): void {
    const smallers = this.smallers // -2 -3
    const biggers = this.biggers //-1

    if (smallers.size === 0) {
      smallers.enqueue({ value: num })
      return
    }

    if (num <= smallers.peek().value) {
      smallers.enqueue({ value: num })
    } else {
      biggers.enqueue({ value: num })
    }

    if (smallers.size > biggers.size + 1) {
      biggers.enqueue(smallers.dequeue())
    }

    if (biggers.size > smallers.size + 1) {
      smallers.enqueue(biggers.dequeue())
    }
  }

  findMedian(): number {
    if (this.smallers.size === 0) {
      return this.biggers.peek().value
    }

    if (this.biggers.size === 0) {
      return this.smallers.peek().value
    }

    if (this.smallers.size === this.biggers.size) {
      return (this.smallers.peek().value + this.biggers.peek().value) / 2
    } else {
      const heap = this.smallers.size > this.biggers.size ? this.smallers : this.biggers
      return heap.peek().value
    }
  }
}

describe('tests', () => {
  it('desc 0', () => {
    const medianFinder = new MedianFinder()
    medianFinder.addNum(1)
    medianFinder.addNum(2)

    let median = medianFinder.findMedian()
    expect(median).toEqual(1.5)

    medianFinder.addNum(3) // arr[1, 2, 3]

    median = medianFinder.findMedian() // return 2.0
    expect(median).toEqual(2)
  })
})
