import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from '../../utils/electron'
import { openLog, uploadLog } from '../../utils/logs'

import { IState } from '../../store'
import { IInstallState } from '../../store/install'
import { IJobsState } from '../../store/jobs'
import { IStatusState } from '../../store/status'
import { IThemeState, toggleTheme } from '../../store/theme'

import { Status } from '../../constants'
import Styler from '../Styler'

interface IProps {
  install: IInstallState
  jobs: IJobsState
  status: IStatusState
  theme: IThemeState

  toggleTheme: typeof toggleTheme
}

const toolsStyles = `div.box#main {
  justify-content: initial; align-items: initial; padding: 15px; padding-top: 8px; overflow-y: scroll;
}`

class Tools extends Component<IProps> {
  public render() {
    const working = this.props.jobs.length > 0
    const disabled = working || this.props.status.type === Status.LOADING

    return (
      <>
        <Styler content={toolsStyles} />

        <div className='content tools'>
          <h1>Theme</h1>
          <button className='button' onClick={() => this.props.toggleTheme()}>
            Activate {this.props.theme === 'dark' ? 'Light' : 'Dark'} Theme
          </button>

          <hr />
          <h1>Diagnostics</h1>
          <button
            className={`button${working ? ' is-loading' : ''}`}
            disabled={disabled}
            onClick={() => ipcRenderer.send('run-diagnostics')}
          >
            Run Diagnostics
          </button>
          <button
            className={`button${working ? ' is-loading' : ''}`}
            disabled={disabled}
            onClick={() => ipcRenderer.send('patch-game', this.props.install)}
          >
            Patch Game
          </button>

          <hr />
          <h1>ModSaber Installer Log</h1>
          <button className='button' onClick={() => openLog()}>
            Open Log
          </button>
          <button className='button' onClick={() => uploadLog()}>
            Upload Log
          </button>
        </div>
      </>
    )
  }
}

const mapStateToProps: (state: IState) => IProps = state => ({
  install: state.install,
  jobs: state.jobs,
  status: state.status,
  theme: state.theme,

  toggleTheme,
})

export default connect(
  mapStateToProps,
  { toggleTheme }
)(Tools)
