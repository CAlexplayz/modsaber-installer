import { SET_TABS_MAX, SET_CURRENT_TAB, INCREMENT_TAB_IDX, DECREMENT_TAB_IDX } from '../actions/types.js'

/**
 * @typedef {Object} State
 * @property {number} max
 * @property {number} current
 */

/**
 * @typedef {('SET_TABS_MAX'|'SET_CURRENT_TAB'|'INCREMENT_TAB_IDX'|'DECREMENT_TAB_IDX')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (number|undefined) }} action Action
 * @returns {State}
 */
const reducer = (state = { max: 0, current: 0 }, action) => {
  switch (action.type) {
    case SET_TABS_MAX:
      return { ...state, max: action.payload }
    case SET_CURRENT_TAB:
      return { ...state, current: action.payload }
    case INCREMENT_TAB_IDX:
      return { ...state, current: Math.min(state.current + 1, state.max) }
    case DECREMENT_TAB_IDX:
      return { ...state, current: Math.max(state.current - 1, 0) }
    default:
      return state
  }
}

export default reducer
