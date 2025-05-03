"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useDeviceDetect } from "@/hooks/use-device-detect"

// Extremely simplified sea creatures with minimal animation
const MoonJellyfish = ({ style }: { style?: React.CSSProperties }) => (
  <div className="absolute" style={style}>
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simple bell shape */}
      <ellipse cx="40" cy="30" rx="30" ry="25" fill="rgba(173, 216, 230, 0.6)" />

      {/* Two white circles */}
      <circle cx="30" cy="25" r="6" fill="rgba(255, 255, 255, 0.8)" />
      <circle cx="50" cy="25" r="6" fill="rgba(255, 255, 255, 0.8)" />

      {/* Eyes */}
      <circle cx="30" cy="25" r="2" fill="black" />
      <circle cx="50" cy="25" r="2" fill="black" />

      {/* Simple tentacles */}
      <path d="M25 50L25 80" stroke="rgba(173, 216, 230, 0.6)" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 50L35 75" stroke="rgba(173, 216, 230, 0.6)" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 50L45 75" stroke="rgba(173, 216, 230, 0.6)" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 50L55 80" stroke="rgba(173, 216, 230, 0.6)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
)

const Mandarinfish = ({ style }: { style?: React.CSSProperties }) => (
  <div className="absolute" style={style}>
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simple body */}
      <path d="M20 20C20 15 30 10 50 10C65 10 65 15 65 20C65 25 65 30 50 30C30 30 20 25 20 20Z" fill="#FF9E80" />

      {/* Simple tail */}
      <path d="M20 20L10 15M20 20L10 25" stroke="#FF9E80" strokeWidth="4" strokeLinecap="round" />

      {/* Eye */}
      <circle cx="60" cy="15" r="3" fill="white" />
      <circle cx="61" cy="15" r="1" fill="black" />
    </svg>
  </div>
)

const Dolphin = ({ style }: { style?: React.CSSProperties }) => (
  <div className="absolute" style={style}>
    <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simple body */}
      <path d="M20 25C20 15 40 10 60 10C75 10 80 15 80 25C80 35 75 40 60 40C40 40 20 35 20 25Z" fill="#64B5F6" />

      {/* Simple dorsal fin */}
      <path d="M50 10L50 0" stroke="#64B5F6" strokeWidth="8" strokeLinecap="round" />

      {/* Simple tail */}
      <path d="M20 25L10 15M20 25L10 35" stroke="#64B5F6" strokeWidth="6" strokeLinecap="round" />

      {/* Eye */}
      <circle cx="70" cy="20" r="3" fill="white" />
      <circle cx="71" cy="20" r="1" fill="black" />
    </svg>
  </div>
)

const SeaTurtle = ({ style }: { style?: React.CSSProperties }) => (
  <div className="absolute" style={style}>
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simple shell */}
      <ellipse cx="50" cy="30" rx="25" ry="20" fill="#66BB6A" />
      <ellipse cx="50" cy="30" rx="15" ry="10" fill="#81C784" />

      {/* Head */}
      <ellipse cx="75" cy="30" rx="8" ry="6" fill="#81C784" />

      {/* Eye */}
      <circle cx="78" cy="28" r="2" fill="white" />
      <circle cx="79" cy="28" r="1" fill="black" />

      {/* Simple flippers */}
      <path d="M30 20L20 10" stroke="#81C784" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 40L20 50" stroke="#81C784" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 20L80 10" stroke="#81C784" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 40L80 50" stroke="#81C784" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
)

// List of all sea creatures - reduced for mobile
const seaCreatures = [MoonJellyfish, Mandarinfish, Dolphin, SeaTurtle]

export default function OptimizedOceanBackground() {
  const [elements, setElements] = useState<React.ReactNode[]>([])
  const { isMobile, isReady } = useDeviceDetect()
  const initialized = useRef(false)

  // Generate all static elements once
  useEffect(() => {
    if (!isReady || initialized.current) return
    initialized.current = true

    const newElements = []
    const bubbleCount = isMobile ? 6 : 15
    const creatureCount = isMobile ? 2 : 4

    // Generate bubbles
    for (let i = 0; i < bubbleCount; i++) {
      const size = 5 + Math.random() * 10
      const left = Math.random() * 100
      const bottom = Math.random() * 100
      const animationDuration = 15 + Math.random() * 10
      const delay = Math.random() * 10

      newElements.push(
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: `${bottom}%`,
            opacity: 0.1 + Math.random() * 0.3,
          }}
          animate={{ y: [0, -500] }}
          transition={{
            duration: animationDuration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            delay,
          }}
        />,
      )
    }

    // Generate creatures
    for (let i = 0; i < creatureCount; i++) {
      const creatureIndex = Math.floor(Math.random() * seaCreatures.length)
      const RandomCreature = seaCreatures[creatureIndex]
      const scale = 0.5 + Math.random() * 0.5
      const startFromLeft = Math.random() > 0.5
      const yPos = 20 + Math.random() * 60

      // Set animation properties
      const xStart = startFromLeft ? -10 : 110
      const xEnd = startFromLeft ? 110 : -10
      const duration = 30 + Math.random() * 20
      const delay = Math.random() * 15

      newElements.push(
        <motion.div
          key={`creature-${i}`}
          style={{
            position: "absolute",
            top: `${yPos}%`,
            scale,
            opacity: 0.8,
            scaleX: startFromLeft ? 1 : -1,
          }}
          initial={{ left: `${xStart}%` }}
          animate={{ left: `${xEnd}%` }}
          transition={{
            duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            delay,
          }}
        >
          <RandomCreature />
        </motion.div>,
      )
    }

    setElements(newElements)
  }, [isMobile, isReady])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Deep sea gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 opacity-80" />

      {/* Light rays effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />

      {/* Water movement overlay - simplified */}
      <div className="absolute inset-0 water-overlay opacity-20" />

      {/* All elements */}
      {elements}
    </div>
  )
}
