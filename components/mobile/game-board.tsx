"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/lib/store"
import MiniBoard from "@/components/mobile/mini-board"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import SoundToggle from "@/components/sound-toggle"
import { playSound } from "@/lib/sound-utils"
import MultiplayerChat from "@/components/multiplayer-chat"
import { useLongPress } from "@/hooks/use-long-press"

export default function MobileGameBoard() {
  const router = useRouter()
  const {
    gameMode,
    board,
    currentPlayer,
    nextBoardIndex,
    miniWinners,
    gameWinner,
    makeMove,
    resetGame,
    aiMove,
    isMyTurn,
  } = useGameStore()

  // Long press handlers
  const resetButtonProps = useLongPress(
    () => {
      resetGame()
    },
    {
      onStart: (e) => e.preventDefault(),
      threshold: 1000, // 1 second
      captureEvent: true,
    },
  )

  const backButtonProps = useLongPress(
    () => {
      resetGame()
      router.push("/")
    },
    {
      onStart: (e) => e.preventDefault(),
      threshold: 1000, // 1 second
      captureEvent: true,
    },
  )

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

  // Determine game status message and styles
  let statusMessage = ""
  let statusColor = ""

  if (gameWinner) {
    statusMessage = gameWinner === "draw" ? "Draw!" : `Winner: ${gameWinner}`
    statusColor = gameWinner === "X" ? "text-game-x" : gameWinner === "O" ? "text-game-o" : "text-gray-600"
  } else if (gameMode === "multiplayer") {
    statusMessage = isMyTurn ? `Your Turn (${currentPlayer})` : `Opponent's Turn (${currentPlayer})`
    statusColor = currentPlayer === "X" ? "text-game-x" : "text-game-o"
  } else {
    statusMessage = `Current Player: ${currentPlayer}`
    statusColor = currentPlayer === "X" ? "text-game-x" : "text-game-o"
  }

  return (
    <div className="flex flex-col items-center w-full px-1 py-2">
      <motion.div
        className="mb-2 flex flex-col items-center w-full gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`text-base font-medium ${statusColor} bg-white/80 px-4 py-2 rounded-full w-full text-center`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: 0, repeatType: "reverse" }}
        >
          {statusMessage}
        </motion.div>

        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            {...backButtonProps}
            className="shadow-sm text-xs bg-white/80 hover:bg-white/90 border-blue-200 relative overflow-hidden"
          >
            <span>Back</span>
            <span
              className="absolute inset-0 bg-blue-200/50 origin-left transform scale-x-0 transition-transform"
              style={{
                transform: backButtonProps.isLongPressing
                  ? `scaleX(${Math.min(backButtonProps.longPressProgress, 1)})`
                  : "scaleX(0)",
              }}
            />
          </Button>

          <SoundToggle />

          <Button
            variant="outline"
            {...resetButtonProps}
            className="shadow-sm text-xs bg-white/80 hover:bg-white/90 border-blue-200 relative overflow-hidden"
          >
            <span>Restart</span>
            <span
              className="absolute inset-0 bg-blue-200/50 origin-left transform scale-x-0 transition-transform"
              style={{
                transform: resetButtonProps.isLongPressing
                  ? `scaleX(${Math.min(resetButtonProps.longPressProgress, 1)})`
                  : "scaleX(0)",
              }}
            />
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-1 w-full aspect-square"
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
            />
          ))}
      </motion.div>

      <AnimatePresence>
        {gameWinner && (
          <motion.div
            className="mt-4 text-center ocean-card p-4 rounded-lg w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h2
              className={`text-xl font-bold mb-4 ${
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
                {...resetButtonProps}
                className="shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 relative overflow-hidden"
              >
                <span>Play Again</span>
                <span
                  className="absolute inset-0 bg-blue-600/50 origin-left transform scale-x-0 transition-transform"
                  style={{
                    transform: resetButtonProps.isLongPressing
                      ? `scaleX(${Math.min(resetButtonProps.longPressProgress, 1)})`
                      : "scaleX(0)",
                  }}
                />
              </Button>
              <Button
                variant="outline"
                {...backButtonProps}
                className="shadow-sm bg-white/90 hover:bg-white border-blue-200 relative overflow-hidden"
              >
                <span>Menu</span>
                <span
                  className="absolute inset-0 bg-blue-200/50 origin-left transform scale-x-0 transition-transform"
                  style={{
                    transform: backButtonProps.isLongPressing
                      ? `scaleX(${Math.min(backButtonProps.longPressProgress, 1)})`
                      : "scaleX(0)",
                  }}
                />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show chat only in multiplayer mode */}
      {gameMode === "multiplayer" && <MultiplayerChat />}
    </div>
  )
}
