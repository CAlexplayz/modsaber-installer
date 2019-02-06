import { SET_GAME_VERSIONS } from './types'

export const setGameVersions = gv => dispatch => {
  dispatch({
    type: SET_GAME_VERSIONS,
    payload: gv,
  })
}
