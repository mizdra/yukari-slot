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

      <div>
        <Button
          style={{ fontSize: '25px', height: 'auto', padding: '15px', margin: '10px', background: '#d01f1f', color: 'white' }}
          block
          size='large'
          onClick={emitStopSignal}
        >とめる！
        </Button>
        <Button
          style={{ fontSize: '25px', height: 'auto', padding: '15px', margin: '10px' }}
          block
          disabled={leftEye === undefined || rightEye === undefined}
          type='primary'
          href={`https://twitter.com/intent/tweet?text=test`}
          target='_blank'
        >結果をツイート！
        </Button>
      </div>
    </div>
  )
}
