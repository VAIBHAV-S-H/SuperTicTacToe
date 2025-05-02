"use client"

import type React from "react"

import { motion } from "framer-motion"

export default function Seaweed({ style }: { style?: React.CSSProperties }) {
  return (
    <motion.div className="absolute" style={style}>
      <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* First seaweed strand */}
        <motion.path
          d="M20 120C20 100 30 90 25 70C20 50 30 40 25 20C20 0 10 0 10 20C10 40 20 50 15 70C10 90 20 100 20 120"
          fill="none"
          stroke="#2E7D32"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M20 120C20 100 30 90 25 70C20 50 30 40 25 20C20 0 10 0 10 20C10 40 20 50 15 70C10 90 20 100 20 120",
              "M20 120C20 100 25 85 20 70C15 55 25 40 20 20C15 0 10 0 15 20C20 40 15 55 20 70C25 85 20 100 20 120",
              "M20 120C20 100 30 90 25 70C20 50 30 40 25 20C20 0 10 0 10 20C10 40 20 50 15 70C10 90 20 100 20 120",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Second seaweed strand */}
        <motion.path
          d="M40 120C40 100 50 90 45 70C40 50 50 40 45 20C40 0 30 0 30 20C30 40 40 50 35 70C30 90 40 100 40 120"
          fill="none"
          stroke="#388E3C"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M40 120C40 100 50 90 45 70C40 50 50 40 45 20C40 0 30 0 30 20C30 40 40 50 35 70C30 90 40 100 40 120",
              "M40 120C40 100 45 85 40 70C35 55 45 40 40 20C35 0 30 0 35 20C40 40 35 55 40 70C45 85 40 100 40 120",
              "M40 120C40 100 50 90 45 70C40 50 50 40 45 20C40 0 30 0 30 20C30 40 40 50 35 70C30 90 40 100 40 120",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 0.5,
          }}
        />

        {/* Small details */}
        <motion.path
          d="M15 60L5 55M25 40L35 35M35 80L45 75"
          stroke="#4CAF50"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: [
              "M15 60L5 55M25 40L35 35M35 80L45 75",
              "M15 60L7 58M25 40L33 38M35 80L43 78",
              "M15 60L5 55M25 40L35 35M35 80L45 75",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      </svg>
    </motion.div>
  )
}
