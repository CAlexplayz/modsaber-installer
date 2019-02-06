import uuid from 'uuid/v4'
import { SET_JOBS, ENQUEUE_JOB, DEQUEUE_JOB } from './types'

export const setJobs = jobs => dispatch => {
  dispatch({
    type: SET_JOBS,
    payload: jobs,
  })
}

export const enqueueJob = id => dispatch => {
  const uid = id || uuid()

  dispatch({
    type: ENQUEUE_JOB,
    payload: uid,
  })

  return uid
}

export const dequeueJob = id => dispatch => {
  dispatch({
    type: DEQUEUE_JOB,
    payload: id,
  })

  return id
}
