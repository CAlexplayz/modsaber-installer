import React from 'react'
import PropTypes from 'prop-types'
import { shell } from '../utils/electron'

const ExtLink = props =>
  <a
    href='/'
    onClick={ e => {
      e.preventDefault()
      shell.openExternal(props.href)
    } }
  >
    { props.children }
  </a>

ExtLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
}

export default ExtLink
