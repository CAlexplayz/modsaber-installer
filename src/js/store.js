import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { electronStore } from './utils/electron'

import { STATUS_TEXT_IDLE, STATUS_LOADING } from './constants/statuses'

const initialState = {
  theme: electronStore.get('theme') || 'light',

  status: {
    type: STATUS_LOADING,
    text: STATUS_TEXT_IDLE,
  },

  mods: {
    raw: [],
    list: [],
    selected: null,
  },

  gameVersions: [],

  install: {
    path: null,
    platform: 'unknown',
    pirated: false,
  },

  jobs: [],

  tabs: {
    max: 0,
    current: 0,
  },

  container: undefined,
}

const middleware = [thunk]
export const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))
