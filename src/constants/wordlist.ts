import { DE_WORDLIST } from "./wordlists/wordlist.de";
import { EN_WORDLIST } from "./wordlists/wordlist.en";
import { ES_WORDLIST } from "./wordlists/wordlist.es";
import { RU_WORDLIST } from "./wordlists/wordlist.ru";

const EN_KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

const DE_KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
  ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
]

const RU_KEYBOARD = [
  ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
  ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
  ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю']
]

export const WORDLISTS = {
  en: { label: `🇺🇸EN`, words: EN_WORDLIST, keyboard: EN_KEYBOARD },
  de: { label: `🇩🇪DE`, words: DE_WORDLIST, keyboard: DE_KEYBOARD },
  es: { label: `🇪🇸ES`, words: ES_WORDLIST, keyboard: EN_KEYBOARD /* the wordlist does not contain tildes, only english letters */ },
  ru: { label: `🇷🇺RU`, words: RU_WORDLIST, keyboard: RU_KEYBOARD },
  it: { label: `🇮🇹IT`, words: RU_WORDLIST, keyboard: EN_KEYBOARD }
}


