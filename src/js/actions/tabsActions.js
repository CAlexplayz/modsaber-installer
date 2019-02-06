import { SET_TABS_MAX, SET_CURRENT_TAB, INCREMENT_TAB_IDX, DECREMENT_TAB_IDX } from './types'

export const setCurrentTab = tab => dispatch => {
  dispatch({
    type: SET_CURRENT_TAB,
    payload: tab,
  })
}

export const setMaxTabs = max => dispatch => {
  dispatch({
    type: SET_TABS_MAX,
    payload: max,
  })
}

export const incrementTab = () => dispatch => {
  dispatch({
    type: INCREMENT_TAB_IDX,
  })
}

export const decrementTab = () => dispatch => {
  dispatch({
    type: DECREMENT_TAB_IDX,
  })
}
