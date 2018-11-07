import React from 'react'
import styled from 'styled-components'
import { Slot } from './Slot'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export function Content () {
  return (
    <Container>
      <div>
        <div>Titile</div>
        <Slot />
      </div>
    </Container>
  )
}
