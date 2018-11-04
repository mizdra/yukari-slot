import React from 'react'
import yukari from '../static/img/yukari.png'

export interface Props {
  children: React.ReactNode
}

export function YukariFace (props: Props) {
  return <img src={yukari} width='256' height='256' alt='Yukari'/>
}
