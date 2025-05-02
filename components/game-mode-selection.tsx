"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/lib/store"
import type { GameMode } from "@/lib/types"
import { motion } from "framer-motion"

export default function GameModeSelection() {
  const router = useRouter()
  const { setGameMode } = useGameStore()
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode)
  }

  const handleStartGame = () => {
    if (selectedMode) {
      setGameMode(selectedMode)
      router.push("/game")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="ocean-card border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">Select Game Mode</CardTitle>
          <CardDescription className="text-center text-blue-600">Choose how you want to play</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMode === "local"
                ? "border-game-x bg-blue-100/80"
                : "border-blue-200 hover:border-game-x/50 bg-white/70"
            }`}
            onClick={() => handleModeSelect("local")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-medium text-blue-800">Local Player vs Player</h3>
            <p className="text-sm text-blue-600">Play against a friend on the same device</p>
          </motion.div>

          <motion.div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMode === "ai"
                ? "border-game-o bg-rose-100/80"
                : "border-blue-200 hover:border-game-o/50 bg-white/70"
            }`}
            onClick={() => handleModeSelect("ai")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-medium text-blue-800">Player vs AI</h3>
            <p className="text-sm text-blue-600">Challenge our AI with minimax algorithm</p>
          </motion.div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            disabled={!selectedMode}
            onClick={handleStartGame}
          >
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
