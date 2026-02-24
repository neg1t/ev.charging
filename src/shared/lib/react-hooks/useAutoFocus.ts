import { useEffect } from 'react'

import { type InputRef } from 'antd'

export const useAutoFocus = <T extends HTMLElement | InputRef>(
  ref: React.RefObject<T | null>,
  condition: boolean,
) => {
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (ref.current && condition) {
      timer = setTimeout(() => {
        ref.current?.focus()
      }, 0)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [condition, ref])
}
