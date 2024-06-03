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
import reportWebVitals from './reportWebVitals'

window.focus() // otherwise key events are not triggered if the app is inside an iframe
window.webxdc
  .setUpdateListener((update) => {
    const payload = update.payload || {}
    if (payload.seed !== undefined) {
      if (getSeed() === -1) {
        setSeed(payload.seed)
      }
    }
    if (update.serial === update.max_serial) {
      setLastSerial(update.max_serial)
    }
  }, getLastSerial())
  .then(() => {
    if (getSeed() === -1) {
      window.webxdc.sendUpdate({ payload: { seed: generateSeed() } }, '')
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
