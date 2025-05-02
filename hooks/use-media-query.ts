"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Default to true on server to avoid layout shift
    if (typeof window === "undefined") {
      return setMatches(false)
    }

    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Setup listener for changes
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    // Cleanup
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
