import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react'
import styled, { css } from 'styled-components'
import { eyes } from './parts'

export interface YukariEyeProps {
  onStop: (symbol: number) => void
  symbols?: number[]
  duration?: number
}

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
  reelRef: React.MutableRefObject<HTMLDivElement | null>,
  symbolSize: number,
  duration: number,
  symbols: number[],
) {
  const [animation, setAnimation] = React.useState<Animation | null>(null)
  const [hitSymbol, setHitSymbol] = React.useState<number | null>(null)

  useEffect(() => {
    const target = reelRef.current
    if (target === null) return

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
    a.play()
    setAnimation(a)

    return () => {
      a.cancel()
    }
  }, [symbolSize])

  const stop = useCallback(() => {
    const target = reelRef.current
    if (target === null) throw new Error('`target` がまだ初期化されていません')
    if (animation === null) throw new Error('`animation` がまだ初期化されていません')
    animation.pause()
    const translateY = getTranslateY(target)

    const symbolHeight = target.clientHeight / 3 / symbols.length
    const index = Math.round(translateY / symbolHeight) % symbols.length

    setHitSymbol(symbols[index])
  }, [animation, setHitSymbol])

  const start = useCallback(() => {
    if (animation === null) throw new Error('`animation` がまだ初期化されていません')
    animation.play()
    setHitSymbol(null)
  }, [animation])

  return { hitSymbol, start, stop }
}

export interface YukariEyeHandler {
  start (): void
  stop (): void
}

export const YukariEye = forwardRef<YukariEyeHandler, YukariEyeProps>(function YukariEye ({
  symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  duration = 30,
  onStop,
}, ref) {
  const reelRef = React.useRef<HTMLDivElement | null>(null)

  // unmount
  const { hitSymbol, start, stop } = useSpin(reelRef, symbols.length, duration, symbols)

  useImperativeHandle(ref, () => ({
    start,
    stop: () => {
      stop()
      onStop(hitSymbol!)
    },
  }))

  return (
    <SymbolView>
      <Display
        visible={hitSymbol === null}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <div
          ref={reelRef}
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
})
