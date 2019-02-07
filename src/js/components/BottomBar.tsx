import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shell } from '../utils/electron'

import { Status } from '../constants'
import { IMod } from '../models/modsaber'
import { IState } from '../store'
import { IContainerState } from '../store/container'
import { IJobsState } from '../store/jobs'
import { installMods } from '../store/mods'
import { IStatusState } from '../store/status'
import { ITabsState, setCurrentTab, setMaxTabs } from '../store/tabs'

interface IProps {
  container: IContainerState
  jobs: IJobsState
  mods: IMod[]
  pirated: boolean
  selected: number | null
  status: IStatusState
  tabs: ITabsState

  installMods: typeof installMods
  setCurrentTab: typeof setCurrentTab
  setMaxTabs: typeof setMaxTabs
}

class BottomBar extends Component<IProps> {
  public handleModInfo() {
    const tab =
      this.props.tabs.current !== this.props.tabs.max ? this.props.tabs.max : 0

    if (this.props.container !== null) this.props.container.scrollTop = 0
    return this.props.setCurrentTab(tab)
  }

  public render() {
    return (
      <>
        <span className='status'>
          {this.props.status.type === Status.OFFLINE ? 'Error' : 'Status'}:{' '}
          {this.props.status.text}
        </span>

        <button
          className='button'
          disabled={this.props.pirated || this.props.selected === null}
          onClick={() => this.handleModInfo()}
        >
          {this.props.tabs.current !== this.props.tabs.max
            ? 'View Selected Mod Info'
            : 'Go Back'}
        </button>

        {this.props.pirated ? (
          <button
            className='button'
            onClick={() => shell.openExternal('https://beatgames.com/')}
          >
            Buy the Game
          </button>
        ) : (
          <button
            className={`button${
              this.props.jobs.length > 0 ? ' is-loading' : ''
            }`}
            disabled={
              this.props.jobs.length > 0 ||
              this.props.status.type === Status.LOADING ||
              this.props.mods.length === 0
            }
            onClick={() => {
              this.props.installMods()
            }}
          >
            Install / Update
          </button>
        )}
      </>
    )
  }
}

const mapStateToProps: (state: IState) => IProps = state => ({
  container: state.container,
  jobs: state.jobs,
  mods: state.mods.list,
  pirated: state.install.pirated,
  selected: state.mods.selected,
  status: state.status,
  tabs: state.tabs,

  installMods,
  setCurrentTab,
  setMaxTabs,
})

export default connect(
  mapStateToProps,
  { installMods, setCurrentTab, setMaxTabs }
)(BottomBar)
