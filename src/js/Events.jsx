import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from './utils/electron'

import { setInstall } from './actions/installActions'
import { setMods } from './actions/modsActions'
import { setGameVersions } from './actions/gameVersionsActions'
import { setStatus, setStatusType, setStatusText } from './actions/statusActions'

import {
  STATUS_LOADING,
  STATUS_LOADED,
  STATUS_OFFLINE,
  STATUS_TEXT_LOADING,
  STATUS_TEXT_LOADED,
  STATUS_TEXT_IDLE,
  MODS_DEFAULT,
  MODS_REQUIRED,
  CATEGORY_DEFAULT,
  ERR_NOT_SATISFIED,
} from './constants'

class Events extends Component {
  constructor (props) {
    super(props)

    ipcRenderer.on('set-status', (_, { status: type, text }) => {
      if (type) this.props.setStatusType(type)
      if (text) this.props.setStatusText(text)
    })

    ipcRenderer.on('set-path', (_, install) => this.props.setInstall(install))
    ipcRenderer.on('set-remote', (_, { status, statusText, mods, gameVersions }) => {
      if (status === 'error') return this.props.setStatus({ statusText, status: STATUS_OFFLINE })

      const gvIdx = gameVersions.findIndex(x => x.selected)

      this.props.setStatus(STATUS_LOADED, STATUS_TEXT_LOADED)
      this.props.setGameVersions(gameVersions)
      this.props.setMods(gvIdx, mods)

      // return this.setState({
      //   statusText: STATUS_TEXT_LOADED,
      //   status: STATUS_LOADED,
      //   rawMods: mods,
      //   gameVersions,
      // }, () => { this.filterMods(gvIdx) })
    })
  }

  componentDidMount () {
    ipcRenderer.send('get-path')
    ipcRenderer.send('get-remote')

    this.props.setStatusText(STATUS_TEXT_LOADING)
  }

  render () {
    return this.props.children
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
  setStatus,
  setStatusType,
  setStatusText,
  setInstall,
  setMods,
  setGameVersions,
})(Events)
