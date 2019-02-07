import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './js/App'
import Events from './js/Events'
import Splash from './js/Splash'
import { store } from './js/store'

import '@fortawesome/fontawesome-free/css/all.css'
import '@lolpants/bulma/css/bulma.css'
import './css/dark.css'
import './css/styles.css'
import './css/tools.css'

import './js/shortcuts'

export interface IWindow extends Electron.BrowserWindow {
  custom: {
    ROLE: string
  }
}

import { getCurrentWindow } from './js/utils/electron'
const loading = (getCurrentWindow() as IWindow).custom.ROLE === 'WINDOW_LOADING'

const Root = () =>
  loading ? (
    <Splash />
  ) : (
    <Provider store={store}>
      <Events>
        <App />
      </Events>
    </Provider>
  )

ReactDOM.render(<Root />, document.getElementById('root'))
