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

  const [signals, setSignals] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false])

  const upperMonthSymbols = getUpperMonthSymbols()
  const lowerMonthSymbols = getLowerMonthSymbols(upperMonth)
  const upperDateSymbols = getUpperDateSymbols(upperMonth, lowerMonth)
  const lowerDateSymbols = getLowerDateSymbols(upperMonth, lowerMonth, upperDate)

  const emitStopSignal = () => {
    console.log('emit')
  }

  return (
    <div>
      <YukariFace>
        <YukariEye stopSignal={signals[0]} symbols={upperMonthSymbols} onStop={setUpperMonth} />
        <YukariEye stopSignal={signals[1]} symbols={lowerMonthSymbols} onStop={setLowerMonth} />
      </YukariFace>
      <Unit>月</Unit>
      <YukariFace>
        <YukariEye stopSignal={signals[2]} symbols={upperDateSymbols} onStop={setUpperDate} />
        <YukariEye stopSignal={signals[3]} symbols={lowerDateSymbols} onStop={setLowerDate} />
      </YukariFace>
      <Unit>日</Unit>
      <Button onClick={emitStopSignal}>ストップ</Button>
    </div>
  )
}
