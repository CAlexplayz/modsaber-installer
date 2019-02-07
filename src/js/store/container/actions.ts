import { Dispatch } from 'redux'
import { ContainerActionTypes, IContainerState } from './types'

export const setContainer: (
  container: IContainerState
) => (dispatch: Dispatch) => void = container => dispatch => {
  dispatch({
    payload: container,
    type: ContainerActionTypes.SET_CONTAINER,
  })
}

export const clearContainer: () => (
  dispatch: Dispatch
) => void = () => dispatch => {
  dispatch({
    payload: null,
    type: ContainerActionTypes.CLEAR_CONTAINER,
  })
}
