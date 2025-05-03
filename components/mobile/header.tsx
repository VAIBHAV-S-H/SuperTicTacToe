"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownToLine } from "lucide-react"
import InstallationGuide from "@/components/installation-guide"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function MobileHeader() {
  const [showInstallGuide, setShowInstallGuide] = useState(false)
  const pathname = usePathname()

  // Only show on home page
  if (pathname !== "/") return null

  return (
    <div className="fixed bottom-3 right-3 z-20">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full shadow-md bg-white/80 hover:bg-white/90 border-blue-200"
        onClick={() => setShowInstallGuide(true)}
      >
        <ArrowDownToLine className="h-4 w-4 text-blue-600" />
        <span className="sr-only">Install App</span>
      </Button>

      <AnimatePresence>
        {showInstallGuide && <InstallationGuide onClose={() => setShowInstallGuide(false)} />}
      </AnimatePresence>
    </div>
  )
}
