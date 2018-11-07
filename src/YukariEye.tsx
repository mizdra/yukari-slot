import React from 'react'
import styled, { css } from 'styled-components'
import { eyes } from './parts'

export interface Props {
  stopSignal: boolean
  onStop: (symbol: number) => void
  symbols?: number[]
  symbolHight?: number
  duration?: number
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
  transform: translateX(145%);
  margin: 30% 4% 0;
`

const Display = styled.div<{visible: boolean}>`
  ${props => !props.visible && css`
    display: none;
  `}
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

export function YukariEye ({
  symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  symbolHight = 130,
  duration = 30,
  onStop,
  stopSignal,
}: Props) {

  const [hitSymbol, setHitSymbol] = useState<number | null>(null)

  const reelRef = useRef<HTMLDivElement>(null as any)

  const animationRef = useRef<Animation | null>(null)

  // unmount
  useEffect(() => {
    console.log('play')

    const target = reelRef.current

    const animation = target.animate([
      { transform: `translateY(${-1 * target.clientHeight / 3}px)` },
      { transform: 'translateY(0px)' },
    ] as Keyframe[], {
      duration: duration * symbols.length * 3,
      iterations: Infinity,
    })
    animation.pause()
    animationRef.current = animation

    return () => {
      console.log('cleanup')
      if (animationRef.current !== null) {
        animationRef.current.cancel()
      }
    }
  }, [symbols.length])

  // stop
  useEffect(() => {
    console.log('signal changed: ', stopSignal, animationRef.current)
    if (!animationRef.current) return
    if (stopSignal) {
      animationRef.current.pause()
      const target = reelRef.current
      const translateY = getTranslateY(target)
      const index = Math.floor(((-translateY + (symbolHight / 2)) % target.clientHeight) / symbolHight)
      console.log(`onStop: ${symbols[index]}`)
      setHitSymbol(symbols[index])
      onStop(symbols[index])
    } else {
      animationRef.current.play()
      setHitSymbol(null)
    }
  }, [stopSignal])

  return (
    <SymbolView height={symbolHight}>
      <Display visible={hitSymbol === null}>
        <div ref={reelRef as any}>
          {
            [...symbols, ...symbols, ...symbols]
              .map((symbol, i) => <Symbol key={i} height={symbolHight} value={symbol} />)
          }
        </div>
      </Display>
      {
        hitSymbol !== null &&
          <Symbol height={symbolHight} value={hitSymbol} />
      }
    </SymbolView>
  )
}
