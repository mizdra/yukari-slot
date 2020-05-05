import React from 'react'
import styled, { css } from 'styled-components'
import { eyes } from './parts'

export interface Props {
  stopSignal: boolean
  onStop: (symbol: number) => void
  symbols?: number[]
  duration?: number
}

export type UseEffect = (didUpdate: () => void, params?: any[]) => void
export const useEffect: UseEffect = (React as any).useEffect

const SymbolView = styled.div`
  overflow-y: hidden;
  position: relative;
  height: 100%;
  width: 100%;
`

const Display = styled.div<{ visible: boolean }>`
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `}
`

interface SymbolProps {
  value: number
}

function Symbol (props: SymbolProps) {
  return (
    <img
      src={eyes[props.value]}
      width='100%'
      height='100%'
      style={{ display: 'block' }}
    />
  )
}

function getTranslateY (elem: HTMLElement) {
  const matrix = getComputedStyle(elem).transform || 'matrix(0, 0, 0, 0, 0, 0)'
  const translateY = matrix.match(/matrix\(.*\, (.*)\)/)![1]
  return parseInt(translateY, 10)
}

function useSpin (
  reelRef: React.MutableRefObject<HTMLDivElement>,
  symbolSize: number,
  duration: number,
) {
  const [animation, setAnimation] = React.useState<Animation | null>(null)

  useEffect(() => {
    const target = reelRef.current

    const a = target.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: `translateY(${target.clientHeight / 3}px)` },
      ] as Keyframe[],
      {
        duration: duration * symbolSize * 3,
        iterations: Infinity,
      },
    )
    a.pause()
    setAnimation(a)

    return () => {
      a.cancel()
    }
  }, [symbolSize])

  return animation
}

function useStop (
  animation: Animation | null,
  reelRef: React.MutableRefObject<HTMLDivElement>,
  symbols: number[],
  stopSignal: boolean,
  onStop: (symbol: number) => void,
) {
  const [hitSymbol, setHitSymbol] = React.useState<number | null>(null)

  useEffect(() => {
    if (animation) {
      if (stopSignal) {
        animation.pause()
        const target = reelRef.current
        const translateY = getTranslateY(target)

        const symbolHeight = target.clientHeight / 3 / symbols.length
        const index = Math.round(translateY / symbolHeight) % symbols.length

        setHitSymbol(symbols[index])
        onStop(symbols[index])
      } else {
        animation.play()
        setHitSymbol(null)
      }
    }
  }, [stopSignal, animation])

  return hitSymbol
}

export function YukariEye ({
  symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  duration = 30,
  onStop,
  stopSignal,
}: Props) {
  const reelRef = React.useRef<HTMLDivElement>(null as any)

  // unmount
  const animation = useSpin(reelRef, symbols.length, duration)

  // stop
  const hitSymbol = useStop(animation, reelRef, symbols, stopSignal, onStop)

  return (
    <SymbolView>
      <Display
        visible={hitSymbol === null}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <div
          ref={reelRef as any}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
        >
          {[...symbols, ...symbols, ...symbols].map((symbol, i) => (
            <Symbol key={i} value={symbol} />
          ))}
        </div>
      </Display>
      {hitSymbol !== null && <Symbol value={hitSymbol} />}
    </SymbolView>
  )
}
