import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { ipcRenderer } from '../../utils/electron'
import { openLog, uploadLog } from '../../utils/logs'

import { toggleTheme } from '../../store/theme'
import { Status } from '../../constants'

class Tools extends Component {
  render () {
    const working = this.props.jobs.length > 0
    const disabled = working || this.props.status.type === Status.LOADING

    return (
      <>
        <Helmet>
          <style>
            { `div.box#main { justify-content: initial; align-items: initial; padding: 15px; padding-top: 8px; overflow-y: scroll; }` }
          </style>
        </Helmet>

        <div className='content tools'>
          <h1>Theme</h1>
          <button
            className='button'
            onClick={ () => this.props.toggleTheme() }>Activate { this.props.theme === 'dark' ? 'Light' : 'Dark' } Theme
          </button>

          <hr />
          <h1>Diagnostics</h1>
          <button className={ `button${working ? ' is-loading' : ''}` } disabled={ disabled }
            onClick={ () => ipcRenderer.send('run-diagnostics') }>Run Diagnostics</button>
          <button className={ `button${working ? ' is-loading' : ''}` } disabled={ disabled }
            onClick={ () => ipcRenderer.send('patch-game', this.props.install) }>Patch Game</button>

          <hr />
          <h1>ModSaber Installer Log</h1>
          <button className='button' onClick={ () => openLog() }>Open Log</button>
          <button className='button' onClick={ () => uploadLog() }>Upload Log</button>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
  install: state.install,
  status: state.status,
  jobs: state.jobs,
})

export default connect(mapStateToProps, { toggleTheme })(Tools)
