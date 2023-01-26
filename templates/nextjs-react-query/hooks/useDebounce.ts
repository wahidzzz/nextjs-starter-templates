/**
 * Copied from https://usehooks-ts.com/
 * Please visit this website for more useful react hooks
 * This is an example hook and may not be used in all project please delete this if not in use
 */


import { useEffect, useState } from 'react'
/**
 *
 * @param value debouce value
 * @param delay time in milliseconds
 * @returns useDebounce hook
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
