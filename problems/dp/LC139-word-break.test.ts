function wordBreak(s: string, wordDict: string[]): boolean {
  let breaks: boolean[] = Array(s.length + 1).fill(false) // [x] === true => until s[x - 1] can be split into words from dict

  breaks[0] = true

  for (let i = 0; i < s.length; i += 1) {
    if (!breaks[i]) {
      continue
    }

    for (let word of wordDict) {
      if (s.length >= i + word.length && s.substring(i, i + word.length) === word) {
        breaks[i + word.length] = true
      }
    }
  }

  return breaks[s.length]!
}

describe('tests', () => {
  it('desc 0', () => {
    const res = wordBreak('leetcode', ['leet', 'code'])

    expect(res).toEqual(true)
  })

  it('desc 1', () => {
    const res = wordBreak('applepenapple', ['apple', 'pen'])

    expect(res).toEqual(true)
  })

  it('desc 2', () => {
    const res = wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])

    expect(res).toEqual(false)
  })
})
