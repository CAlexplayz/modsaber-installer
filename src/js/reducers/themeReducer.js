import { electronStore } from '../utils/electron'
import { SET_THEME, LOAD_THEME } from '../actions/types.js'

/**
 * @typedef {('light'|'dark')} State
 */

/**
 * @typedef {('SET_THEME'|'LOAD_THEME')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (State|undefined) }} action Action
 * @returns {State}
 */
const reducer = (state = 'light', action) => {
  if (action.type === SET_THEME) {
    const theme = state === 'light' ? 'dark' : 'light'

    setTheme(theme)
    electronStore.set('theme', theme)

    return theme
  } else if (action.type === LOAD_THEME) {
    const theme = electronStore.get('theme')
    setTheme(theme)

    return theme
  } else {
    return state
  }
}

/**
 * @param {State} theme Theme
 */
const setTheme = theme => {
  const [html] = document.getElementsByTagName('html')

  if (theme === 'dark') html.classList.add('dark')
  else html.classList.remove('dark')
}

export default reducer
