import { Button, Layout } from 'antd'
import React from 'react'
import yukari from '../static/img/yukari.png'

const { Footer, Content } = Layout

export function App () {
  return (
    <>
      <Layout>
        <Content>
          <div>Titile</div>
          <div><Button>さなボタン #いいえ</Button></div>
          <div><img src={yukari} alt='Yukari'/></div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}
