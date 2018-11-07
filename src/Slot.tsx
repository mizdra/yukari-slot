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

  const symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <YukariFace>
        <YukariEye duration={200} symbolHight={131} stopSignal={stopSingalCount >= 1} symbols={symbols} onStop={setLeftEye} />
        <YukariEye duration={200} symbolHight={131} stopSignal={stopSingalCount >= 2} symbols={symbols} onStop={setRightEye} />
      </YukariFace>
      <Button onClick={emitStopSignal}>ストップ</Button>
      {
        rightEye !== undefined &&
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
