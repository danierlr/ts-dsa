// preqVerts
// 0 =>
// 1 => 0

// emptyVerts: 0



// visited



function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const haveNoPreqs: number[] = [] // v that have no prerequisites
  const remainingVertPreqs: Set<number>[] = [] // [v] is remaining prerequisites for v
  const notScheduled: Set<number> = new Set() // v that have not been scheduled yet
  const vertPreqFors: number[][] = [] // [v] is vertices, that v is prerequisite for

  for (let vert = 0; vert < numCourses; vert++) {
    remainingVertPreqs[vert] = new Set()
    notScheduled.add(vert)
    vertPreqFors[vert] = []
  }

  for (let preq of prerequisites) {
    const vert = preq[0]!
    const preqVert = preq[1]!

    remainingVertPreqs[vert]!.add(preqVert)
    vertPreqFors[preqVert]!.push(vert)
  }

  for (let vert = 0; vert < numCourses; vert++) {
    if (remainingVertPreqs[vert]!.size === 0) {
      haveNoPreqs.push(vert)
    }
  }

  while (haveNoPreqs.length > 0) {
    const vert = haveNoPreqs.pop()!
    notScheduled.delete(vert)

		for (let dependant of vertPreqFors[vert]!) {
			remainingVertPreqs[dependant]!.delete(vert)

			if (remainingVertPreqs[dependant]!.size === 0 && notScheduled.has(dependant)) {
        haveNoPreqs.push(dependant)
      }
		}
  }

  return notScheduled.size === 0
}

describe('tests', () => {
	const res = canFinish(2, [[1, 0]])

  it('desc 0', () => {
    expect(true).toEqual(res)
  })
})
