"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

// Optimize the creature components to be more performant and mildly cartoonish
// Replace the MoonJellyfish component with this optimized version
const MoonJellyfish = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      y: [0, 5, -5, 0],
      scale: [1, 1.05, 0.95, 1],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
      },
    })
  }, [controls])

  return (
    <motion.div className="absolute" style={style} animate={controls}>
      <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified bell shape */}
        <motion.ellipse
          cx="50"
          cy="40"
          rx="40"
          ry="30"
          fill="rgba(173, 216, 230, 0.7)"
          animate={{
            rx: [40, 38, 42, 40],
            ry: [30, 32, 28, 30],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Simplified inner patterns */}
        <circle cx="40" cy="35" r="8" fill="rgba(255, 255, 255, 0.8)" />
        <circle cx="60" cy="35" r="8" fill="rgba(255, 255, 255, 0.8)" />
        <circle cx="40" cy="50" r="8" fill="rgba(255, 255, 255, 0.8)" />
        <circle cx="60" cy="50" r="8" fill="rgba(255, 255, 255, 0.8)" />

        {/* Simplified tentacles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M${35 + i * 5} 65C${35 + i * 5} 65 ${30 + i * 5} 85 ${35 + i * 5} 105`}
            stroke="rgba(173, 216, 230, 0.7)"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              d: [
                `M${35 + i * 5} 65C${35 + i * 5} 65 ${30 + i * 5} 85 ${35 + i * 5} 105`,
                `M${35 + i * 5} 65C${35 + i * 5} 65 ${35 + i * 5 + 5} 85 ${35 + i * 5} 105`,
                `M${35 + i * 5} 65C${35 + i * 5} 65 ${30 + i * 5} 85 ${35 + i * 5} 105`,
              ],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          />
        ))}

        {/* Cute face */}
        <circle cx="40" cy="35" r="2" fill="black" />
        <circle cx="60" cy="35" r="2" fill="black" />
        <path d="M45 45Q50 48 55 45" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

// Replace the Mandarinfish component with this optimized version
const Mandarinfish = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
      },
    })
  }, [controls])

  return (
    <motion.div className="absolute" style={style} animate={controls}>
      <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified body */}
        <motion.path
          d="M20 30C20 20 40 10 70 10C90 10 90 20 90 30C90 40 90 50 70 50C40 50 20 40 20 30Z"
          fill="#FF9E80"
          animate={{
            d: [
              "M20 30C20 20 40 10 70 10C90 10 90 20 90 30C90 40 90 50 70 50C40 50 20 40 20 30Z",
              "M20 30C20 20 40 12 70 12C90 12 90 20 90 30C90 40 90 48 70 48C40 48 20 40 20 30Z",
              "M20 30C20 20 40 10 70 10C90 10 90 20 90 30C90 40 90 50 70 50C40 50 20 40 20 30Z",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Simplified tail */}
        <motion.path
          d="M20 30L10 20M20 30L10 40"
          stroke="#FF9E80"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            d: ["M20 30L10 20M20 30L10 40", "M20 30L12 25M20 30L12 35", "M20 30L10 20M20 30L10 40"],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Simplified patterns */}
        <path d="M40 20L50 30L60 20" stroke="#651FFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 40L50 30L60 40" stroke="#651FFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 20L80 30L70 40" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />

        {/* Eye */}
        <circle cx="80" cy="25" r="5" fill="white" />
        <circle cx="82" cy="25" r="2" fill="black" />

        {/* Cute smile */}
        <path d="M75 35Q80 38 85 35" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

// Replace the Dolphin component with this optimized version
const Dolphin = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
      },
    })
  }, [controls])

  return (
    <motion.div className="absolute" style={style} animate={controls}>
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified body */}
        <motion.path
          d="M20 30C20 20 40 10 70 10C90 10 100 20 100 30C100 40 90 50 70 50C40 50 20 40 20 30Z"
          fill="#64B5F6"
          animate={{
            d: [
              "M20 30C20 20 40 10 70 10C90 10 100 20 100 30C100 40 90 50 70 50C40 50 20 40 20 30Z",
              "M20 30C20 20 40 12 70 12C90 12 100 20 100 30C100 40 90 48 70 48C40 48 20 40 20 30Z",
              "M20 30C20 20 40 10 70 10C90 10 100 20 100 30C100 40 90 50 70 50C40 50 20 40 20 30Z",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Simplified dorsal fin */}
        <motion.path
          d="M60 10L60 -5"
          stroke="#64B5F6"
          strokeWidth="10"
          strokeLinecap="round"
          animate={{
            d: ["M60 10L60 -5", "M60 10L65 -5", "M60 10L60 -5"],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Simplified tail */}
        <motion.path
          d="M20 30L5 20M20 30L5 40"
          stroke="#64B5F6"
          strokeWidth="8"
          strokeLinecap="round"
          animate={{
            d: ["M20 30L5 20M20 30L5 40", "M20 30L10 25M20 30L10 35", "M20 30L5 20M20 30L5 40"],
          }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Eye */}
        <circle cx="90" cy="25" r="5" fill="white" />
        <circle cx="92" cy="25" r="2" fill="black" />

        {/* Cute smile */}
        <path d="M85 35Q90 40 95 35" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

// Replace the SeaTurtle component with this optimized version
const SeaTurtle = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      y: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
      },
    })
  }, [controls])

  return (
    <motion.div className="absolute" style={style} animate={controls}>
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified shell */}
        <ellipse cx="60" cy="40" rx="35" ry="25" fill="#66BB6A" />
        <ellipse cx="60" cy="40" rx="25" ry="15" fill="#81C784" />

        {/* Shell patterns */}
        <path d="M40 30L50 35L60 30L70 35L80 30" stroke="#2E7D32" strokeWidth="2" />
        <path d="M35 40L50 45L60 40L70 45L85 40" stroke="#2E7D32" strokeWidth="2" />
        <path d="M40 50L50 55L60 50L70 55L80 50" stroke="#2E7D32" strokeWidth="2" />

        {/* Head */}
        <motion.ellipse
          cx="90"
          cy="40"
          rx="12"
          ry="10"
          fill="#81C784"
          animate={{
            x: [0, 3, 0],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Eyes */}
        <circle cx="95" cy="35" r="3" fill="white" />
        <circle cx="96" cy="35" r="1.5" fill="black" />

        {/* Smile */}
        <path d="M92 42Q95 45 98 42" stroke="black" strokeWidth="1" strokeLinecap="round" />

        {/* Flippers */}
        <motion.path
          d="M35 30L20 15"
          stroke="#81C784"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            d: ["M35 30L20 15", "M35 30L22 20", "M35 30L20 15"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        <motion.path
          d="M35 50L20 65"
          stroke="#81C784"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            d: ["M35 50L20 65", "M35 50L22 60", "M35 50L20 65"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.5,
          }}
        />

        <motion.path
          d="M85 30L100 15"
          stroke="#81C784"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            d: ["M85 30L100 15", "M85 30L97 20", "M85 30L100 15"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.25,
          }}
        />

        <motion.path
          d="M85 50L100 65"
          stroke="#81C784"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            d: ["M85 50L100 65", "M85 50L97 60", "M85 50L100 65"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.75,
          }}
        />
      </svg>
    </motion.div>
  )
}

