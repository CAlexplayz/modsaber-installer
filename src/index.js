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

import { getCurrentWindow } from './js/utils/electron'
const loading = getCurrentWindow().custom.ROLE === 'WINDOW_LOADING'

const Root = () => loading ?
  <Loading /> :
  <ControllerProvider>
    <App />
  </ControllerProvider>

ReactDOM.render(<Root/>, document.getElementById('root')
)
