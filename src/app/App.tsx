import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { eyes } from './parts'
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

function useWaitEyeLoaded () {
  async function waitImageLoaded (src: string) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = resolve
    })
  }
  async function waitEyeLoaded () {
    await Promise.all(eyes.map(waitImageLoaded))
  }
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    waitEyeLoaded().then(() => setLoaded(true)).catch()
  }, [])
  return loaded
}

export function App () {
  // NOTE: スロットの構築が画像の高さに依存しているため, 画像が読み込まれる前にスロットを構築してしまうと,
  // スロットが壊れてしまう. そのため, ここでは画像を先読みしてそれからスロットを構築している.
  const loaded = useWaitEyeLoaded()
  return (
    <>
      <Container>
        <Description>
          ボタンを押してゆかりちゃんを完成させよう！
        </Description>
        {loaded && <Slot />}
      </Container>
      <Footer>
        created by <a href='https://twitter.com/mizdra'>@mizdra</a>.
      </Footer>
    </>
  )
}
