import { useEffect, useRef } from 'react'

export function useInterval (callback: () => void, delay?: number, clear?: boolean): void {
  const savedCallback = useRef<() => void>()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick (): void {
      if (savedCallback.current !== undefined) {
        savedCallback.current()
      }
    }

    if (delay !== undefined) {
      const id = setInterval(tick, delay)
      if (clear !== undefined && clear) {
        clearInterval(id)
      }
      return () => {
        clearInterval(id)
      }
    }
  }, [delay, clear])
}
