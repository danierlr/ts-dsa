function numDecodings(s: string): number {
  // const len0Encs = Array(9).fill(null).map((_, index) => index + 1)

  const char0 = '0'.charCodeAt(0)

  let encodingsPrev2 = 1
  let encodingsPrev1 = 1

  if (s.charCodeAt(0) === char0) {
    return 0
  }

  for (let i = 1; i < s.length; i += 1) {
    const valueLength1 = s.charCodeAt(i) - char0
    const possibleLength1 = valueLength1 > 0

    const valueLength2 = (s.charCodeAt(i - 1) - char0) * 10 + s.charCodeAt(i) - char0
    const possibleLength2 = valueLength2 > 9 && valueLength2 < 27

    if (!possibleLength1 && !possibleLength2) {
      return 0
    }

    let encodingsCurr = 0

    if (possibleLength1) {
      encodingsCurr += encodingsPrev1
    }

    if (possibleLength2) {
      encodingsCurr += encodingsPrev2
    }

    encodingsPrev2 = encodingsPrev1
    encodingsPrev1 = encodingsCurr
  }

  return encodingsPrev1
}

describe('tests', () => {
  it('desc 0', () => {
    const res = numDecodings('12')

    expect(res).toEqual(2)
  })

  it('desc 0', () => {
    const res = numDecodings('226')

    expect(res).toEqual(3)
  })

  it('desc 0', () => {
    const res = numDecodings('06')

    expect(res).toEqual(0)
  })
})
