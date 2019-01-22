import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/App.jsx'
import Loading from './js/Loading.jsx'
import { ControllerProvider } from './js/Context.jsx'

import '@lolpants/bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './css/styles.css'
import './css/dark.css'
import './css/tools.css'

import './js/shortcuts.js'

/**
 * @type {Electron}
 */
const electron = window.require('electron')
const { getCurrentWindow } = electron.remote
const loading = getCurrentWindow().custom.ROLE === 'WINDOW_LOADING'

ReactDOM.render(
  <ControllerProvider>
    { loading ? <Loading /> : <App /> }
  </ControllerProvider>,
  document.getElementById('root')
)
