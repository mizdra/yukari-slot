import { LocaleProvider } from 'antd'
import 'antd/dist/antd.css'
import jaJP from 'antd/lib/locale-provider/ja_JP'
import React from 'react'
import ReactDOM from 'react-dom'
import 'web-animations-js'
import { App } from './App'

ReactDOM.render((
  <LocaleProvider locale={jaJP}>
    <App />
  </LocaleProvider>
), document.getElementById('app'))
