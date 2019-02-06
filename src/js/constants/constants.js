/* eslint no-multi-spaces: off */

/**
 * @type {Electron}
 */
const electron = window.require('electron')
const { getCurrentWindow } = electron.remote

// Remote URLs
export const BASE_URL = getCurrentWindow().custom.BASE_URL

// Auto Update Job
export const AUTO_UPDATE_JOB = getCurrentWindow().custom.AUTO_UPDATE_JOB
