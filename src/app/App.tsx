import React from 'react'
import styled from 'styled-components'
import { Slot } from './Slot'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: "M PLUS Rounded 1c";
  padding: 10px;
`

const Description = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`

const Footer = styled.div`
  /* background: #eee; */
  color: #777;
  text-align: center;
  margin-top: 30px;
  padding: 20px 0;
  border-top: 1px solid #ddd;
`

export function App () {
  return (
    <>
      <Container>
        <Description>
          ボタンを押してゆかりちゃんを完成させよう！
        </Description>
        <Slot />
      </Container>
      <Footer>
        created by <a href='https://twitter.com/mizdra'>@mizdra</a>.
      </Footer>
    </>
  )
}
