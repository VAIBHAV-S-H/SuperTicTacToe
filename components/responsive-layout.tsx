"use client"

import { useDeviceDetect } from "@/hooks/use-device-detect"
import type { ReactNode } from "react"

interface ResponsiveLayoutProps {
  children: ReactNode
  mobileContent?: ReactNode
}

export default function ResponsiveLayout({ children, mobileContent }: ResponsiveLayoutProps) {
  const { isMobile, isReady } = useDeviceDetect()

  // Show nothing until we detect the device type to prevent layout shift
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-blue-500">Loading...</div>
      </div>
    )
  }

  // If mobile content is provided and we're on mobile, show that
  if (isMobile && mobileContent) {
    return <div className="mobile-layout">{mobileContent}</div>
  }

  // Otherwise show the default content
  return <div className={isMobile ? "mobile-layout" : "desktop-layout"}>{children}</div>
}
