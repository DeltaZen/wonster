import { WORDLISTS } from '../constants/wordlist'

const lang = getLanguage()

const maxserialKey = 'maxSerial'
const gameStateKey = 'gameState_' + lang
const archiveGameStateKey = 'archiveGameState_' + lang
const highContrastKey = 'highContrast'
const gameSeedKey = 'gameSeed'
const gameSeedTimeKey = 'gameSeedTime'

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
  return true
}

export function getLanguage() {
  return 'en' as keyof typeof WORDLISTS
}

export function setSeed(seed: number, time: number) {
  localStorage.setItem(gameSeedKey, seed.toString())
  localStorage.setItem(gameSeedTimeKey, time.toString())
}

export function getSeed() {
  const seed = parseInt(localStorage.getItem(gameSeedKey) || '-1')
  const time = parseInt(localStorage.getItem(gameSeedTimeKey) || '0')
  return { seed, time }
}

export function generateSeed() {
  const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const wordCount = WORDLISTS[getLanguage()].words.length
  const seed = randInt(0, wordCount)
  const payload = { seed, time: new Date().valueOf() }
  setSeed(payload.seed, payload.time)
  return payload
}

export function getLastSerial() {
  return parseInt(localStorage.getItem(maxserialKey) || '0')
}

export function setLastSerial(serial: number) {
  localStorage.setItem(maxserialKey, serial.toString())
}
