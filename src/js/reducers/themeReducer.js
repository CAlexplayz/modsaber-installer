import { electronStore } from '../utils/electron'
import { SET_THEME } from '../actions/types.js'

/**
 * @typedef {('light'|'dark')} State
 */

/**
 * @typedef {'SET_THEME'} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (State|undefined) }} action Action
 * @returns {State}
 */
const reducer = (state, action) => {
  if (action.type !== SET_THEME) return state

  const [html] = document.getElementsByTagName('html')
  const theme = state === 'light' ? 'dark' : 'light'

  if (theme === 'dark') html.classList.add('dark')
  else html.classList.remove('dark')

  electronStore.set('theme', theme)
  return theme
}

export default reducer
