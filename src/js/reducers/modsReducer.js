import { SET_MODS_RAW, SET_MODS_LIST, SET_SELECTED_MOD } from '../actions/types.js'

/**
 * @typedef {Object} State
 * @property {any[]} raw
 * @property {any[]} list
 * @property {number} selected
 */

/**
 * @typedef {('SET_MODS_RAW'|'SET_MODS_LIST'|'SET_SELECTED_MOD')} ActionType
 */

/**
 * @param {State} state State
 * @param {{ type: ActionType, payload: (any[]|number) }} action Action
 * @returns {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
