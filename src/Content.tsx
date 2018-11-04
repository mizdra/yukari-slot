import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import yukari from '../static/img/yukari.png'

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
        <div><Button>さなボタン #いいえ</Button></div>
        <div><img src={yukari} alt='Yukari'/></div>
      </div>
    </Container>
  )
}
