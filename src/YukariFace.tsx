import React from 'react'
import styled from 'styled-components'
import { face, hairback, hair } from './parts'

export interface Props {
  children: React.ReactNode
}

const Container = styled.div<{hairback: string, face: string}>`
  background-image:
    url("${props => props.face}"),
    url("${props => props.hairback}");
  display: flex;
  width: 512px;
  height: 512px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position:relative;
`

const Mask = styled.div<{hair: string}>`
  background-image:
    url("${props => props.hair}");
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
`

export function YukariFace (props: Props) {
  return (
    <Container face={face} hairback={hairback} hair={hair}>
      <Mask hair={hair} />
      {props.children}
    </Container>
  )
}
