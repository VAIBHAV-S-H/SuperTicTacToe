"use client"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "@/lib/sound-utils"

interface SquareProps {
  value: string | null
  onClick: () => void
  disabled?: boolean
  player: "X" | "O"
}

export default function MobileSquare({ value, onClick, disabled = false, player }: SquareProps) {
  const handleClick = () => {
    if (disabled || value !== null) {
      // Play invalid move sound if trying to click a disabled or filled square
      playSound("invalidMove")
      return
    }

    // Play appropriate sound based on current player
    playSound(player === "X" ? "xMove" : "oMove")
    onClick()
  }

  // Determine background color based on value
  let bgColor = "bg-white hover:bg-gray-50"
  let textColor = "text-gray-800"

  if (value === "X") {
    bgColor = "x-gradient"
    textColor = "text-game-x font-extrabold"
  } else if (value === "O") {
    bgColor = "o-gradient"
    textColor = "text-game-o font-extrabold"
  }

  return (
    <motion.button
      className={`aspect-square flex items-center justify-center text-xl font-bold rounded-sm border border-gray-100 relative overflow-hidden ${bgColor} ${textColor} ${
        disabled ? "cursor-not-allowed opacity-70" : "hover:shadow-md transition-shadow"
      }`}
      onClick={handleClick}
      disabled={disabled || value !== null}
      whileTap={!disabled && !value ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Value (X or O) with enhanced visibility */}
      <AnimatePresence>
        {value && (
          <motion.span
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative z-10 ${value === "X" ? "text-blue-600" : "text-rose-600"} drop-shadow-md`}
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
