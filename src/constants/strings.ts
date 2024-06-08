export const GAME_TITLE = 'Wonster'

export const WIN_MESSAGES = [
  'Best friends forever!',
  'I like you',
  'You are cool',
  "Let's be friends",
  'You are awesome',
  'Me likes human',
]
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
export const WORD_NOT_FOUND_MESSAGE = 'Unknown word'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New monster in'
export const SHARE_TEXT = 'Share'
export const SHARE_FAILURE_TEXT = 'Unable to share the results.'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const WIN_INFO_MESSAGE = (name: string, tries: number, limit: number) =>
  `${name} guessed the word of the day! 🎉 ${tries}/${limit}`
export const LOSE_INFO_MESSAGE = (name: string, limit: number) =>
  `${name} failed to guess the word of the day 😅 X/${limit}`
