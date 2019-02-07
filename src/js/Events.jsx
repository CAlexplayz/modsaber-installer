import React, { Component } from 'react'
import Konami from 'react-konami'
import { connect } from 'react-redux'
import { ipcRenderer } from './utils/electron'

import { toggleTheme } from './store/theme'
import { setInstall } from './store/install'
import { setMods, toggleMod } from './store/mods'
import { setGameVersions } from './store/gameVersions'
import { enqueueJob, dequeueJob } from './store/jobs'
import { setStatus, setStatusType, setStatusText } from './store/status'

import { Status, StatusText } from './constants'

class Events extends Component {
  constructor (props) {
    super(props)

    ipcRenderer.on('set-status', (_, { status: type, text }) => {
      if (type) this.props.setStatusType(type)
      if (text) this.props.setStatusText(text)
    })

    ipcRenderer.on('set-path', (_, install) => this.props.setInstall(install))
    ipcRenderer.on('set-remote', (_, { status, statusText, mods, gameVersions }) => {
      if (status === 'error') return this.props.setStatus({ statusText, status: Status.OFFLINE })

      const gvIdx = gameVersions.findIndex(x => x.selected)

      this.props.setStatus(Status.LOADED, StatusText.LOADED)
      this.props.setGameVersions(gameVersions)
      this.props.setMods(gvIdx, mods)

      return undefined
    })

    ipcRenderer.on('queue-job', async (_, { id, task, noonce }) => {
      const resp = await (task === 'enqueue' ? this.props.enqueueJob(id) : this.props.dequeueJob(id))
      ipcRenderer.send('queue-job-resp', { id: resp, noonce })
    })

    window.addEventListener('keydown', ev => {
      if (ev.key !== ' ') return undefined
      if (this.props.selected === null) return undefined

      this.props.toggleMod(this.props.selected)

      ev.preventDefault()
      return false
    })
  }

  componentDidMount () {
    ipcRenderer.send('get-path')
    ipcRenderer.send('get-remote')

    this.props.setStatusText(StatusText.LOADING)
  }

  render () {
    return (
      <>
        { this.props.children }

        <Konami easterEgg={ () => this.props.toggleTheme() } />
      </>
    )
  }
}

const mapStateToProps = state => ({
  selected: state.mods.selected,
})

export default connect(mapStateToProps, {
  setStatus,
  setStatusType,
  setStatusText,
  setInstall,
  setMods,
  toggleMod,
  setGameVersions,
  enqueueJob,
  dequeueJob,
  toggleTheme,
})(Events)
