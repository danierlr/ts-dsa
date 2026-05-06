function minWindow(s: string, t: string): string {
  let minStart: number | null = null
  let minEnd: number | null = null

  const searched = s
  const included = t

  const missingChars = new Set<string>() // TODO remove missing/present logical inversion for better clarity
  const missingCounts = new Map<string, number>()

  for (const char of included) {
    let count = missingCounts.get(char) ?? 0

    missingCounts.set(char, count + 1)
    missingChars.add(char)
  }

  let start = 0
  let end = 0

  while (end < searched.length) {
    while (end < searched.length && missingChars.size > 0) {
      const char = searched[end]!
      end += 1

      let count = missingCounts.get(char) ?? 0

      count -= 1

      missingCounts.set(char, count)

      if (count > 0) {
        missingChars.add(char)
      } else {
        missingChars.delete(char)
      }
    }

    while (missingChars.size === 0 && start < end) {
      if (minStart === null || minEnd === null) {
        minStart = start
        minEnd = end
      } else if (end - start < minEnd - minStart) {
        minStart = start
        minEnd = end
      }

      const char = searched[start]!

      let count = missingCounts.get(char) ?? 0

      count += 1

      missingCounts.set(char, count)

      if (count > 0) {
        missingChars.add(char)
      }

      start += 1
    }
  }

  if (minStart === null || minEnd === null) {
    return ''
  }

  return searched.substring(minStart!, minEnd!)
}

describe('tests', () => {
  it('desc 0', () => {
    const res = minWindow('ADOBECODEBANC', 'ABC')

    expect(res).toEqual('BANC')
  })

  it('desc 1', () => {
    const res = minWindow('a', 'a')

    expect(res).toEqual('a')
  })

  it('desc 2', () => {
    const res = minWindow('a', 'aa')

    expect(res).toEqual('')
  })
})
