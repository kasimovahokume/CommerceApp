import { useState } from "react"

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      // "undefined" stringini yoxla
      if (!saved || saved === "undefined") return initialValue
      return JSON.parse(saved)
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}

export default useLocalStorage