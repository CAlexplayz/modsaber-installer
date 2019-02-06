import { SET_JOBS, ENQUEUE_JOB, DEQUEUE_JOB } from '../actions/types.js'

/**
 * @typedef {Object} Job
 * @property {string} id
 * @property {string} noonce
 */

/**
 * @typedef {Job[]} State
 */

/**
 * @typedef {('SET_JOBS')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (Job|Job[]) }} action Action
 * @returns {State}
 */
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_JOBS:
      return action.payload
    case ENQUEUE_JOB:
      return [...state, action.payload]
    case DEQUEUE_JOB:
      return state.filter(x => x.id !== action.payload.id)
    default:
      return state
  }
}

export default reducer
