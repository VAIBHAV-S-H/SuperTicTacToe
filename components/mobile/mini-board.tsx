"use client"

import { useGameStore } from "@/lib/store"
import MobileSquare from "@/components/mobile/square"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "@/lib/sound-utils"

interface MiniBoardProps {
  boardIndex: number
  isActive: boolean
  winner: string | null
}

export default function MiniBoard({ boardIndex, isActive, winner }: MiniBoardProps) {
  const { board, makeMove, currentPlayer, gameMode, isMyTurn } = useGameStore()

  const handleSquareClick = (squareIndex: number) => {
    // In multiplayer mode, only allow clicks when it's the player's turn
    if (gameMode === "multiplayer" && !isMyTurn) {
      playSound("boardSelect")
      return
    }

    if (isActive && !winner) {
      makeMove(boardIndex, squareIndex)
    } else if (!isActive && !winner) {
      // Play a sound for invalid board selection
      playSound("boardSelect")
    }
  }

  // Determine the background and border styles based on state
  let bgClass = "gradient-bg"
  let borderClass = "border-gray-200"
  let ringClass = ""

  if (winner) {
    if (winner === "X") {
      bgClass = "x-gradient"
      borderClass = "border-game-x"
    } else if (winner === "O") {
      bgClass = "o-gradient"
      borderClass = "border-game-o"
    } else if (winner === "draw") {
      bgClass = "bg-game-neutral"
      borderClass = "border-game-neutral-border"
    }
  } else if (isActive) {
    bgClass = "active-gradient"
    borderClass = "border-game-active-border"
    ringClass = "ring-1 ring-game-active-border"
  }

  return (
    <motion.div
      className={`grid grid-cols-3 gap-px p-px border-2 rounded-md ${bgClass} ${borderClass} ${ringClass} ${
        !isActive && !winner ? "opacity-80" : ""
      } relative`}
      animate={{
        scale: isActive && !winner ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {Array(9)
        .fill(null)
        .map((_, squareIndex) => (
          <MobileSquare
            key={squareIndex}
            value={board[boardIndex][squareIndex]}
            onClick={() => handleSquareClick(squareIndex)}
            disabled={!isActive || !!winner}
            player={currentPlayer}
          />
        ))}

      <AnimatePresence>
        {winner && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center glass-effect rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {winner === "draw" ? (
              <motion.span
                className="text-lg font-bold text-gray-600"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                Draw
              </motion.span>
            ) : (
              <motion.span
                className={`text-2xl font-bold ${winner === "X" ? "text-blue-600" : "text-rose-600"} drop-shadow-md`}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
              >
                {winner}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
