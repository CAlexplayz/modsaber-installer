import { SET_CONTAINER } from './types'

export const setContainer = container => dispatch => {
  dispatch({
    type: SET_CONTAINER,
    payload: container,
  })
}
