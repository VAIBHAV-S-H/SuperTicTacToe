"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/lib/store"
import type { GameMode } from "@/lib/types"
import { motion } from "framer-motion"
import MobileMultiplayerMode from "@/components/mobile/multiplayer-mode"

export default function MobileGameModeSelection() {
  const router = useRouter()
  const { setGameMode } = useGameStore()
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)
  const [showMultiplayer, setShowMultiplayer] = useState(false)

  const handleModeSelect = (mode: GameMode) => {
    if (mode === "multiplayer") {
      setShowMultiplayer(true)
    } else {
      setSelectedMode(mode)
      setShowMultiplayer(false)
    }
  }

  const handleStartGame = () => {
    if (selectedMode) {
      setGameMode(selectedMode)
      router.push("/game")
    }
  }

  const handleBackFromMultiplayer = () => {
    setShowMultiplayer(false)
    setSelectedMode(null)
  }

  if (showMultiplayer) {
    return (
      <div className="w-full px-2">
        <Button
          variant="outline"
          onClick={handleBackFromMultiplayer}
          className="mb-4 shadow-sm bg-white/80 hover:bg-white/90 border-blue-200 text-xs"
          size="sm"
        >
          Back to Game Modes
        </Button>
        <MobileMultiplayerMode />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2"
    >
      <Card className="ocean-card border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center text-blue-800">Select Game Mode</CardTitle>
          <CardDescription className="text-center text-blue-600">Choose how you want to play</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <motion.div
            className={`p-3 border rounded-lg cursor-pointer transition-all ${
              selectedMode === "local"
                ? "border-game-x bg-blue-100/80"
                : "border-blue-200 hover:border-game-x/50 bg-white/70"
            }`}
            onClick={() => handleModeSelect("local")}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-medium text-blue-800">Local Player vs Player</h3>
            <p className="text-xs text-blue-600">Play against a friend on the same device</p>
          </motion.div>

          <motion.div
            className={`p-3 border rounded-lg cursor-pointer transition-all ${
              selectedMode === "ai"
                ? "border-game-o bg-rose-100/80"
                : "border-blue-200 hover:border-game-o/50 bg-white/70"
            }`}
            onClick={() => handleModeSelect("ai")}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-medium text-blue-800">Player vs AI</h3>
            <p className="text-xs text-blue-600">Challenge our AI with minimax algorithm</p>
          </motion.div>

          <motion.div
            className={`p-3 border rounded-lg cursor-pointer transition-all ${
              selectedMode === "multiplayer"
                ? "border-purple-500 bg-purple-100/80"
                : "border-blue-200 hover:border-purple-500/50 bg-white/70"
            }`}
            onClick={() => handleModeSelect("multiplayer")}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-medium text-blue-800">Online Multiplayer</h3>
            <p className="text-xs text-blue-600">Play with a friend using a friend code</p>
          </motion.div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            disabled={!selectedMode || selectedMode === "multiplayer"}
            onClick={handleStartGame}
          >
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
