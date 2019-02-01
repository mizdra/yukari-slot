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
        fontSize: '25px',
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
  const url = encodeURIComponent(
    `https://yukari-slot.mizdra.net/share/${leftEye}${rightEye}`,
  )
  return { text, url }
}

function createTweetLink (
  leftEye: number | undefined,
  rightEye: number | undefined,
) {
  const { text, url } = createShareData(leftEye, rightEye)
  const encodedText = encodeURIComponent(text)
  const encodedHashtags = encodeURIComponent('ゆかりスロット')
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}&url=${url}`
}

function share (leftEye: number | undefined, rightEye: number | undefined) {
  const { text, url } = createShareData(leftEye, rightEye)
  navigator
    // ハッシュタグを付加して共有
    .share({ text: `${text} #ゆかりスロット`, url })
    .catch(() => alert('シェアに失敗しました. 再度お試し下さい.'))
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

        {navigator.share ? (
          <ActionButton
            disabled={rightEye === undefined}
            type='primary'
            onClick={() => share(leftEye, rightEye)}
          >
            結果をシェアする！
          </ActionButton>
        ) : (
          <ActionButton
            disabled={rightEye === undefined}
            type='primary'
            href={createTweetLink(leftEye, rightEye)}
            target='_blank'
          >
            結果をツイート！
          </ActionButton>
        )}
      </div>
    </>
  )
}
