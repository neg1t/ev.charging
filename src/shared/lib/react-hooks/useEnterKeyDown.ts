import { useEffect } from 'react'

export const useEnterKeyDown = (callback: () => void, condition: boolean) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (condition) {
        callback()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition])
}