// Replace the Seahorse component with this optimized version
const Seahorse = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
      },
    })
  }, [controls])

  return (
    <motion.div className="absolute" style={style} animate={controls}>
      <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified body curve */}
        <motion.path
          d="M30 20C40 20 45 30 45 40C45 50 35 55 25 55C15 55 10 65 10 75C10 85 20 90 30 90C40 90 45 100 45 110"
          stroke="#FFC107"
          strokeWidth="8"
          strokeLinecap="round"
          animate={{
            d: [
              "M30 20C40 20 45 30 45 40C45 50 35 55 25 55C15 55 10 65 10 75C10 85 20 90 30 90C40 90 45 100 45 110",
              "M30 20C38 20 43 30 43 40C43 50 33 55 23 55C13 55 8 65 8 75C8 85 18 90 28 90C38 90 43 100 43 110",
              "M30 20C40 20 45 30 45 40C45 50 35 55 25 55C15 55 10 65 10 75C10 85 20 90 30 90C40 90 45 100 45 110",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Simplified head */}
        <circle cx="30" cy="15" r="10" fill="#FFC107" />

        {/* Eye */}
        <circle cx="27" cy="12" r="2" fill="black" />

        {/* Cute smile */}
        <path d="M25 18Q30 20 35 18" stroke="black" strokeWidth="1" strokeLinecap="round" />

        {/* Simplified fin */}
        <motion.path
          d="M45 40L55 35"
          stroke="#FFCA28"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: ["M45 40L55 35", "M45 40L53 37", "M45 40L55 35"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      </svg>
    </motion.div>
  )
}

// Update the seaCreatures array to only include the optimized components
// First, let's make sure all the requested sea creatures are included in the seaCreatures array
// Update the seaCreatures array to include all the requested creatures

const SeaAnemone = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const randomX = 10 + Math.random() * 80

    // Sea anemones are mostly stationary, just gentle swaying
    const animate = async () => {
      await controls.start({
        y: ["100vh", `calc(100vh - 50px)`],
        x: [`${randomX}%`, `${randomX}%`],
        transition: {
          y: { duration: 5, ease: "easeOut" },
        },
      })
    }

    animate()
  }, [controls])

  return (
    <motion.div
      ref={containerRef}
      className="absolute"
      style={{ ...style, bottom: "0", left: `${10 + Math.random() * 80}%` }}
      animate={controls}
    >
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Base/foot of anemone */}
        <ellipse cx="50" cy="70" rx="25" ry="10" fill="#FF4081" />

        {/* Tentacles with gentle swaying motion */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const length = 20 + Math.random() * 10
          const startX = 50
          const startY = 50
          const endX = startX + Math.cos(angle) * length
          const endY = startY + Math.sin(angle) * length

          return (
            <motion.line
              key={i}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={i % 2 === 0 ? "#FF4081" : "#F50057"}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                x2: [endX, endX + Math.cos(angle) * 5, endX - Math.cos(angle) * 5, endX],
                y2: [endY, endY + Math.sin(angle) * 5, endY - Math.sin(angle) * 5, endY],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
            />
          )
        })}

        {/* Center of anemone */}
        <circle cx="50" cy="50" r="10" fill="#FF80AB" />
      </svg>
    </motion.div>
  )
}

