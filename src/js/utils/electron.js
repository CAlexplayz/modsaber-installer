/**
 * @type {Electron}
 */
const electron = window.require('electron')

/**
 * @type {typeof import('electron-store')}
 */
const Store = window.require('electron-store')
const store = new Store()

export default electron
export const remote = electron.remote
export const shell = electron.shell
export const ipcRenderer = electron.ipcRenderer
export const app = electron.remote.app
export const dialog = electron.remote.dialog
export const getCurrentWindow = electron.remote.getCurrentWindow

export { store as electronStore }
