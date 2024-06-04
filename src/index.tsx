import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { AlertProvider } from './context/AlertContext'
import {
  generateSeed,
  getLastSerial,
  getSeed,
  setLastSerial,
  setSeed,
} from './lib/localStorage'
import { clearCurrentSolution } from './lib/words'
import reportWebVitals from './reportWebVitals'

window.focus() // otherwise key events are not triggered if the app is inside an iframe
window.webxdc
  .setUpdateListener((update) => {
    const payload = update.payload || {}
    if (payload.seed !== undefined) {
      const { seed, time } = getSeed()
      if (seed === -1 || payload.time < time) {
        setSeed(payload.seed, payload.time)
        clearCurrentSolution()
      }
    }
    if (update.serial === update.max_serial) {
      setLastSerial(update.max_serial)
    }
  }, getLastSerial())
  .then(() => {
    if (getSeed().seed === -1) {
      window.webxdc.sendUpdate({ payload: generateSeed() }, '')
    }
    ReactDOM.render(
      <React.StrictMode>
        <AlertProvider>
          <App />
        </AlertProvider>
      </React.StrictMode>,
      document.getElementById('root')
    )
  })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
