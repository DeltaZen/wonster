import { WORDLIST } from '../constants/wordlist'

const maxserialKey = 'maxSerial'
const gameStateKey = 'gameState'
const gameSeedKey = 'gameSeed'
const gameSeedTimeKey = 'gameSeedTime'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

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
  const wordCount = WORDLIST.length
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
