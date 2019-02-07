import { Reducer } from 'redux'
import { GameVersionActionTypes, IGameVersionState } from './types'

const reducer: Reducer<IGameVersionState> = (state = [], action) => {
  switch (action.type) {
    case GameVersionActionTypes.SET_GAME_VERSIONS:
      return action.payload
    default:
      return state
  }
}

export { reducer as gameVersionReducer }
