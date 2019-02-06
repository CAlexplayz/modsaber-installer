import { TOGGLE_THEME, SET_THEME, SET_THEME_LIGHT, SET_THEME_DARK } from '../actions/types.js'

/**
 * @typedef {string} State
 */

/**
 * @typedef {('TOGGLE_THEME'|'SET_THEME'|'SET_THEME_LIGHT'|'SET_THEME_DARK')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (string|undefined) }} action Action
 * @returns {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
