import { describe, it, expect } from '@jest/globals'
import { NewLineKind } from 'typescript'

interface Sequence {
  firstNum: number
  endNum: number // last num + 1
}

// function longestConsecutive(nums: number[]): number {
//   const seqs = new Map<number, Sequence | 'invalid'>() // key = num, value = sequence length ending with that num

//   let maxSeq = 0

//   for (let num of nums) {
//     if (seqs.has(num)) {
//       continue
//     }

//     const prevSeq = seqs.get(num - 1)
//     const nextSeq = seqs.get(num + 1)

//     if (prevSeq === undefined && nextSeq === undefined) {
//       seqs.set(num, {
//         firstNum: num,
//         endNum: num + 1,
//       })

//       maxSeq = Math.max(maxSeq, 1)
//       continue
//     }

//     if (typeof prevSeq === 'object' && typeof nextSeq !== 'object') {
//       if (prevSeq.endNum - 1 !== prevSeq.firstNum) {
//         seqs.set(prevSeq.endNum - 1, 'invalid')
//       }

//       seqs.set(num, prevSeq)
//       prevSeq.endNum = num + 1
//       maxSeq = Math.max(maxSeq, prevSeq.endNum - prevSeq.firstNum)
//       continue
//     }

//     if (typeof prevSeq !== 'object' && typeof nextSeq === 'object') {
//       if (nextSeq.firstNum !== nextSeq.endNum - 1) {
//         seqs.set(nextSeq.firstNum, 'invalid')
//       }

//       seqs.set(num, nextSeq)
//       nextSeq.firstNum = num
//       maxSeq = Math.max(maxSeq, nextSeq.endNum - nextSeq.firstNum)
//       continue
//     }

//     if (typeof prevSeq === 'object' && typeof nextSeq === 'object') {
// 			if(prevSeq.firstNum != num - 1){
// 				seqs.set(num - 1, 'invalid')
// 			}
      
//       seqs.set(num, 'invalid')

// 			if(nextSeq.endNum - 1 !== num + 1){
// 				seqs.set(num + 1, 'invalid')
// 			}

//       nextSeq.firstNum = prevSeq.firstNum

//       seqs.set(nextSeq.firstNum, nextSeq)

//       maxSeq = Math.max(maxSeq, nextSeq.endNum - nextSeq.firstNum)
//       continue
//     }
//   }

//   return maxSeq
// }

function longestConsecutive(nums: number[]): number {
  const existing = new Map<number, boolean>() // key = num, value = sequence length ending with that num
	let maxSeq = 0

	nums.forEach(num => existing.set(num, true))

	for(let num of nums){
		if(existing.has(num - 1)){
			continue
		}

		let length = 1

		while(existing.has(num + 1)){
			length += 1
		}

		maxSeq = Math.max(maxSeq, length)
	}

  return maxSeq
}

describe('example desc', () => {
  it('desc 0', () => {
    const result = longestConsecutive([100, 4, 200, 1, 3, 2])
    expect(result).toEqual(4)
  })

  it('desc 1', () => {
    const result = longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])
    expect(result).toEqual(9)
  })

  it('desc 2', () => {
    const result = longestConsecutive([1, 0, 1, 2])
    expect(result).toEqual(3)
  })
})
