import { SET_INSTALL_PATH, SET_INSTALL_PLATFORM } from '../actions/types.js'

/**
 * @typedef {Object} State
 * @property {string} path
 * @property {string} platform
 */

/**
 * @typedef {('SET_INSTALL_PATH'|'SET_INSTALL_PLATFORM')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: string }} action Action
 * @returns {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case SET_INSTALL_PATH:
      return { ...state, path: action.payload }
    case SET_INSTALL_PLATFORM:
      return { ...state, platform: action.payload }
    default:
      return state
  }
}

export default reducer
