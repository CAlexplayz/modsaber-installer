import { Dispatch } from 'redux'
import { GameVersionActionTypes, IGameVersionState } from './types'

export const setGameVersions: (
  gv: IGameVersionState
) => (dispatch: Dispatch) => void = gv => dispatch => {
  dispatch({
    payload: gv,
    type: GameVersionActionTypes.SET_GAME_VERSIONS,
  })
}