const Nudibranch = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const direction = Math.random() > 0.5 ? "right" : "left"
    const startX = direction === "right" ? "-100px" : "100vw"
    const endX = direction === "right" ? "100vw" : "-100px"
    const randomHeight = 70 + Math.random() * 20
    const speed = 40 + Math.random() * 20 // Nudibranchs move slowly

    const animate = async () => {
      await controls.start({
        x: [startX, endX],
        y: [`${randomHeight}%`, `${randomHeight + (Math.random() * 10 - 5)}%`],
        transition: {
          x: { duration: speed, ease: "linear" },
          y: {
            duration: speed / 4,
            repeat: 4,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        },
      })

      if (containerRef.current) {
        containerRef.current.style.left = startX
        controls.set({ y: `${70 + Math.random() * 20}%` })
        animate()
      }
    }

    animate()
  }, [controls])

  // Random color scheme for variety
  const colors = [
    ["#FF4081", "#F50057", "#C51162"], // Pink
    ["#536DFE", "#3D5AFE", "#304FFE"], // Blue
    ["#FF9100", "#FF6D00", "#FF3D00"], // Orange
    ["#00E676", "#00C853", "#00BFA5"], // Green
  ]
  const colorScheme = colors[Math.floor(Math.random() * colors.length)]

  return (
    <motion.div ref={containerRef} className="absolute" style={{ ...style, left: "-100px" }} animate={controls}>
      <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nudibranch body */}
        <motion.path
          d="M10 20C10 15 20 10 40 10C60 10 70 15 70 20C70 25 60 30 40 30C20 30 10 25 10 20Z"
          fill={colorScheme[0]}
          animate={{
            d: [
              "M10 20C10 15 20 10 40 10C60 10 70 15 70 20C70 25 60 30 40 30C20 30 10 25 10 20Z",
              "M10 20C10 15 20 12 40 12C60 12 70 15 70 20C70 25 60 28 40 28C20 28 10 25 10 20Z",
              "M10 20C10 15 20 10 40 10C60 10 70 15 70 20C70 25 60 30 40 30C20 30 10 25 10 20Z",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Rhinophores (sensory tentacles) */}
        <motion.line
          x1="60"
          y1="15"
          x2="60"
          y2="5"
          stroke={colorScheme[1]}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            x2: [60, 58, 62, 60],
            y2: [5, 6, 6, 5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
        <motion.line
          x1="65"
          y1="15"
          x2="65"
          y2="5"
          stroke={colorScheme[1]}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            x2: [65, 67, 63, 65],
            y2: [5, 6, 6, 5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.5,
          }}
        />

        {/* Cerata (colorful appendages) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={i}
            x1={20 + i * 5}
            y1="20"
            x2={20 + i * 5}
            y2="15"
            stroke={colorScheme[2]}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              x2: [20 + i * 5, 21 + i * 5, 19 + i * 5, 20 + i * 5],
              y2: [15, 14, 14, 15],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              delay: i * 0.1,
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

const BlanketOctopus = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const side = Math.random() > 0.5
    const startX = side ? "-100px" : "100vw"
    const endX = side ? "100vw" : "-100px"

    const animate = async () => {
      await controls.start({
        y: ["100vh", "0vh"],
        x: [startX, `calc(${startX} + 100px)`, `calc(${startX} - 100px)`, endX],
        rotate: [0, 10, -10, 0],
        transition: {
          y: { duration: 30, ease: "easeInOut" },
          x: {
            duration: 30,
            ease: "linear",
          },
          rotate: {
            duration: 8,
            repeat: 3,
            repeatType: "mirror",
          },
        },
      })

      if (containerRef.current) {
        containerRef.current.style.top = "100vh"
        controls.set({ x: Math.random() > 0.5 ? "-100px" : "100vw" })
        animate()
      }
    }

    animate()
  }, [controls])

  return (
    <motion.div ref={containerRef} className="absolute" style={{ ...style, top: "100vh" }} animate={controls}>
      <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blanket/cape - characteristic of female blanket octopus */}
        <motion.path
          d="M90 40C120 40 150 60 170 100C150 140 120 160 90 160C60 160 30 140 10 100C30 60 60 40 90 40Z"
          fill="rgba(186, 104, 200, 0.6)"
          animate={{
            d: [
              "M90 40C120 40 150 60 170 100C150 140 120 160 90 160C60 160 30 140 10 100C30 60 60 40 90 40Z",
              "M90 40C120 40 155 65 175 100C155 135 120 160 90 160C60 160 25 135 5 100C25 65 60 40 90 40Z",
              "M90 40C120 40 150 60 170 100C150 140 120 160 90 160C60 160 30 140 10 100C30 60 60 40 90 40Z",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Body */}
        <ellipse cx="90" cy="60" rx="30" ry="25" fill="#9C27B0" />

        {/* Eyes */}
        <circle cx="75" cy="55" r="8" fill="white" />
        <circle cx="105" cy="55" r="8" fill="white" />
        <motion.circle
          cx="75"
          cy="55"
          r="4"
          fill="black"
          animate={{
            cx: [75, 77, 73, 75],
            cy: [55, 53, 57, 55],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
        <motion.circle
          cx="105"
          cy="55"
          r="4"
          fill="black"
          animate={{
            cx: [105, 107, 103, 105],
            cy: [55, 53, 57, 55],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.3,
          }}
        />

        {/* Tentacles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI + Math.PI / 2
          const length = 50 + Math.random() * 30
          const startX = 90
          const startY = 80
          const controlX = startX + Math.cos(angle) * length * 0.5
          const controlY = startY + Math.sin(angle) * length * 0.5
          const endX = startX + Math.cos(angle) * length
          const endY = startY + Math.sin(angle) * length

          return (
            <motion.path
              key={i}
              d={`M${startX} ${startY} Q${controlX} ${controlY} ${endX} ${endY}`}
              stroke="#9C27B0"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                d: [
                  `M${startX} ${startY} Q${controlX} ${controlY} ${endX} ${endY}`,
                  `M${startX} ${startY} Q${controlX + 10} ${controlY + 10} ${endX + 5} ${endY + 5}`,
                  `M${startX} ${startY} Q${controlX - 10} ${controlY - 10} ${endX - 5} ${endY - 5}`,
                  `M${startX} ${startY} Q${controlX} ${controlY} ${endX} ${endY}`,
                ],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
            />
          )
        })}
      </svg>
    </motion.div>
  )
}

const Pufferfish = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInflated] = useState(Math.random() > 0.5)

  useEffect(() => {
    const direction = Math.random() > 0.5 ? "right" : "left"
    const startX = direction === "right" ? "-100px" : "100vw"
    const endX = direction === "right" ? "100vw" : "-100px"
    const randomHeight = 30 + Math.random() * 50
    const speed = 20 + Math.random() * 15

    const animate = async () => {
      await controls.start({
        x: [startX, endX],
        y: [`${randomHeight}%`, `${randomHeight + (Math.random() * 20 - 10)}%`],
        rotate: [0, Math.random() * 10 - 5],
        transition: {
          x: { duration: speed, ease: "linear" },
          y: {
            duration: speed / 3,
            repeat: 3,
            repeatType: "mirror",
            ease: "easeInOut",
          },
          rotate: {
            duration: 2,
            repeat: Math.floor(speed / 2),
            repeatType: "mirror",
          },
        },
      })

      if (containerRef.current) {
        containerRef.current.style.left = startX
        controls.set({ y: `${30 + Math.random() * 50}%` })
        animate()
      }
    }

    animate()
  }, [controls, isInflated])

  return (
    <motion.div ref={containerRef} className="absolute" style={{ ...style, left: "-100px" }} animate={controls}>
      <svg
        width={isInflated ? "100" : "80"}
        height={isInflated ? "100" : "60"}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pufferfish body - inflated or deflated */}
        <motion.circle
          cx="50"
          cy="50"
          r={isInflated ? "40" : "25"}
          fill="#FFC107"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Spikes when inflated */}
        {isInflated &&
          Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2
            const x1 = 50 + Math.cos(angle) * 40
            const y1 = 50 + Math.sin(angle) * 40
            const x2 = 50 + Math.cos(angle) * 55
            const y2 = 50 + Math.sin(angle) * 55

            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FFA000"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [x2, 50 + Math.cos(angle) * 50, 50 + Math.cos(angle) * 60, x2],
                  y2: [y2, 50 + Math.sin(angle) * 50, 50 + Math.sin(angle) * 60, y2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  delay: (i * 0.1) % 1,
                }}
              />
            )
          })}

        {/* Eyes */}
        <circle cx={isInflated ? "35" : "30"} cy={isInflated ? "35" : "40"} r="5" fill="white" />
        <circle cx={isInflated ? "65" : "50"} cy={isInflated ? "35" : "40"} r="5" fill="white" />
        <motion.circle
          cx={isInflated ? "35" : "30"}
          cy={isInflated ? "35" : "40"}
          r="2"
          fill="black"
          animate={{
            cx: [isInflated ? 35 : 30, isInflated ? 37 : 32, isInflated ? 33 : 28, isInflated ? 35 : 30],
            cy: [isInflated ? 35 : 40, isInflated ? 33 : 38, isInflated ? 37 : 42, isInflated ? 35 : 40],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
        <motion.circle
          cx={isInflated ? "65" : "50"}
          cy={isInflated ? "35" : "40"}
          r="2"
          fill="black"
          animate={{
            cx: [isInflated ? 65 : 50, isInflated ? 67 : 52, isInflated ? 63 : 48, isInflated ? 65 : 50],
            cy: [isInflated ? 35 : 40, isInflated ? 33 : 38, isInflated ? 37 : 42, isInflated ? 35 : 40],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.3,
          }}
        />

        {/* Mouth */}
        <path
          d={isInflated ? "M40 60Q50 70 60 60" : "M35 45Q40 50 45 45"}
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Fins */}
        <motion.path
          d={isInflated ? "M20 50L5 40M20 50L5 60" : "M15 40L5 35M15 40L5 45"}
          stroke="#FFC107"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: isInflated
              ? ["M20 50L5 40M20 50L5 60", "M20 50L10 45M20 50L10 55", "M20 50L5 40M20 50L5 60"]
              : ["M15 40L5 35M15 40L5 45", "M15 40L8 38M15 40L8 42", "M15 40L5 35M15 40L5 45"],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
        <motion.path
          d={isInflated ? "M80 50L95 40M80 50L95 60" : "M65 40L75 35M65 40L75 45"}
          stroke="#FFC107"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: isInflated
              ? ["M80 50L95 40M80 50L95 60", "M80 50L90 45M80 50L90 55", "M80 50L95 40M80 50L95 60"]
              : ["M65 40L75 35M65 40L75 45", "M65 40L72 38M65 40L72 42", "M65 40L75 35M65 40L75 45"],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.5,
          }}
        />
      </svg>
    </motion.div>
  )
}

