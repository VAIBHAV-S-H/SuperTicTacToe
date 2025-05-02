"use client"

import GameModeSelection from "@/components/game-mode-selection"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { initAudio } from "@/lib/sound-utils"
import Header from "@/components/header"

export default function Home() {
  // Initialize sound system when the app loads
  useEffect(() => {
    // Explicitly initialize audio
    initAudio()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative z-10">
      <Header />
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Super Tic Tac Toe
      </motion.h1>
      <GameModeSelection />
    </main>
  )
}
