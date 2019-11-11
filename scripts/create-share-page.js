const fs = require('fs')

function render(numStr) {
  const html =
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>リダイレクト中</title>

    <!-- OGP -->
    <meta property="og:title" content="ゆかりスロット" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yukari-slot.mizdra.net" />
    <meta
      property="og:image"
      content="https://yukari-slot.mizdra.net/img/share/${numStr}.png"
    />
    <meta
      property="og:description"
      content="ボタンを押してゆかりちゃんを完成させよう！"
    />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="ゆかりスロット" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site:id" content="@mizdra" />

    <meta
      http-equiv="refresh"
      content="0 ; URL=https://yukari-slot.mizdra.net"
    />
  </head>
  <body>
    リダイレクト中.
  </body>
</html>
  `.trim() + '\n'
  return html
}

for (let i = 0; i < 100; i++) {
  const numStr = i.toString().padStart(2, '0')
  const renderedHtml = render(numStr)
  fs.writeFileSync(`./static/share/${numStr}.html`, renderedHtml)
}
