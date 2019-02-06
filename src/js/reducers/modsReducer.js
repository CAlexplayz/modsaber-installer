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
const reducer = (state = { raw: [], list: [], selected: null }, action) => {
  switch (action.type) {
    case SET_MODS_RAW:
      return { ...state, raw: action.payload }
    case SET_MODS_LIST:
      return { ...state, list: action.payload }
    case SET_SELECTED_MOD:
      return { ...state, selected: action.payload }
    default:
      return state
  }
}

export default reducer
