import './Monster.css'

import { Application, Assets, Rectangle, Sprite, Texture } from 'pixi.js'

import { getSeed } from '../../lib/localStorage'

const frameWidth = 150
const frameHeight = 216
const app = new Application()
const initProm = app.init({
  width: frameWidth,
  height: frameHeight,
  backgroundAlpha: 0,
})
const colorVariants = [0, 1, 2]
const extraVariants = [1, 2, 3, 4]
const earsVariants = [1, 2, 3, 4]
const eyesVariants = [1, 2, 3, 4, 5, 6]
const noseVariants = [1, 2, 3, 4]
const mouthVariants = [1, 2, 3, 4, 5, 6]
let seed = ''

async function digestMessage(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  return hashHex
}

async function addSprite(url: string, frame: Rectangle) {
  app.stage.addChild(
    new Sprite(new Texture({ source: await Assets.load(url), frame }))
  )
}

async function createMonster() {
  const today = new Date()
  const todaySeed =
    today.getDate() +
    '/' +
    today.getMonth() +
    '/' +
    today.getFullYear() +
    '/' +
    getSeed().seed
  if (seed !== todaySeed) {
    seed = todaySeed
  } else {
    return
  }
  await initProm
  app.stage.removeChildren()
  const hex = await digestMessage(seed)
  console.log(`Monster seed: ${seed} (${hex})`)
  const color = colorVariants[parseInt(hex[0], 16) % colorVariants.length]
  const extraKind = extraVariants[parseInt(hex[1], 16) % extraVariants.length]
  const earsKind = earsVariants[parseInt(hex[2], 16) % earsVariants.length]
  const eyesKind = eyesVariants[parseInt(hex[3], 16) % eyesVariants.length]
  const noseKind = noseVariants[parseInt(hex[4], 16) % noseVariants.length]
  const mouthKind = mouthVariants[parseInt(hex[5], 16) % mouthVariants.length]
  const frame = new Rectangle(frameWidth * color, 0, frameWidth, frameHeight)
  await addSprite('gfx/body.png', frame)
  await addSprite(`gfx/extra/${extraKind}.png`, frame)
  await addSprite(`gfx/ears/${earsKind}.png`, frame)
  await addSprite(`gfx/eyes/${eyesKind}.png`, frame)
  await addSprite(`gfx/nose/${noseKind}.png`, frame)
  await addSprite(`gfx/mouth/${mouthKind}.png`, frame)

  const root = document.getElementById('monster')
  root!.innerHTML = ''
  root!.appendChild(app.canvas)
}

function PixiMonster() {
  createMonster()
  return <></>
}

export const Monster = () => {
  const classes = 'xxshort:h-20 xshort:h-24 short:h-28 h-32 w-auto'
  return (
    <div id="monster" className={classes}>
      <PixiMonster />
    </div>
  )
}
