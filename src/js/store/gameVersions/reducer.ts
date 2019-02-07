import { Reducer } from 'redux'
import { GameVersionActionTypes, IGameVersionState } from './types'

const initialState: IGameVersionState = {
  selected: 0,
  values: [],
}

const reducer: Reducer<IGameVersionState> = (state = initialState, action) => {
  switch (action.type) {
    case GameVersionActionTypes.SET_GAME_VERSIONS:
      return { ...state, values: action.payload, selected: 0 }
    case GameVersionActionTypes.SET_SELECTED_GAME_VERSION:
      return {
        ...state,
        selected: Math.min(Math.max(0, action.payload), state.values.length),
      }
    default:
      return state
  }
}

export { reducer as gameVersionReducer }
