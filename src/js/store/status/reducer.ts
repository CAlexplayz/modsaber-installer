import { Reducer } from 'redux'
import { Status, StatusText } from '../../constants'
import { IStatusState, StatusActionTypes } from './types'

const initialState: IStatusState = {
  text: StatusText.IDLE,
  type: Status.LOADING,
}

const reducer: Reducer<IStatusState> = (state = initialState, action) => {
  switch (action.type) {
    case StatusActionTypes.SET_STATUS:
      return action.payload
    case StatusActionTypes.SET_STATUS_TYPE:
      return { ...state, type: action.payload }
    case StatusActionTypes.SET_STATUS_TEXT:
      return { ...state, text: action.payload }
    default:
      return state
  }
}

export { reducer as statusReducer }
