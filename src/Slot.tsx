import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import styled from 'styled-components'
import { YukariEye } from './YukariEye'
import { YukariFace } from './YukariFace'

const useState: <T>(
  t: T,
) => [T, (prev: T | ((t: T) => T)) => void] = (React as any).useState

const useEffect: (f: () => void) => void = (React as any).useEffect

function ActionButton (props: {} & ButtonProps) {
  return (
    <Button
      {...props}
      style={{ fontSize: '25px', height: 'auto', padding: '15px', margin: '10px', ...props.style }}
      block
      size='large'
    />
  )
}

export function Slot () {
  const [leftEye, setLeftEye] = useState<number | undefined>(undefined)
  const [rightEye, setRightEye] = useState<number | undefined>(undefined)

  const [stopSingalCount, setStopSignalCount] = useState<number>(0)

  const emitStopSignal = () => {
    setStopSignalCount(prev => prev + 1)
    console.log('emit')
  }

  const retry = () => {
    setStopSignalCount(0)
    setLeftEye(undefined)
    setRightEye(undefined)
  }

  return (
    <div>
      <YukariFace>
        <YukariEye stopSignal={stopSingalCount >= 1} onStop={setLeftEye} />
        <YukariEye stopSignal={stopSingalCount >= 2} onStop={setRightEye} />
      </YukariFace>

      <div>
        {
          rightEye === undefined ?
            <ActionButton
              style={{ background: '#d01f1f', color: 'white' }}
              onClick={emitStopSignal}
            >とめる！
            </ActionButton>
          :
            <ActionButton
              style={{ background: '#eee', color: '#333' }}
              onClick={retry}
            >もう一回！
            </ActionButton>
        }
        <ActionButton
          disabled={rightEye === undefined}
          type='primary'
          href={`https://twitter.com/intent/tweet?text=test`}
          target='_blank'
        >結果をツイート！
        </ActionButton>
      </div>
    </div>
  )
}
