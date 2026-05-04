import { UnionFind } from '@/utils/UnionFind'

function accountsMerge(entries: string[][]): string[][] {
  const numEntries = entries.length

  const uf = new UnionFind<number>(
    Array(numEntries)
      .fill(null)
      .map((_, index) => index)
  )

  const entryIdsByEmail = new Map<string, number[]>()
  // const userNameByEntryId = new M

  for (let entryId = 0; entryId < numEntries; entryId += 1) {
    const entry = entries[entryId]!

    for (let i = 1; i < entry.length; i += 1) {
      const email = entry[i]!

      let entryIds = entryIdsByEmail.get(email)

      if (!entryIds) {
        entryIds = []
        entryIdsByEmail.set(email, entryIds)
      }

      entryIds.push(entryId)
    }
  }

  for (let email of entryIdsByEmail.keys()) {
    const entryIds = entryIdsByEmail.get(email)!

    if (entryIds.length < 2) {
      continue
    }

    const firstEntryId = entryIds[0]!
    const firstName = entries[firstEntryId]![0]!

    for (let i = 1; i < entryIds.length; i += 1) {
      const entryId = entryIds[i]!
      const entry = entries[entryId]!

      uf.union(firstEntryId, entryId)
      const name = entry[0]!

      if (name !== firstName) {
        throw new Error('Invalid operation: same email linked to two different names')
      }
    }
  }

  type Account = {
    userName: string
    emails: Set<string>
  }

  const accountsById = new Map<number, Account>()

  for (let entryId = 0; entryId < numEntries; entryId += 1) {
    const accountId = uf.find(entryId)

    let account = accountsById.get(accountId)

    const entry = entries[entryId]!

    if (!account) {
      account = {
        userName: entry[0]!,
        emails: new Set(),
      }

      accountsById.set(accountId, account)
    }

    for (let i = 1; i < entry.length; i += 1) {
      const email = entry[i]!
      account.emails.add(email)
    }
  }

  const result = Array.from(accountsById.values()).map((account) => {
    const arr = [account.userName]

    Array.from(account.emails)
      .sort()
      .forEach((email) => arr.push(email))

    return arr
  })

  return result
}

describe('example desc', () => {
  it('desc 0', () => {
    const res = accountsMerge([
      ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
      ['John', 'johnsmith@mail.com', 'john00@mail.com'],
      ['Mary', 'mary@mail.com'],
      ['John', 'johnnybravo@mail.com'],
    ])

    expect(res).toEqual([])
  })
})
