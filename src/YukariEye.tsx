import React from 'react'

export type Symbol = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface Props {
  stopSignal: boolean
  symbols: Symbol[]
  onStop: (symbol: Symbol) => void
}

export function YukariEye (props: Props) {
  return <div>1</div>
}
