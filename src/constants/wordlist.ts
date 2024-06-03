import { EN_WORDLIST } from './wordlists/wordlist.en'

const EN_KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

export const WORDLISTS = {
  en: { label: `🇺🇸EN`, words: EN_WORDLIST, keyboard: EN_KEYBOARD },
}
