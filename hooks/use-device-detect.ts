"use client"

import { useState, useEffect } from "react"

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i

      // Check if mobile device based on user agent
      const isMobileDevice = mobileRegex.test(userAgent)

      // Check if tablet based on screen size
      const isTabletDevice = window.innerWidth >= 600 && window.innerWidth <= 1024

      // Check if mobile based on screen width
      const isMobileScreen = window.innerWidth < 600

      setIsMobile(isMobileDevice || isMobileScreen)
      setIsTablet(isTabletDevice)
      setIsReady(true)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return { isMobile, isTablet, isReady }
}
