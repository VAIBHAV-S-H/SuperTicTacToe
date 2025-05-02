"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/lib/store"
import MiniBoard from "@/components/mini-board"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import SoundToggle from "@/components/sound-toggle"
import { playSound } from "@/lib/sound-utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function GameBoard() {
  const router = useRouter()
  const { gameMode, board, currentPlayer, nextBoardIndex, miniWinners, gameWinner, makeMove, resetGame, aiMove } =
    useGameStore()
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Redirect if no game mode is selected
  useEffect(() => {
    if (!gameMode) {
      router.push("/")
    }
  }, [gameMode, router])

  // AI move effect
  useEffect(() => {
    if (gameMode === "ai" && currentPlayer === "O" && !gameWinner) {
      // Add a small delay to make AI move feel more natural
      const timeoutId = setTimeout(() => {
        aiMove()
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [gameMode, currentPlayer, aiMove, gameWinner])

  // Play sound when game is won
  useEffect(() => {
    if (gameWinner) {
      playSound(gameWinner === "draw" ? "draw" : "win")
    }
  }, [gameWinner])

  if (!gameMode) return null

  const handleRestart = () => {
    resetGame()
  }

  const handleBackToMenu = () => {
    resetGame()
    router.push("/")
  }

  // Determine game status message and styles
  let statusMessage = ""
  let statusColor = ""

  if (gameWinner) {
    statusMessage = gameWinner === "draw" ? "Draw!" : `Winner: ${gameWinner}`
    statusColor = gameWinner === "X" ? "text-game-x" : gameWinner === "O" ? "text-game-o" : "text-gray-600"
  } else {
    statusMessage = `Current Player: ${currentPlayer}`
    statusColor = currentPlayer === "X" ? "text-game-x" : "text-game-o"
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full px-2">
      <motion.div
        className={`mb-4 md:mb-6 flex items-center justify-between w-full ${isMobile ? "mobile-controls" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="outline"
          onClick={handleBackToMenu}
          className="shadow-sm text-xs md:text-sm bg-white/80 hover:bg-white/90 border-blue-200"
        >
          Back
        </Button>
        <motion.div
          className={`text-base md:text-xl font-medium ${statusColor} ${isMobile ? "mobile-text" : ""} bg-white/80 px-4 py-2 rounded-full`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: 0, repeatType: "reverse" }}
        >
          {statusMessage}
        </motion.div>
        <div className="flex items-center gap-1 md:gap-2">
          <SoundToggle />
          <Button
            variant="outline"
            onClick={handleRestart}
            className="shadow-sm text-xs md:text-sm bg-white/80 hover:bg-white/90 border-blue-200"
          >
            Restart
          </Button>
        </div>
      </motion.div>

      <motion.div
        className={`grid grid-cols-3 gap-1 md:gap-2 w-full aspect-square max-w-xl ${isMobile ? "mobile-game-board" : ""}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        {Array(9)
          .fill(null)
          .map((_, boardIndex) => (
            <MiniBoard
              key={boardIndex}
              boardIndex={boardIndex}
              isActive={nextBoardIndex === null || nextBoardIndex === boardIndex}
              winner={miniWinners[boardIndex]}
              isMobile={isMobile}
            />
          ))}
      </motion.div>

      <AnimatePresence>
        {gameWinner && (
          <motion.div
            className="mt-4 md:mt-8 text-center ocean-card p-4 md:p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h2
              className={`text-xl md:text-2xl font-bold mb-4 ${
                gameWinner === "draw" ? "text-gray-600" : gameWinner === "X" ? "text-game-x" : "text-game-o"
              }`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {gameWinner === "draw" ? "Game ended in a draw!" : `Player ${gameWinner} wins the game!`}
            </motion.h2>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleRestart}
                className="shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              >
                Play Again
              </Button>
              <Button
                variant="outline"
                onClick={handleBackToMenu}
                className="shadow-sm bg-white/90 hover:bg-white border-blue-200"
              >
                Menu
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
