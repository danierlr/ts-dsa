import { Heap, IndexedBinaryHeap } from '@/utils/Heap'

type Edge = {
  targetNode: number
  distance: number
}

type Node = {
  edges: Edge[]
}

function networkDelayTime(times: number[][], n: number, k: number): number {
  const numNodes = n
  const initialNode = k - 1

  const nodes: Node[] = Array(numNodes)
    .fill(null)
    .map(() => ({ edges: [] }))

  for (let array of times) {
    let sourceNode = array[0]! - 1
    let targetNode = array[1]! - 1
    let weight = array[2]!

    nodes[sourceNode!]!.edges.push({
      targetNode: targetNode!,
      distance: weight!,
    })
  }

  // ---

  const distanceFromSource = new Map<number, number>()

  distanceFromSource.set(initialNode, 0)

  const frontierNodes = new IndexedBinaryHeap<number>((nodeA, nodeB) => {
    const distanceA = distanceFromSource.get(nodeA)
    const distanceB = distanceFromSource.get(nodeB)

    if (distanceA === undefined || distanceB === undefined) {
      throw new Error('Unknown distance')
    }

    return distanceA - distanceB
  })

  frontierNodes.enqueue(initialNode)

  while (frontierNodes.size > 0) {
    const currentNode = frontierNodes.dequeue()

    for (let edge of nodes[currentNode]!.edges) {
      const distanceViaCurrent = distanceFromSource.get(currentNode)! + edge.distance

      if (distanceFromSource.has(edge.targetNode)) {
        const prevDistance = distanceFromSource.get(edge.targetNode)!

        if (distanceViaCurrent < prevDistance) {
          distanceFromSource.set(edge.targetNode, distanceViaCurrent)

          if (frontierNodes.has(edge.targetNode)) {
            frontierNodes.delete(edge.targetNode)
            frontierNodes.enqueue(edge.targetNode)
          }
        }
      } else {
        distanceFromSource.set(edge.targetNode, distanceViaCurrent)

        frontierNodes.enqueue(edge.targetNode)
      }
    }
  }

  let maxDistance = 0

  for (let node = 0; node < numNodes; node += 1) {
    const distance = distanceFromSource.get(node)

    if (distance === undefined) {
      return -1
    }

    maxDistance = Math.max(maxDistance, distance)
  }

  return maxDistance
}

describe('tests', () => {
  it('desc 0', () => {
    const res = networkDelayTime(
      [
        [2, 1, 1],
        [2, 3, 1],
        [3, 4, 1],
      ],
      4,
      2
    )

    expect(res).toEqual(2)
  })
})
