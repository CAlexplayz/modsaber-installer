import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { ipcRenderer, shell } from '../../utils/electron'

import { AUTO_UPDATE_JOB, STATUS_LOADING, STATUS_TEXT_LOADING, STATUS_OFFLINE } from '../../constants'

import Context from '../../Context.jsx'
import Status from './Status.jsx'
import Mods from './Mods.jsx'

const funLinks = [
  'https://youtu.be/i8ju_10NkGY',
  'https://youtu.be/C5kGCwJ25Yc',
]

const funLink = () => funLinks[Math.floor(Math.random() * funLinks.length)]

class Main extends Component {
  static contextType = Context

  render () {
    if (this.context.jobs.length > 0 || this.context.status === STATUS_LOADING) {
      return (
        <>
          <Status spin>
            {
              this.context.jobs.includes(AUTO_UPDATE_JOB) ? 'Updating Installer' :
                this.context.status === STATUS_LOADING ?
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

    if (this.context.install.pirated) {
      return (
        <Status icon='fas fa-exclamation-triangle'>
          Pirated Copy Detected<br />
          <a href='/' onClick={ e => {
            e.preventDefault()
            shell.openExternal(funLink())
          } }>
            Override Restriction
          </a>
        </Status>
      )
    }

    if (this.context.status === STATUS_OFFLINE) {
      return (
        <Status icon='fas fa-exclamation-triangle'>
          Connection Error<br />
          <a href='/' onClick={ e => {
            e.preventDefault()
            ipcRenderer.send('get-remote')

            this.context.setStatus(STATUS_LOADING)
            this.context.setStatusText(STATUS_TEXT_LOADING)
          } }>
            Retry
          </a>
        </Status>
      )
    }

    if (this.context.mods.length === 0) {
      return <Status icon='fas fa-exclamation-triangle'>No Mods</Status>
    }

    return <Mods />
  }
}

export default Main
