import { Symbol } from '../YukariEye'

export function getUpperMonthSymbols (): Symbol[] {
  return [0, 1, 2]
}

export function getLowerMonthSymbols (upperMonth?: number): Symbol[] {
  // TODO: 引数に対応したシンボルを返す
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}

export function getUpperDateSymbols (upperMonth?: number, lowerMonth?: number): Symbol[] {
  // TODO: 引数に対応したシンボルを返す
  return [0, 1, 2, 3]
}

export function getLowerDateSymbols (upperMonth?: number, lowerMonth?: number, upperDate?: number): Symbol[] {
  // TODO: 引数に対応したシンボルを返す
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}
