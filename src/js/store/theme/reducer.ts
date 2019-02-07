import { Reducer } from 'redux'
import { IThemeState, ThemeActionTypes } from './types'

//TODO: Add store

const reducer: Reducer<IThemeState> = (state = 'light', action) => {
  if (action.type === ThemeActionTypes.SET_THEME) {
    const theme = state === 'light' ? 'dark' : 'light'

    setTheme(theme)

    return theme
  } else if (action.type === ThemeActionTypes.LOAD_THEME) {
    return state
  } else {
    return state
  }
}

const setTheme = (theme: IThemeState) => {
  const elements = document.getElementsByTagName('html')
  const html = elements[0]

  if (theme === 'dark') html.classList.add('dark')
  else html.classList.remove('dark')
}

export { reducer as themeReducer }
