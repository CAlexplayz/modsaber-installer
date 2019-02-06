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
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
