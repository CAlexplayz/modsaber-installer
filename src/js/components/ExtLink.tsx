import { shell } from 'electron'
import React from 'react'

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
