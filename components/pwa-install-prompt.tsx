"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed (in standalone mode or installed on homescreen)
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      setIsInstalled(true)
      return
    }

    // Store the beforeinstallprompt event for later use
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Don't show immediately to avoid annoying users
      // Instead wait a bit and then show
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000) // Show after 5 seconds
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Handle app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
    }

    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    await deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt")
      setIsInstalled(true)
    } else {
      console.log("User dismissed the install prompt")
    }

    // Clear the saved prompt as it can't be used again
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)

    // Don't show again for this session
    localStorage.setItem("pwaPromptDismissed", Date.now().toString())
  }

  // Don't render anything if already installed or no prompt available
  if (isInstalled || (!showPrompt && !deferredPrompt)) return null

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="pwa-install-prompt"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-blue-800">Install Super Tic Tac Toe</h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={dismissPrompt}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <p className="text-sm text-gray-600">Install this app on your device for an enhanced gaming experience!</p>
          <div className="flex justify-between mt-2">
            <Button variant="outline" size="sm" onClick={dismissPrompt}>
              Maybe Later
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700" size="sm" onClick={handleInstall}>
              Install Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
