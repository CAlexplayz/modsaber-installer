import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { ipcRenderer, shell } from '../../utils/electron'

import { setStatus } from '../../actions/statusActions'
import { AUTO_UPDATE_JOB, STATUS_LOADING, STATUS_TEXT_LOADING, STATUS_OFFLINE } from '../../constants'

import Status from './Status.jsx'
import Mods from './Mods.jsx'

const piracyLink = () => {
  const links = [
    'https://youtu.be/i8ju_10NkGY',
    'https://youtu.be/C5kGCwJ25Yc',
  ]

  return links[Math.floor(Math.random() * links.length)]
}

class Main extends Component {
  render () {
    if (this.props.jobs.length > 0 || this.props.status.type === STATUS_LOADING) {
      return (
        <>
          <Status spin>
            {
              this.props.jobs.includes(AUTO_UPDATE_JOB) ? 'Updating Installer' :
                this.props.status.type === STATUS_LOADING ?
                  'Loading' :
                  'Working'
            }...
          </Status>
          <Helmet>
            <style>{`* { cursor: progress !important; }`}</style>
          </Helmet>
        </>
      )
    }

    if (this.props.install.pirated) {
      return (
        <Status icon='fas fa-exclamation-triangle'>
          Pirated Copy Detected<br />
          <a href='/' onClick={ e => {
            e.preventDefault()
            shell.openExternal(piracyLink())
          } }>
            Override Restriction
          </a>
        </Status>
      )
    }

    if (this.props.status.type === STATUS_OFFLINE) {
      return (
        <Status icon='fas fa-exclamation-triangle'>
          Connection Error<br />
          <a href='/' onClick={ e => {
            e.preventDefault()
            ipcRenderer.send('get-remote')

            this.props.setStatus(STATUS_LOADING, STATUS_TEXT_LOADING)
          } }>
            Retry
          </a>
        </Status>
      )
    }

    if (this.props.mods.length === 0) {
      return <Status icon='fas fa-exclamation-triangle'>No Mods</Status>
    }

    return <Mods />
  }
}

const mapStateToProps = state => ({
  mods: state.mods,
  jobs: state.jobs,
  install: state.install,
  status: state.status,
})

export default connect(mapStateToProps, { setStatus })(Main)
