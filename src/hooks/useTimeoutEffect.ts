import { useEffect, useRef } from 'react'

export function useTimeoutEffect (callback: () => void, delay: number, deps?: React.DependencyList): void {
  const timeoutId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeoutId.current = setTimeout(callback, delay)

    return () => {
      clearTimeout(timeoutId.current)
    }
  }, deps)
}
