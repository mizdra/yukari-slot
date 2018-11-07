import React from 'react'
import styled from 'styled-components'
import { eyes } from './parts'

export interface Props {
  stopSignal: boolean
  symbols: number[]
  onStop: (symbol: number) => void
  symbolHight: number
}

export type UseState = <T>(initialState: T | (() => T)) => [T, (newState: T | ((newState: T) => T)) => void]
export const useState: UseState = (React as any).useState

export type UseEffect = (didUpdate: () => void, params?: any[]) => void
export const useEffect: UseEffect = (React as any).useEffect

export interface ReactRef<T> {current: T}
export type UseRef = <T>(initialValue: T) => ReactRef<T>
export const useRef: UseRef = (React as any).useRef

const SymbolView = styled.div<{height: number}>`
  height: ${props => props.height}px;
  overflow-y: hidden;
`

interface SymbolProps {
  height: number
  value: number
}

function Symbol (props: SymbolProps) {
  return <img src={eyes[props.value]} height={props.height} style={{ display: 'block' }} />
}

function getTranslateY (elem: HTMLElement) {
  const matrix = getComputedStyle(elem).transform || 'matrix(0, 0, 0, 0, 0, 0)'
  const translateY = matrix.match(/matrix\(.*\, (.*)\)/)![1]
  return parseInt(translateY, 10)
}

export function YukariEye (props: Props) {
  const { stopSignal, onStop, symbols } = props

  const [hitSymbol, setHitSymbol] = useState<number | null>(null)

  const reelRef = useRef<HTMLDivElement>(null as any)

  const animationRef = useRef<Animation | null>(null)

  // stop
  useEffect(() => {
    if (!animationRef.current) return
    if (stopSignal) {
      animationRef.current.pause()
      const target = reelRef.current
      const translateY = getTranslateY(target)
      const index = Math.floor(((-translateY + 25) % target.clientHeight) / 50)
      console.log(`onStop: ${symbols[index]}`)
      setHitSymbol(symbols[index])
      onStop(symbols[index])
    }
  }, [stopSignal])

  // unmount
  useEffect(() => {
    console.log('play')

    const target = reelRef.current

    const animation = target.animate([
      { transform: `translateY(${-1 * target.clientHeight / 3}px)` },
      { transform: 'translateY(0px)' },
    ] as Keyframe[], {
      duration: symbols.length * 1000,
      iterations: Infinity,
    })
    animation.play()
    animationRef.current = animation

    return () => {
      console.log('cleanup')
      if (animationRef.current !== null) {
        animationRef.current.cancel()
      }
    }
  }, [symbols.length])

  if (hitSymbol === null) {
    return (
      <SymbolView height={props.symbolHight}>
        <div ref={reelRef as any}>
          {
            [...symbols, ...symbols, ...symbols]
              .map((symbol, i) => <Symbol key={i} height={50} value={symbol} />)
          }
        </div>
      </SymbolView>
    )
  }

  return (
    <SymbolView height={props.symbolHight}>
      <Symbol height={50} value={hitSymbol} />
    </SymbolView>
  )
}
