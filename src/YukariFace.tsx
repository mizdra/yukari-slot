import React from 'react'
import yukari from '../static/img/yukari.png'

export interface Props {
  children: React.ReactNode
}

export function YukariFace (props: Props) {
  return (
    <div>
      {props.children}
    </div>
  )
}
