import { SET_CONTAINER, CLEAR_CONTAINER } from '../actions/types.js'

/**
 * @typedef {JSX.Element} State
 */

/**
 * @typedef {('SET_CONTAINER'|'CLEAR_CONTAINER')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (JSX.Element|undefined) }} action Action
 * @returns {State}
 */
const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_CONTAINER:
      return action.payload
    case CLEAR_CONTAINER:
      return undefined
    default:
      return state
  }
}

export default reducer
