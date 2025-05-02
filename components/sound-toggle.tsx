"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { toggleMute, getMuteState, setVolume, getVolume } from "@/lib/sound-utils"
import { motion, AnimatePresence } from "framer-motion"

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(0.5)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  // Initialize state from sound utils
  useEffect(() => {
    setIsMuted(getMuteState())
    setVolumeState(getVolume())
  }, [])

  const handleToggleMute = () => {
    const newMuteState = toggleMute()
    setIsMuted(newMuteState)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setVolumeState(newVolume)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 p-0 rounded-full"
        onClick={handleToggleMute}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {isMuted ? <VolumeX className="h-5 w-5 text-gray-500" /> : <Volume2 className="h-5 w-5 text-gray-700" />}
        <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
      </Button>

      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white p-3 rounded-lg shadow-md border border-gray-100 w-32"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} className="my-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
