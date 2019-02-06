import { SET_INSTALL, SET_INSTALL_PATH, SET_INSTALL_PLATFORM } from './types'

export const setInstall = install => dispatch => {
  dispatch({
    type: SET_INSTALL,
    payload: install,
  })
}

export const setInstallPath = path => dispatch => {
  dispatch({
    type: SET_INSTALL_PATH,
    payload: path,
  })
}

export const setInstallPlatform = platform => dispatch => {
  dispatch({
    type: SET_INSTALL_PLATFORM,
    payload: platform,
  })
}
