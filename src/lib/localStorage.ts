import { MigrationStats } from '@/components/modals/MigrateStatsModal'

import { WORDLISTS } from '../constants/wordlist'

const lang = getLanguage()

const gameStateKey = 'gameState_' + lang
const archiveGameStateKey = 'archiveGameState_' + lang
const highContrastKey = 'highContrast'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (
  isLatestGame: boolean,
  gameState: StoredGameState
) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  localStorage.setItem(key, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (isLatestGame: boolean) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  const state = localStorage.getItem(key)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats_' + lang

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}

export function getLanguage() {
  let selected_lang: keyof typeof WORDLISTS =
    (localStorage.getItem('selected_lang') as keyof typeof WORDLISTS) || 'en'
  if (!Object.keys(WORDLISTS).includes(selected_lang)) {
    selected_lang = 'en'
  }
  return selected_lang
}

export function exportMigration(): MigrationStats {
  const result: MigrationStats = {} as unknown as MigrationStats
  for (let code of Object.keys(WORDLISTS) as (keyof typeof WORDLISTS)[]) {
    const stats = localStorage.getItem('gameStats_' + code)
    const state = localStorage.getItem('gameState_' + code)
    result[code] = {
      statistics: stats ? (JSON.parse(stats) as GameStats) : null,
      gameState: state ? (JSON.parse(state) as StoredGameState) : null,
    }
  }
  return result
}

export function importMigration(stats: MigrationStats) {
  for (let code of Object.keys(WORDLISTS) as (keyof typeof WORDLISTS)[]) {
    if (stats[code]) {
      const migrationStats = stats[code]
      if (migrationStats.gameState) {
        localStorage.setItem(
          'gameState_' + code,
          JSON.stringify(migrationStats.gameState)
        )
      }
      if (migrationStats.statistics) {
        localStorage.setItem(
          'gameStats_' + code,
          JSON.stringify(migrationStats.statistics)
        )
      }
    }
  }
}
