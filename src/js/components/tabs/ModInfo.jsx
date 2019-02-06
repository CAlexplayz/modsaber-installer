import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import MarkdownRenderer from '../Markdown'

const ModInfo = ({ mod }) =>
  <>
    <Helmet>
      <style>
        { `div.box#main { justify-content: initial; align-items: initial; padding: 15px; overflow-y: scroll; }` }
      </style>
    </Helmet>

    <div className='content'>
      <h1>{ mod.details.title }</h1>
      <hr />

      <MarkdownRenderer source={ mod.details.description } />
    </div>
  </>

const mapStateToProps = state => ({
  mod: state.mods.list[state.mods.selected],
})

export default connect(mapStateToProps)(ModInfo)
