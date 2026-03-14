import { describe, it, expect } from '@jest/globals'

// ab  xaxba



function checkInclusion(permutated: string, containing: string): boolean {
  const counts = new Map<string, number>() // how many extra symbols are in the current window (can be negative)

  const misingChars = new Set<string>()
  const extraChars = new Set<string>()

  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    const char = String.fromCharCode(i)
    counts.set(char, 0)
  }

  for (let char of permutated) {
    const count = counts.get(char)!

    counts.set(char, count - 1)
    misingChars.add(char)
  }

  let start = 0
  let end = 0

  while (end < containing.length) { // 5
    while (misingChars.size > 0 && end < containing.length) {
      const char = containing[end]!
      end += 1
      const count = counts.get(char)! + 1
      counts.set(char, count)

      if (count >= 0) {
        misingChars.delete(char)
      }

      if (count > 0) {
        extraChars.add(char)
      }
    }

    while (start + permutated.length < end && extraChars.size > 0) {
      const char = containing[start]!
      start += 1
      const count = counts.get(char)! - 1
      counts.set(char, count)

      if (count <= 0) {
        extraChars.delete(char)
      }

      if (count < 0) {
        misingChars.add(char)
      }
    }

    if (misingChars.size === 0 && extraChars.size === 0) {
      return true
    }
  }

  return false
}

describe('example desc', () => {
  it('desc 0', () => {
    const result = checkInclusion('ab', 'eidbaooo')
    expect(result).toEqual(true)
  })

  it('desc 1', () => {
    const result = checkInclusion('ab', 'eidboaoo')
    expect(result).toEqual(false)
  })
})
