import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setCurrentTab, setMaxTabs } from '../actions/tabsActions'
import { setContainer } from '../actions/containerActions'

import Main from './main/Main.jsx'
import Tools from './tabs/Tools.jsx'
import Help from './tabs/Help.jsx'
import Credits from './tabs/Credits.jsx'
import ModInfo from './tabs/ModInfo.jsx'

class MainTabs extends Component {
  constructor (props) {
    super(props)

    this.pages = [
      { title: 'Mods', component: <Main /> },
      { title: 'Tools', component: <Tools /> },
      { title: 'Help', component: <Help /> },
      { title: 'Credits', component: <Credits /> },
    ]

    this.container = React.createRef()
  }

  componentDidMount () {
    this.props.setMaxTabs(this.pages.length)
  }

  componentDidUpdate () {
    if (this.props.container !== undefined) return undefined
    if (this.container.current === null) return undefined

    return this.props.setContainer(this.container.current)
  }

  render () {
    const pages = this.props.selected === null ? this.pages :
      [...this.pages, { title: 'Mod Info', component: <ModInfo /> }]

    const selected = this.props.currentTab > pages.length - 1 ? 0 :
      this.props.currentTab

    return (
      <>
        <div className='tabs'>
          <ul>{ pages.map(({ title }, i) =>
            <li key={ i } className={ selected === i ? 'is-active' : '' }>
              <a
                href='/'
                draggable={ false }
                onClick={ e => {
                  e.preventDefault()
                  if (i !== this.props.currentTab) this.container.current.scrollTop = 0
                  this.props.setCurrentTab(i)
                } }
              >
                { title }
              </a>
            </li>
          ) }</ul>
        </div>

        <div ref={ this.container } className='box' id='main'>
          { pages[selected].component }
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  container: state.container,
  selected: state.mods.selected,
  currentTab: state.tabs.current,
})

export default connect(mapStateToProps, { setCurrentTab, setMaxTabs, setContainer })(MainTabs)
