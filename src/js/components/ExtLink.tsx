import React from 'react'
import { shell } from '../utils/electron'

interface IProps {
  children: string | JSX.Element | JSX.Element[]
  href: string
}

const ExtLink = (props: IProps) => (
  <a
    href='/'
    onClick={e => {
      e.preventDefault()
      shell.openExternal(props.href)
    }}
  >
    {props.children}
  </a>
)

export default ExtLink
