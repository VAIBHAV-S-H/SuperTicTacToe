"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "@/lib/sound-utils"

interface SquareProps {
  value: string | null
  onClick: () => void
  disabled?: boolean
  player: "X" | "O"
}

export default function Square({ value, onClick, disabled = false, player }: SquareProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; player: "X" | "O" }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleCount = useRef(0)

  // Clean up ripples after animation
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1))
      }, 1200) // Extended animation duration
      return () => clearTimeout(timer)
    }
  }, [ripples])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    if (disabled || value !== null) {
      // Play invalid move sound if trying to click a disabled or filled square
      playSound("invalidMove")
      return
    }

    // Get position for ripple
    if (buttonRef.current) {
      let x, y

      // Handle both mouse and touch events
      if ("clientX" in e) {
        // Mouse event
        const rect = buttonRef.current.getBoundingClientRect()
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      } else {
        // Touch event
        const touch = e.touches[0]
        const rect = buttonRef.current.getBoundingClientRect()
        x = touch.clientX - rect.left
        y = touch.clientY - rect.top
      }

      // Add multiple ripples for a more fluid effect
      rippleCount.current += 1
      const mainRipple = { id: rippleCount.current, x, y, player }

      // Add secondary ripples with slight offsets
      rippleCount.current += 1
      const secondaryRipple1 = { id: rippleCount.current, x: x + 5, y: y - 5, player }

      rippleCount.current += 1
      const secondaryRipple2 = { id: rippleCount.current, x: x - 5, y: y + 5, player }

      setRipples([...ripples, mainRipple, secondaryRipple1, secondaryRipple2])
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
    textColor = "text-game-x font-extrabold" // Made bolder
  } else if (value === "O") {
    bgColor = "o-gradient"
    textColor = "text-game-o font-extrabold" // Made bolder
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`aspect-square flex items-center justify-center text-3xl font-bold rounded-md border border-gray-100 relative overflow-hidden ${bgColor} ${textColor} ${
        disabled ? "cursor-not-allowed opacity-70" : "hover:shadow-md transition-shadow"
      } soft-shadow`}
      onClick={handleClick}
      onTouchStart={handleClick}
      disabled={disabled || value !== null}
      whileHover={!disabled && !value ? { scale: 1.05 } : {}}
      whileTap={!disabled && !value ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Enhanced water ripple effects with player-specific colors */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className={`absolute rounded-full pointer-events-none ${
            ripple.player === "X"
              ? "bg-cyan-300/60" // Blue water for X
              : "bg-rose-300/60" // Red water for O
          }`}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "15px", // Larger initial size
            height: "15px",
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 8, 15],
            opacity: [0.8, 0.6, 0],
            borderRadius: ["100%", "100%", "40%"], // Morphing shape for water effect
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            times: [0, 0.4, 1], // Control timing of keyframes
          }}
          onAnimationComplete={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
          }}
        />
      ))}

      {/* Value (X or O) with enhanced visibility */}
      <AnimatePresence>
        {value && (
          <motion.span
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative z-10 text-3xl ${value === "X" ? "text-blue-600" : "text-rose-600"} drop-shadow-md`} // Darker colors and drop shadow
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
