import { SET_STATUS, SET_STATUS_TYPE, SET_STATUS_TEXT } from './types'

export const setStatus = (type, text) => dispatch => {
  dispatch({
    type: SET_STATUS,
    payload: { type, text },
  })
}

export const setStatusType = type => dispatch => {
  dispatch({
    type: SET_STATUS_TYPE,
    payload: type,
  })
}

export const setStatusText = text => dispatch => {
  dispatch({
    type: SET_STATUS_TEXT,
    payload: text,
  })
}
