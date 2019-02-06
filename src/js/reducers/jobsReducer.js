import { SET_JOBS, ENQUEUE_JOB, DEQUEUE_JOB } from '../actions/types.js'

/**
 * @typedef {string[]} State
 */

/**
 * @typedef {('SET_JOBS')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (string|string[]) }} action Action
 * @returns {State}
 */
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_JOBS:
      return action.payload
    case ENQUEUE_JOB:
      return [...state, action.payload]
    case DEQUEUE_JOB:
      return state.filter(x => x !== action.payload)
    default:
      return state
  }
}

export default reducer
