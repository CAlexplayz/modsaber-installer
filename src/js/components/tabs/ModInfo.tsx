import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import { IMod } from '../../models/modsaber'
import { IState } from '../../store'
import MarkdownRenderer from '../Markdown'

interface IProps {
  mod: IMod
}

const ModInfo: React.FunctionComponent<IProps> = ({ mod }) => (
  <>
    <Helmet>
      <style>
        {`div.box#main { justify-content: initial; align-items: initial; padding: 15px; overflow-y: scroll; }`}
      </style>
    </Helmet>

    <div className='content'>
      <h1>{mod.details.title}</h1>
      <hr />

      <MarkdownRenderer source={mod.details.description} />
    </div>
  </>
)

const mapStateToProps: (state: IState) => IProps = state => ({
  mod: state.mods.list[state.mods.selected as number],
})

export default connect(mapStateToProps)(ModInfo)
