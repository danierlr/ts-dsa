import { describe, it, expect } from '@jest/globals'

function lengthOfLongestSubstring(s: string): number {
  const lastCharIndex = new Map<string, number>()

	let maxUniqueLength = 0
	let currUniqueLength = 0

  for (let index = 0; index < s.length; index++) {
    const char = s[index]!

		currUniqueLength += 1

    if (lastCharIndex.has(char)) {
			const charLengthAgo = index - lastCharIndex.get(char)!

			currUniqueLength = Math.min(charLengthAgo, currUniqueLength)
    }

		maxUniqueLength = Math.max(currUniqueLength, maxUniqueLength)

		lastCharIndex.set(char, index)
  }

	return maxUniqueLength
}

describe('example desc', () => {
  const result = lengthOfLongestSubstring('abcabcbb')

  it('example case', () => {
    expect(result).toEqual(3)
  })
})
