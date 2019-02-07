import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setContainer } from '../store/container'
import { setCurrentTab, setMaxTabs } from '../store/tabs'

import { IState } from '../store'
import Main from './main/Main'
import Credits from './tabs/Credits'
import Help from './tabs/Help'
import ModInfo from './tabs/ModInfo'
import Tools from './tabs/Tools'

interface IProps {
  currentTab: number
  selected: number | null

  setContainer: typeof setContainer
  setCurrentTab: typeof setCurrentTab
  setMaxTabs: typeof setMaxTabs
}

interface IPage {
  title: string
  component: React.ReactNode
}

class MainTabs extends Component<IProps> {
  public readonly pages: IPage[]
  public readonly container: React.RefObject<HTMLDivElement>

  constructor(props: IProps) {
    super(props)

    this.pages = [
      { title: 'Mods', component: <Main /> },
      { title: 'Tools', component: <Tools /> },
      { title: 'Help', component: <Help /> },
      { title: 'Credits', component: <Credits /> },
    ]

    this.container = React.createRef()
  }

  public componentDidMount() {
    this.props.setMaxTabs(this.pages.length)
    this.props.setContainer(this.container)
  }

  public render() {
    const pages =
      this.props.selected === null
        ? this.pages
        : [...this.pages, { title: 'Mod Info', component: <ModInfo /> }]

    const selected =
      this.props.currentTab > pages.length - 1 ? 0 : this.props.currentTab

    return (
      <>
        <div className='tabs'>
          <ul>
            {pages.map(({ title }, i) => (
              <li key={i} className={selected === i ? 'is-active' : ''}>
                <a
                  href='/'
                  draggable={false}
                  onClick={e => {
                    e.preventDefault()
                    if (
                      i !== this.props.currentTab &&
                      this.container.current !== null
                    ) {
                      this.container.current.scrollTop = 0
                    }
                    this.props.setCurrentTab(i)
                  }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div ref={this.container} className='box' id='main'>
          {pages[selected].component}
        </div>
      </>
    )
  }
}

const mapStateToProps: (state: IState) => IProps = state => ({
  container: state.container,
  currentTab: state.tabs.current,
  selected: state.mods.selected,

  setContainer,
  setCurrentTab,
  setMaxTabs,
})

export default connect(
  mapStateToProps,
  { setCurrentTab, setMaxTabs, setContainer }
)(MainTabs)
