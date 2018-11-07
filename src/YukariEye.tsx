import React from 'react'
import styled from 'styled-components'

export type Symbol = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface Props {
  stopSignal: boolean
  symbols: Symbol[]
  onStop: (symbol: Symbol) => void
}

export type UseState = <T>(initialState: T | (() => T)) => [T, (newState: T | ((newState: T) => T)) => void]
export const useState: UseState = (React as any).useState

export type UseEffect = (didUpdate: () => void, params?: any[]) => void
export const useEffect: UseEffect = (React as any).useEffect

export interface ReactRef<T> {current: T}
export type UseRef = <T>(initialValue: T) => ReactRef<T>
export const useRef: UseRef = (React as any).useRef

const SymbolView = styled.div`
  width: 50px;
  height: 50px;
  font-size: 30px;
  line-height: 50px;
  overflow-y: hidden;
  /* position: relative; */
`

const Symbol = styled.div`
  /* position: absolute; */
  text-align: center;
  width: 50px;
`

function getTranslateY (elem: HTMLElement) {
  const matrix = getComputedStyle(elem).transform || 'matrix(0, 0, 0, 0, 0, 0)'
  const translateY = matrix.match(/matrix\(.*\, (.*)\)/)![1]
  return parseInt(translateY, 10)
}

function Reel (props: { symbols: Symbol[] }) {
  return (
    <div>
      {props.symbols.map((symbol, i) => <Symbol key={i}>{symbol}</Symbol>)}
    </div>
  )
}

export function YukariEye (props: Props) {
  const { stopSignal, onStop, symbols } = props

  const [hitSymbol, setHitSymbol] = useState<Symbol | null>(null)

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
      <SymbolView>
        <div ref={reelRef as any}>
          <Reel symbols={[...symbols, ...symbols, ...symbols]}/>
        </div>
      </SymbolView>
    )
  }

  return (
    <SymbolView>
      <Symbol>{hitSymbol}</Symbol>
    </SymbolView>
  )
}
