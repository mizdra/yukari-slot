import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { getLowerDateSymbols, getLowerMonthSymbols, getUpperDateSymbols, getUpperMonthSymbols } from './lib/symbol'
import { YukariEye } from './YukariEye'
import { YukariFace } from './YukariFace'

const Unit = styled.span`
  font-size: 100px;
  vertical-align: middle;
`

const useState: <T>(
  t: T,
) => [T, (prev: T | ((t: T) => T)) => void] = (React as any).useState

const useEffect: (f: () => void) => void = (React as any).useEffect

export function Slot () {
  const [upperMonth, setUpperMonth] = useState<number | undefined>(undefined)
  const [lowerMonth, setLowerMonth] = useState<number | undefined>(undefined)
  const [upperDate, setUpperDate] = useState<number | undefined>(undefined)
  const [lowerDate, setLowerDate] = useState<number | undefined>(undefined)

  const [stopSingalCount, setStopSignalCount] = useState<number>(0)

  const upperMonthSymbols = getUpperMonthSymbols()
  const lowerMonthSymbols = getLowerMonthSymbols(upperMonth)
  const upperDateSymbols = getUpperDateSymbols(upperMonth, lowerMonth)
  const lowerDateSymbols = getLowerDateSymbols(upperMonth, lowerMonth, upperDate)

  const emitStopSignal = () => {
    setStopSignalCount(prev => prev + 1)
    console.log('emit')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <YukariFace>
        <YukariEye duration={200} symbolHight={131} stopSignal={stopSingalCount >= 1} symbols={upperMonthSymbols} onStop={setUpperMonth} />
        <YukariEye duration={200} symbolHight={131} stopSignal={stopSingalCount >= 2} symbols={lowerMonthSymbols} onStop={setLowerMonth} />
      </YukariFace>
      <Unit>月</Unit>
      <YukariFace>
        <YukariEye duration={200} symbolHight={131} stopSignal={stopSingalCount >= 3} symbols={upperDateSymbols} onStop={setUpperDate} />
        <YukariEye duration={200} symbolHight={131} stopSignal={stopSingalCount >= 4} symbols={lowerDateSymbols} onStop={setLowerDate} />
      </YukariFace>
      <Unit>日</Unit>
      <Button onClick={emitStopSignal}>ストップ</Button>
      {
        lowerDate !== undefined &&
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
