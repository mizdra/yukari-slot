import React from 'react'
import styled from 'styled-components'

export type Symbol = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface Props {
  type: 'right' | 'left'
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

class SpinAnimation {
  private animations: Animation[]
  private finishCount = 0
  private finishHandler: () => void = () => 0

  constructor (targets: HTMLElement[]) {
    this.animations = targets
      .map(target => {
        const animation = target.animate([
          { transform: `translateY(${-1 * target.clientHeight}px)` },
          { transform: 'translateY(0px)' },
        ] as Keyframe[], {
          duration: 1000,
          iterations: Infinity,
        })
        animation.pause()
        return animation
      })
  }
  play () {
    this.animations.forEach(animation => {
      animation.play()
      animation.onfinish = () => {
        this.finishCount++
        if (this.finishCount === this.animations.length) {
          this.finishCount = 0
          this.finishHandler()
        }
      }
    })
  }
  pause () {
    this.animations.forEach(animation => animation.pause())
  }
  cancel () {
    this.animations.forEach(animation => animation.cancel())
  }
}

function Reel (props: { refs: React.RefObject<HTMLDivElement>, symbols: Symbol[] }) {
  return (
    <div ref={props.refs}>
      {props.symbols.map((symbol, i) => <Symbol key={i}>{symbol}</Symbol>)}
    </div>
  )
}

export function YukariEye (props: Props) {
  const { stopSignal, onStop, symbols } = props

  const symbolRefs = [
    useRef<HTMLDivElement>(null as any),
    useRef<HTMLDivElement>(null as any),
    useRef<HTMLDivElement>(null as any),
  ]

  const animationRef = useRef<SpinAnimation | null>(null)

  // stop
  useEffect(() => {
    if (!animationRef.current) return
    if (stopSignal) {
      animationRef.current.pause()
      const target = symbolRefs[1].current
      const translateY = getTranslateY(target)
      const index = Math.floor(((-translateY + 25) % target.clientHeight) / 50)
      onStop(symbols[index])
    }
  }, [stopSignal])

  // unmount
  useEffect(() => {
    const animation = new SpinAnimation(symbolRefs.map(ref => ref.current))
    animation.play()
    animationRef.current = animation

    return () => {
      if (animationRef.current !== null) {
        animationRef.current.cancel()
      }
    }
  }, [])

  return (
    <SymbolView>
      <Reel refs={symbolRefs[0] as any} symbols={symbols}/>
      <Reel refs={symbolRefs[1] as any} symbols={symbols}/>
      <Reel refs={symbolRefs[2] as any} symbols={symbols}/>
    </SymbolView>
  )
}
