import { Reducer } from 'redux'
import { electronStore } from '../../utils/electron'
import { IThemeState, ThemeActionTypes } from './types'

const reducer: Reducer<IThemeState> = (state = 'light', action) => {
  if (action.type === ThemeActionTypes.SET_THEME) {
    const theme = state === 'light' ? 'dark' : 'light'

    setTheme(theme)
    electronStore.set('theme', theme)

    return theme
  } else if (action.type === ThemeActionTypes.LOAD_THEME) {
    const theme = electronStore.get('theme') || 'light'
    setTheme(theme)

    return theme
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
