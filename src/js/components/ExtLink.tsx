import React from 'react'
import { shell } from '../utils/electron'

interface IProps {
  children: React.ReactNode
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
