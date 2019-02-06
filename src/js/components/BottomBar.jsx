import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shell } from '../utils/electron'

import { setCurrentTab, setMaxTabs } from '../actions/tabsActions'
import { STATUS_LOADING, STATUS_OFFLINE } from '../constants'

class BottomBar extends Component {
  handleModInfo () {
    const tab = this.props.tabs.current !== this.props.tabs.max ?
      this.props.tabs.max : 0

    if (this.props.container !== null) this.props.container.scrollTop = 0
    return this.props.setCurrentTab(tab)
  }

  render () {
    return (
      <>
        <span className='status'>
          { this.props.status.type === STATUS_OFFLINE ? 'Error' : 'Status' }: { this.props.status.text }
        </span>

        <button
          className='button'
          disabled={ this.props.install.pirated || this.props.selected === null }
          onClick={ () => this.handleModInfo() }
        >
          { this.props.tabs.current !== this.props.tabs.max ? 'View Selected Mod Info' : 'Go Back' }
        </button>

        {
          this.props.install.pirated ?
            <button className='button' onClick={ () => shell.openExternal('https://beatgames.com/') }>Buy the Game</button> :
            <button
              className={ `button${this.props.jobs.length > 0 ? ' is-loading' : ''}` }
              disabled={
                this.props.jobs.length > 0 ||
                this.props.status.type === STATUS_LOADING ||
                this.props.mods.length === 0
              }
              onClick={ () => { this.context.installMods() } }
            >
            Install / Update
            </button>
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  status: state.status,
  tabs: state.tabs,
  install: state.install,
  mods: state.mods,
  jobs: state.jobs,
  container: state.container,
})

export default connect(mapStateToProps, { setCurrentTab, setMaxTabs })(BottomBar)
