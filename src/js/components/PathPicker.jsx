import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer, dialog, getCurrentWindow } from '../utils/electron'

import { setMods } from '../store/mods'
import { setGameVersions } from '../store/gameVersions'
import { Status } from '../constants'

class PathPicker extends Component {
  componentDidMount () {
    ipcRenderer.on('invalid-path', (_, path) => {
      dialog.showMessageBox(getCurrentWindow(), {
        title: 'Invalid Path',
        type: 'error',
        message: "The directory you selected doesn't contain Beat Saber.exe!\nPlease try again.",
      }, () => { this.openDialog(path) })
    })

    ipcRenderer.on('unknown-path', () => {
      dialog.showMessageBox(getCurrentWindow(), {
        title: 'Unknown Install Directory',
        type: 'error',
        message: 'We could not automatically find your Beat Saber install folder.\nPlease select it manually.',
      }, () => { this.openDialog() })
    })
  }

  openDialog (defaultPath) {
    dialog.showOpenDialog(getCurrentWindow(), {
      properties: ['openDirectory'],
      defaultPath: defaultPath || this.props.install.path || undefined,
    }, paths => {
      if (paths === undefined) return
      const [path] = paths
      ipcRenderer.send('set-path', path)
    })
  }

  switchVersion (gv) {
    const gameVersions = JSON.parse(JSON.stringify(this.props.gameVersions))
      .map(x => {
        delete x.selected
        if (x.manifest === gv.manifest) x.selected = true

        return x
      })

    const idx = gameVersions.findIndex(x => x.manifest === gv.manifest)

    this.props.setGameVersions(gameVersions)
    this.props.setMods(idx)
  }

  render () {
    return (
      <>
        <div className='field is-expanded has-addons' style={{ flexGrow: 1 }}>
          <div className='control has-icons-left is-fullwidth'>
            <input
              type='text'
              className='input monospaced'
              readOnly
              value={ this.props.install.path || '' }
            />

            <span className='icon is-left'>
              <i className='far fa-folder-open'></i>
            </span>
          </div>

          <div className='control'>
            <button className='button' onClick={ () => { this.openDialog() }}>
              ..
            </button>
          </div>
        </div>

        <div className='select' style={{ marginLeft: '10px' }} onChange={ e => { this.switchVersion(JSON.parse(e.target.value)) } }>
          <select disabled={
            this.props.jobs.length > 0 ||
            this.props.status === Status.LOADING ||
            this.props.status === Status.OFFLINE
          }>
            { this.props.gameVersions.map((gv, i) =>
              <option value={ JSON.stringify(gv) } selected={ gv.selected } key={ i }>
                { gv.value }
              </option>)
            }
          </select>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  status: state.status,
  jobs: state.jobs,
  install: state.install,
  gameVersions: state.gameVersions,
})

export default connect(mapStateToProps, { setMods, setGameVersions })(PathPicker)
