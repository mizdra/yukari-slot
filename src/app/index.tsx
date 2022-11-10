import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'web-animations-js';
import { App } from './App';

const root = createRoot(document.getElementById('app')!);

root.render(
  <ConfigProvider locale={jaJP}>
    <App />
  </ConfigProvider>,
);
