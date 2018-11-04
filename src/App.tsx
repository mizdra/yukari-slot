import { Layout } from 'antd'
import React from 'react'
import { Content as MyContent } from './Content'

const { Footer, Content } = Layout

export function App () {
  return (
    <>
      <Layout>
        <Content><MyContent /></Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}
