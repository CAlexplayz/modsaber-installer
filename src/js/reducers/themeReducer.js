import { TOGGLE_THEME, SET_THEME, SET_THEME_LIGHT, SET_THEME_DARK } from '../actions/types.js'

/**
 * @typedef {('light'|'dark')} State
 */

/**
 * @typedef {('TOGGLE_THEME'|'SET_THEME'|'SET_THEME_LIGHT'|'SET_THEME_DARK')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (State|undefined) }} action Action
 * @returns {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return state === 'light' ? 'dark' : 'light'
    case SET_THEME:
      return action.payload
    case SET_THEME_LIGHT:
      return 'light'
    case SET_THEME_DARK:
      return 'dark'
    default:
      return state
  }
}

export default reducer
