import { SET_INSTALL_PATH, SET_INSTALL_PLATFORM } from '../actions/types.js'

/**
 * @typedef {string} State
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
    default:
      return state
  }
}

export default reducer
