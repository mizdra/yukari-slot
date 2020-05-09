import { useEffect, useState } from 'react'
import { eyes } from '../lib/parts'

export function useWaitEyeLoaded () {
  async function waitImageLoaded (src: string) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = resolve
    })
  }
  async function waitEyeLoaded () {
    await Promise.all(eyes.map(waitImageLoaded))
  }
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    waitEyeLoaded().then(() => setLoaded(true)).catch()
  }, [])
  return loaded
}