const Bubble = ({ style }: { style?: React.CSSProperties }) => (
  <motion.div
    className="absolute rounded-full bg-white/20 backdrop-blur-sm"
    style={{ ...style, width: style?.width || "10px", height: style?.height || "10px" }}
    animate={{
      y: [0, -500],
      x: [0, Math.random() * 20 - 10],
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  />
)

const Seaweed = ({ style }: { style?: React.CSSProperties }) => {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      rotate: [0, 5, -5, 0],
      y: [0, 3, -3, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
      },
    })
  }, [controls])

  return (
    <motion.div className="absolute" style={style} animate={controls}>
      <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main seaweed stalk */}
        <motion.path
          d="M20 70C20 60 10 40 10 20C10 10 20 0 20 0"
          stroke="#4CAF50"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M20 70C20 60 10 40 10 20C10 10 20 0 20 0",
              "M20 70C20 60 12 40 12 20C12 10 20 0 20 0",
              "M20 70C20 60 10 40 10 20C10 10 20 0 20 0",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Smaller leaves/fronds */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M20 ${20 + i * 20}C25 ${20 + i * 20} 30 ${15 + i * 20} 30 ${10 + i * 20}`}
            stroke="#4CAF50"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              d: [
                `M20 ${20 + i * 20}C25 ${20 + i * 20} 30 ${15 + i * 20} 30 ${10 + i * 20}`,
                `M20 ${20 + i * 20}C23 ${20 + i * 20} 28 ${17 + i * 20} 28 ${12 + i * 20}`,
                `M20 ${20 + i * 20}C25 ${20 + i * 20} 30 ${15 + i * 20} 30 ${10 + i * 20}`,
              ],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

// List of all sea creatures
//const seaCreatures = [MoonJellyfish, Mandarinfish, SeaAnemone, Dolphin, SeaTurtle, Seahorse]

export default function OceanBackground() {
  const [bubbles, setBubbles] = useState<React.ReactNode[]>([])
  const [creatures, setCreatures] = useState<React.ReactNode[]>([])
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Creature spawning logic
  const maxCreatures = 6 // Maximum 6 creatures at any time
  let activeCreatures: Array<{
    id: string
    element: React.ReactNode
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    size: number
    type: string
  }> = []

  const [_, set_] = useState(null)

  // Initial spawn of creatures
  useEffect(() => {
    const spawnInitialCreatures = () => {
      const initialCount = isMobile ? 2 : 3
      for (let i = 0; i < initialCount; i++) {
        spawnCreature()
      }
    }

    // Spawn a new random creature
    const spawnCreature = () => {
      if (activeCreatures.length >= maxCreatures) return

      const creatureIndex = Math.floor(Math.random() * seaCreatures.length)
      const RandomCreature = seaCreatures[creatureIndex]
      const id = `creature-${Date.now()}-${Math.random()}`
      const scale = 0.5 + Math.random() * 0.5

      // Determine starting position (left or right side)
      const startFromLeft = Math.random() > 0.5
      const xPos = startFromLeft ? -150 : window.innerWidth + 150
      const yPos = 100 + Math.random() * (window.innerHeight - 200)

      // Set velocity based on starting position
      const xVel = startFromLeft ? 0.5 + Math.random() * 1 : -(0.5 + Math.random() * 1)
      const yVel = Math.random() * 0.4 - 0.2

      const creatureType = seaCreatures[creatureIndex].name

      const newCreature = {
        id,
        element: (
          <RandomCreature
            key={id}
            style={{
              opacity: 0.8 + Math.random() * 0.2,
              transform: `scale(${scale})`,
              zIndex: Math.floor(scale * 10),
              position: "absolute",
              left: `${xPos}px`,
              top: `${yPos}px`,
              transition: "transform 0.5s ease-out",
            }}
          />
        ),
        position: { x: xPos, y: yPos },
        velocity: { x: xVel, y: yVel },
        size: scale * 100, // Approximate size based on scale
        type: creatureType,
      }

      activeCreatures = [...activeCreatures, newCreature]
      setCreatures(activeCreatures.map((c) => c.element))
    }

    // Update creature positions and handle collisions
    // In the useEffect for creature spawning, update the updateCreatures function to fix the direction issues:
    const updateCreatures = () => {
      if (activeCreatures.length === 0) return

      const updatedCreatures = [...activeCreatures]
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      let needsUpdate = false

      // Update positions and check for screen boundaries
      for (let i = 0; i < updatedCreatures.length; i++) {
        const creature = updatedCreatures[i]

        // Update position
        creature.position.x += creature.velocity.x * 3
        creature.position.y += creature.velocity.y * 3

        // Check if creature has completely passed the screen
        if (
          (creature.velocity.x > 0 && creature.position.x > screenWidth + 200) ||
          (creature.velocity.x < 0 && creature.position.x < -200) ||
          creature.position.y < -200 ||
          creature.position.y > screenHeight + 200
        ) {
          // Remove this creature
          updatedCreatures.splice(i, 1)
          i--
          needsUpdate = true
          continue
        }

        // Handle collisions with other creatures
        for (let j = i + 1; j < updatedCreatures.length; j++) {
          const otherCreature = updatedCreatures[j]

          // Calculate distance between creatures
          const dx = creature.position.x - otherCreature.position.x
          const dy = creature.position.y - otherCreature.position.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Minimum distance to maintain (sum of their radii plus buffer)
          const minDistance = (creature.size + otherCreature.size) / 2 + 20

          // If too close, apply repulsion
          if (distance < minDistance) {
            // Normalize direction vector
            const nx = dx / distance
            const ny = dy / distance

            // Calculate repulsion strength (stronger when closer)
            const repulsionStrength = (0.05 * (minDistance - distance)) / minDistance

            // Apply repulsion to velocity
            creature.velocity.x += nx * repulsionStrength
            creature.velocity.y += ny * repulsionStrength
            otherCreature.velocity.x -= nx * repulsionStrength
            otherCreature.velocity.y -= ny * repulsionStrength

            needsUpdate = true
          }
        }

        // Get the correct component type from the stored type name
        const CreatureComponent = seaCreatures.find((c) => c.name === creature.type) || MoonJellyfish

        // Update the element with new position and correct facing direction
        creature.element = (
          <CreatureComponent
            key={creature.id}
            style={{
              opacity: 0.8 + Math.random() * 0.2,
              transform: `scale(${creature.size / 100}) ${creature.velocity.x < 0 ? "scaleX(-1)" : ""}`,
              zIndex: Math.floor(creature.size / 10),
              position: "absolute",
              left: `${creature.position.x}px`,
              top: `${creature.position.y}px`,
              transition: "transform 0.5s ease-out",
            }}
          />
        )
      }

      // Update state if needed
      if (needsUpdate || Math.random() > 0.7) {
        activeCreatures = updatedCreatures
        setCreatures(activeCreatures.map((c) => c.element))
      }

      // Spawn new creatures if needed
      if (activeCreatures.length < maxCreatures && Math.random() > 0.95) {
        spawnCreature()
      }
    }

    // Start the simulation
    spawnInitialCreatures()

    // Update at regular intervals
    const interval = setInterval(updateCreatures, 50)

    return () => clearInterval(interval)
  }, [isMobile])

  // Generate bubbles
  useEffect(() => {
    const newBubbles = []
    const bubbleCount = isMobile ? 15 : 30

    for (let i = 0; i < bubbleCount; i++) {
      const size = 5 + Math.random() * 15
      newBubbles.push(
        <Bubble
          key={`bubble-${i}`}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: 0.1 + Math.random() * 0.4,
          }}
        />,
      )
    }

    setBubbles(newBubbles)
  }, [isMobile])

  // Add sea anemones and vegetation at the bottom of the screen
  // In the return statement, add this before the closing div:
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Deep sea gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 opacity-80" />

      {/* Light rays effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />

      {/* Water movement overlay */}
      <div className="absolute inset-0 water-overlay opacity-30" />

      {/* Bubbles */}
      {bubbles}

      {/* Sea creatures - dynamically managed */}
      {creatures}

      {/* Sea anemones and vegetation at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] z-10">
        {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
          <SeaAnemone
            key={`anemone-${i}`}
            style={{
              bottom: "0",
              left: `${(i / (isMobile ? 4 : 8)) * 100}%`,
              opacity: 0.8 + Math.random() * 0.2,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        ))}
        {/* Seaweed/vegetation */}
        {Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
          <Seaweed
            key={`seaweed-${i}`}
            style={{
              bottom: "0",
              left: `${Math.random() * 100}%`,
              opacity: 0.8 + Math.random() * 0.2,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const seaCreatures = [MoonJellyfish, Mandarinfish, Dolphin, SeaTurtle, Seahorse, Nudibranch, BlanketOctopus, Pufferfish]
