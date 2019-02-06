/* eslint no-multi-spaces: off */
import { getCurrentWindow } from '../utils/electron'

// Remote URLs
export const BASE_URL = getCurrentWindow().custom.BASE_URL

// Auto Update Job
export const AUTO_UPDATE_JOB = getCurrentWindow().custom.AUTO_UPDATE_JOB
