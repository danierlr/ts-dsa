import { Heap, IndexedBinaryHeap } from '@/utils/Heap'

type TaskCounted = {
  type: number
  count: number
}

function leastInterval(tasks: string[], n: number): number {
  // cycle = n intervals
  const numIntervalsPerCycle = n + 1

  const taskACode = 'A'.charCodeAt(0)
  const numTaskTypes: number = 'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1

  const tasksCounted = Array<null>(numTaskTypes)
    .fill(null)
    .map((_, index) => ({
      type: index,
      count: 0,
    }))

  for (let task of tasks) {
    tasksCounted[task.charCodeAt(0) - taskACode]!.count += 1
  }

  let numCycles = 0

  const heap = new IndexedBinaryHeap<TaskCounted>((a, b) => b.count - a.count) // max heap

  for (let taskCounted of tasksCounted) {
    if (taskCounted.count > 0) {
      heap.enqueue(taskCounted)
    }
  }

  while (heap.size > numIntervalsPerCycle) {
    let tasksCounted: TaskCounted[] = []

    for (let i = 0; i < numIntervalsPerCycle; i++) {
      tasksCounted.push(heap.dequeue())
    }

    tasksCounted.forEach((taskCounted) => {
      if (taskCounted.count === 1) {
        return
      }

      taskCounted.count -= 1

      heap.enqueue(taskCounted)
    })

    numCycles += 1
  }

	let numIntervals = numCycles * numIntervalsPerCycle

  if (heap.size > 0) {
    const maxCount = heap.dequeue().count

		let numMax = 1

    while (heap.size > 0 && heap.peek().count === maxCount) {
      heap.dequeue()
      numMax += 1
    }

		numIntervals += (maxCount - 1) * numIntervalsPerCycle + numMax
  }

  return numIntervals
}

describe('tests', () => {
  it('desc 0', () => {
    const res = leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2)

    expect(res).toEqual(8)
  })

  it('desc 1', () => {
    const res = leastInterval(['A', 'C', 'A', 'B', 'D', 'B'], 1)

    expect(res).toEqual(6)
  })

  it('desc 2', () => {
    const res = leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 3)

    expect(res).toEqual(10)
  })
})
