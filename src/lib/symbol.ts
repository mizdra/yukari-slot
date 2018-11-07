export function getUpperMonthSymbols (): number[] {
  return [0, 1]
}

export function getLowerMonthSymbols (upperMonth?: number): number[] {
  if (upperMonth === undefined) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 1 - 12月
  if (upperMonth === 0) return [1, 2, 3, 4, 5, 6, 7, 8, 9] // 1 - 9 月
  if (upperMonth === 1) return [0, 1, 2] // 10 - 12月
  throw new Error(`Invalid upperMonth(${upperMonth})`)
}

export function getUpperDateSymbols (upperMonth?: number, lowerMonth?: number): number[] {
  if (upperMonth === undefined) return [0, 1, 2, 3] // 1 - 12月は最大31日まで
  if (lowerMonth === undefined) return [0, 1, 2, 3] // 1 - 9月/10 - 12月は最大31日まで

  const month = upperMonth * 10 + lowerMonth
  if (month === 2) return [0, 1, 2] // 2月は最大29日まで (うるう年を含む)
  return [0, 1, 2, 3] // 2月以外は最大30/31日まで
}

export function getLowerDateSymbols (upperMonth?: number, lowerMonth?: number, upperDate?: number): number[] {
  // 月が確定していない時
  if (upperMonth === undefined) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  if (lowerMonth === undefined) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // upperDateが確定していない時
  if (upperDate === undefined) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const month = upperMonth * 10 + lowerMonth
  if (upperDate === 0) return [1, 2, 3, 4, 5, 6, 7, 8, 9] // 00日を除外
  if (upperDate === 1) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  if (upperDate === 2) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // upperDate === 3
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return [0, 1] // 31日まである月
  return [0] // 30日まである月
}
