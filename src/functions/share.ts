import Route from 'route-parser'
import { Callack, Event } from './function'

function responseNotFoundPage (callback: Callack) {
  callback(null, {
    statusCode: 404,
    body: `404 Not Found.`,
  })
}

function responseSharePage (callback: Callack, num: string) {
  callback(null, {
    statusCode: 200,
    body: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>リダイレクト中</title>

        <!-- OGP -->
        <meta property="og:title" content="ゆかりスロット" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yukari-slot.netlify.com" />
        <meta property="og:image" content="https://yukari-slot.netlify.com/img/share/${num}.png" />
        <meta property="og:description" content="ボタンを押してゆかりちゃんを完成させよう！" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content="ゆかりスロット" />

        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site:id" content="@mizdra" />

        <meta http-equiv="refresh" content="0 ; URL=https://yukari-slot.netlify.com">
      </head>
      <body>リダイレクト中.</body>
      </html>
    `,
  })
}

function isValidNumber (num: string) {
  return /^\d\d$/.test(num)
}

exports.handler = function (event: Event, context: any, callback: Callack) {
  const route = new Route('/.netlify/functions/share/:num')
  const result = route.match(event.path)

  console.log(result)

  if (result === false || !isValidNumber(result.num)) {
    responseNotFoundPage(callback)
    return
  }

  responseSharePage(callback, result.num)
}
