import { TwitterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { YukariEye } from './YukariEye'
import { YukariFace } from './YukariFace'

function ActionButton (props: ButtonProps) {
  return (
    <Button
      {...props}
      style={{
        fontSize: 'min(25px, 6vw)',
        height: 'auto',
        padding: '15px',
        margin: '10px 0',
        ...props.style,
      }}
      block
      size='large'
    />
  )
}

interface ShareData {
  text: string
  url: string
}

function createShareData (
  leftEye: number | undefined,
  rightEye: number | undefined,
): ShareData {
  const text =
    leftEye === undefined || rightEye === undefined
      ? 'エラー'
      : leftEye === 1 && rightEye === 1
      ? 'ゆかりちゃん完成！！！'
      : 'ゆかりスロット失敗 😥'
  const url = `https://yukari-slot.mizdra.net/share/${leftEye}${rightEye}`
  return { text, url }
}

function createTweetLink (text: string, url: string) {
  const encodedText = encodeURIComponent(text)
  const encodedHashtags = encodeURIComponent('ゆかりスロット')
  const encodedUrl = encodeURIComponent(url)
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}&url=${encodedUrl}`
}

async function shareWithTwitterIntent (
  leftEye: number | undefined,
  rightEye: number | undefined,
) {
  const { text, url } = createShareData(leftEye, rightEye)
  // navigator.share がない環境やシェアに失敗した場合は
  // Twitter Web Intentにfallbackする
  window.open(createTweetLink(text, url))
}

async function shareWithWebShareAPI (
  leftEye: number | undefined,
  rightEye: number | undefined,
) {
  const { text, url } = createShareData(leftEye, rightEye)
  try {
    await navigator
      // ハッシュタグを付加して共有
      .share({ text: `${text} #ゆかりスロット`, url })
  } catch (e) {
    if (e.name === 'AbortError') return
  }
}

export function Slot () {
  const [leftEye, setLeftEye] = React.useState<number | undefined>(undefined)
  const [rightEye, setRightEye] = React.useState<number | undefined>(undefined)

  const [stopSingalCount, setStopSignalCount] = React.useState<number>(0)

  const emitStopSignal = () => {
    setStopSignalCount((prev) => prev + 1)
  }

  const retry = () => {
    setStopSignalCount(0)
    setLeftEye(undefined)
    setRightEye(undefined)
  }

  return (
    <>
      <YukariFace>
        <YukariEye stopSignal={stopSingalCount >= 1} onStop={setLeftEye} />
        <YukariEye stopSignal={stopSingalCount >= 2} onStop={setRightEye} />
      </YukariFace>

      <div>
        {rightEye === undefined ? (
          <ActionButton
            style={{ background: '#d01f1f', color: 'white' }}
            onClick={emitStopSignal}
          >
            とめる！
          </ActionButton>
        ) : (
          <ActionButton
            style={{ background: '#eee', color: '#333' }}
            onClick={retry}
          >
            もう一回！
          </ActionButton>
        )}

        <ActionButton
          disabled={rightEye === undefined}
          type='primary'
          onClick={() => shareWithTwitterIntent(leftEye, rightEye)}
        >
          結果を<TwitterOutlined />でシェアする！
        </ActionButton>

        {navigator.share && <ActionButton
          disabled={rightEye === undefined}
          type='primary'
          onClick={() => shareWithWebShareAPI(leftEye, rightEye)}
        >
          他の方法でシェアする！
        </ActionButton>}
      </div>
    </>
  )
}
