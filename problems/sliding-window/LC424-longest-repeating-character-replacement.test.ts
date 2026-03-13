import { describe, it, expect } from '@jest/globals'

function characterReplacement(s: string, k: number): number {
  const counts = new Map<string, number>()
	const maxReplacements = k

	for(let i = 'A'.codePointAt(0)!; i <= 'Z'.codePointAt(0)!; i++){
		counts.set(String.fromCharCode(i), 0)
	}

	let longestChar = 'A'
	let maxLongest = 0

	let start = 0
	let end = 0

	while(end < s.length){
		const endChar = s[end]!

		const endCharCount = counts.get(endChar)! + 1
		counts.set(endChar, endCharCount)
		end += 1

		let longestCharCount = counts.get(longestChar)!

		if(endCharCount > longestCharCount){
			longestChar = endChar
			longestCharCount = endCharCount
		}

		if(end - start - longestCharCount > maxReplacements){
			const startChar = s[start]!
			const startCharCount = counts.get(startChar)! - 1
			counts.set(startChar, startCharCount)
			start += 1
		}

		maxLongest = Math.max(end - start)
	}

	return maxLongest
};

describe('example desc', () => {

	it('desc 1', () => {
		const result = characterReplacement('AABABBA', 1)
		expect(result).toEqual(4)
	})
})
