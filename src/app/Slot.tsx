import { TwitterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React, { useEffect } from 'react'
import { usePrevious } from './hooks/use-previous'
import { shareWithTwitterIntent, shareWithWebShareAPI } from './lib/share'
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
