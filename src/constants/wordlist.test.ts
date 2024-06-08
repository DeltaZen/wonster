import { fail } from 'assert'

import { WORDLIST } from './wordlist'

// You may not want the list of solutions to be unique. In that case, disable this test
describe('wordlist', () => {
  test('words are unique', () => {
    const uniqueWords = Array.from(new Set(WORDLIST))

    expect(WORDLIST.length).toEqual(uniqueWords.length)

    if (uniqueWords.length !== WORDLIST.length) {
      uniqueWords.forEach((w) => {
        const ww = WORDLIST.filter((x) => x === w)
        if (ww.length > 1) {
          fail(`The word ${w} is not unique.`)
        }
      })
    }
  })
})
