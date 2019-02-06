import { SET_STATUS, SET_STATUS_TYPE, SET_STATUS_TEXT } from '../actions/types.js'
import { STATUS_TEXT_IDLE, STATUS_LOADING } from '../constants/statuses'

/**
 * @typedef {Object} State
 * @property {string} type
 * @property {string} text
 */

/**
 * @typedef {('SET_STATUS'|'SET_STATUS_TYPE'|'SET_STATUS_TEXT')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (string|State) }} action Action
 * @returns {State}
 */
const reducer = (state = { type: STATUS_LOADING, text: STATUS_TEXT_IDLE }, action) => {
  switch (action.type) {
    case SET_STATUS:
      return action.payload
    case SET_STATUS_TYPE:
      return { ...state, type: action.payload }
    case SET_STATUS_TEXT:
      return { ...state, text: action.payload }
    default:
      return state
  }
}

export default reducer
