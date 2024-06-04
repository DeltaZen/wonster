import { MAX_CHALLENGES } from '../constants/settings'
import { GAME_TITLE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { getCurrentSolution, unicodeSplit } from './words'

export const shareStatus = (
  solution: string,
  guesses: string[],
  lost: boolean,
  handleShareToClipboard: () => void,
  handleShareFailure: () => void
) => {
  const solutionIndex = getCurrentSolution().solutionIndex
  const textToShare =
    `${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}\n\n` +
    generateEmojiGrid(solution, guesses, ['🟩', '🟨', '⬛'])

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    window.webxdc.sendToChat(shareData)
    shareSuccess = true
  } catch (error) {
    shareSuccess = false
  }

  try {
    if (!shareSuccess) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToShare)
          .then(handleShareToClipboard)
          .catch(handleShareFailure)
      } else {
        handleShareFailure()
      }
    }
  } catch (error) {
    handleShareFailure()
  }
}

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[]
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess)
      const splitGuess = unicodeSplit(guess)

      return splitGuess
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0]
            case 'present':
              return tiles[1]
            default:
              return tiles[2]
          }
        })
        .join('')
    })
    .join('\n')
}
