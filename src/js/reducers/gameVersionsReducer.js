import { SET_GAME_VERSIONS } from '../actions/types.js'

/**
 * @typedef {{ manifest: string, selected: boolean }[]} State
 */

/**
 * @typedef {('SET_GAME_VERSIONS')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: { manifest: string, selected: boolean }[] }} action Action
 * @returns {State}
 */
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_GAME_VERSIONS:
      return action.payload
    default:
      return state
  }
}

export default reducer
