import { SET_THEME, LOAD_THEME } from './types'

export const setTheme = theme => dispatch => {
  dispatch({
    type: SET_THEME,
    payload: theme,
  })
}

export const toggleTheme = () => (dispatch, getState) => {
  const theme = getState().theme === 'light' ? 'dark' : 'light'

  dispatch({
    type: SET_THEME,
    payload: theme,
  })
}

export const loadTheme = () => dispatch => {
  dispatch({
    type: LOAD_THEME,
  })
}
