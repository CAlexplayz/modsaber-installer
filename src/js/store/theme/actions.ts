import { Dispatch } from 'redux'
import { IState } from '..'
import { IThemeState, ThemeActionTypes } from './types'

export const setTheme: (
  theme: IThemeState
) => (dispatch: Dispatch) => void = theme => dispatch => {
  dispatch({
    payload: theme,
    type: ThemeActionTypes.SET_THEME,
  })
}

export const toggleTheme: () => (
  dispatch: Dispatch,
  getState: () => IState
) => void = () => (dispatch, getState) => {
  const theme = getState().theme === 'light' ? 'dark' : 'light'

  dispatch({
    payload: theme,
    type: ThemeActionTypes.SET_THEME,
  })
}

export const loadTheme: () => (dispatch: Dispatch) => void = () => dispatch => {
  dispatch({ type: ThemeActionTypes.LOAD_THEME })
}
