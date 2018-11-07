import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { YukariEye } from './YukariEye'
import { YukariFace } from './YukariFace'

const useState: <T>(
  t: T,
) => [T, (prev: T | ((t: T) => T)) => void] = (React as any).useState

const useEffect: (f: () => void) => void = (React as any).useEffect

export function Slot () {
  const [leftEye, setLeftEye] = useState<number | undefined>(undefined)
  const [rightEye, setRightEye] = useState<number | undefined>(undefined)

  const [stopSingalCount, setStopSignalCount] = useState<number>(0)

  const emitStopSignal = () => {
    setStopSignalCount(prev => prev + 1)
    console.log('emit')
  }

  return (
    <div>
      <YukariFace>
        <YukariEye stopSignal={stopSingalCount >= 1} onStop={setLeftEye} />
        <YukariEye stopSignal={stopSingalCount >= 2} onStop={setRightEye} />
      </YukariFace>
      <Button onClick={emitStopSignal}>ストップ</Button>
      {
        leftEye !== undefined && rightEye !== undefined &&
        <Button
          type='primary'
          href={`https://twitter.com/intent/tweet?text=test`}
          target='_blank'
        >結果をツイート
        </Button>
      }
    </div>
  )
}
