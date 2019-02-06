import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/App'
import Events from './js/Events'
import Splash from './js/Splash'
import { Provider } from 'react-redux'
import { store } from './js/store'

import '@lolpants/bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './css/styles.css'
import './css/dark.css'
import './css/tools.css'

import './js/shortcuts.js'

import { getCurrentWindow } from './js/utils/electron'
const loading = getCurrentWindow().custom.ROLE === 'WINDOW_LOADING'

const Root = () => loading ?
  <Splash /> :
  <Provider store={ store }>
    <Events>
      <App />
    </Events>
  </Provider>

ReactDOM.render(<Root/>, document.getElementById('root'))
