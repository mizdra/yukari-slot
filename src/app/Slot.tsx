import { TwitterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React, { useEffect } from 'react'
import { YukariEye, YukariEyeHandler } from './YukariEye'
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

/** 以前の値を返すHook */
function usePrevious<T> (value: T) {
  const ref = React.useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function Slot () {
  const [leftEye, setLeftEye] = React.useState<number | undefined>(undefined)
  const [rightEye, setRightEye] = React.useState<number | undefined>(undefined)

  // 配列で管理しているので目が 3 つに増えても大丈夫
  const [isReelRollings, setIsReelRollings] = React.useState([true, true])
  const refs = React.useRef([React.createRef<YukariEyeHandler>(), React.createRef<YukariEyeHandler>()])

  const handleStop = () => {
    // 先頭から順に true になっているものを探して false にする
    const index = isReelRollings.indexOf(true)
    // ref: https://stackoverflow.com/questions/38060705/replace-element-at-specific-position-in-an-array-without-mutating-it
    setIsReelRollings(Object.assign([], isReelRollings, { [index]: false }))
  }

  const retry = () => {
    setIsReelRollings([true, true])
    setLeftEye(undefined)
    setRightEye(undefined)
  }

  const prevIsReelRollings = usePrevious(isReelRollings)
  // isReelRollings を監視して値が変わったら start/stop する
  useEffect(() => {
    // 初回の call ではそもそも停止ボタンは押されないので無視して良い
    if (prevIsReelRollings === undefined) return

    isReelRollings.forEach((isReelRolling, idx) => {
      if (prevIsReelRollings[idx] === isReelRolling) return
      if (prevIsReelRollings[idx] && !isReelRolling) return refs.current[idx].current?.stop()
      if (!prevIsReelRollings[idx] && isReelRolling) return refs.current[idx].current?.start()
    })
  }, [isReelRollings, prevIsReelRollings, refs])

  return (
    <>
      <YukariFace>
        <YukariEye ref={refs.current[0]} onStop={setLeftEye} />
        <YukariEye ref={refs.current[1]} onStop={setRightEye} />
      </YukariFace>

      <div>
        {rightEye === undefined ? (
          <ActionButton
            style={{ background: '#d01f1f', color: 'white' }}
            onClick={handleStop}
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
