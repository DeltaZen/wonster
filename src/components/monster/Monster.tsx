import './Monster.css'
import { Rectangle, Application, Sprite, Assets, Texture } from 'pixi.js'
import { getSeed } from '../../lib/localStorage'

const frameWidth = 150
const frameHeight = 216
const app = new Application()
const initProm = app.init({ width: frameWidth, height: frameHeight, backgroundAlpha: 0})
const colorVariants = [0, 1, 2]
const extraVariants = [1, 2, 3, 4]
const earsVariants = [1, 2, 3, 4]
const eyesVariants = [1, 2, 3, 4, 5, 6]
const noseVariants = [1, 2, 3, 4]
const mouthVariants = [1, 2, 3, 4, 5, 6]
let seed = ""

async function digestMessage(message: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
    return hashHex;
}

async function addSprite(alias: string, frame: Rectangle) {
    app.stage.addChild(new Sprite(new Texture({source: await Assets.load(alias), frame})));
}

async function createMonster() {
    const today = new Date();
    const todaySeed = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear() + "/" + getSeed();
    if (seed !== todaySeed) {
        seed = todaySeed
    } else {
        return
    }
    await initProm;
    app.stage.removeChildren();
    const root = document.getElementById("monster");
    if (root) {
        root.innerHTML = "";
        root.appendChild(app.canvas);
    }
    const hex = await digestMessage(seed);
    console.log(`Monster seed: ${seed} (${hex})`)
    const color = colorVariants[parseInt(hex[0], 16) % colorVariants.length];
    const extraKind = extraVariants[parseInt(hex[1], 16) % extraVariants.length];
    const earsKind = earsVariants[parseInt(hex[2], 16) % earsVariants.length];
    const eyesKind = eyesVariants[parseInt(hex[3], 16) % eyesVariants.length];
    const noseKind = noseVariants[parseInt(hex[4], 16) % noseVariants.length];
    const mouthKind = mouthVariants[parseInt(hex[5], 16) % mouthVariants.length];
    Assets.addBundle('images', [
        {alias: 'body', src: 'gfx/body.png'},
        {alias: 'extra', src: `gfx/extra/${extraKind}.png`},
        {alias: 'ears', src: `gfx/ears/${earsKind}.png`},
        {alias: 'eyes', src: `gfx/eyes/${eyesKind}.png`},
        {alias: 'nose', src: `gfx/nose/${noseKind}.png`},
        {alias: 'mouth', src: `gfx/mouth/${mouthKind}.png`},
    ]);
    await Assets.loadBundle('images');
    const frame = new Rectangle(frameWidth*color, 0, frameWidth, frameHeight);
    await addSprite("body", frame);
    await addSprite("extra", frame);
    await addSprite("ears", frame);
    await addSprite("eyes", frame);
    await addSprite("nose", frame);
    await addSprite("mouth", frame);
}

function PixiMonster() {
    createMonster();
    return <></>;
}

export const Monster = () => {
    return <div id="monster"><PixiMonster /></div>;
}
