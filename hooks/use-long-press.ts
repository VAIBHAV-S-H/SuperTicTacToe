"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"

interface LongPressOptions {
  threshold?: number // Duration in ms
  onStart?: (e: React.MouseEvent | React.TouchEvent) => void
  onFinish?: () => void
  onCancel?: () => void
  captureEvent?: boolean
}

interface LongPressResult {
  onMouseDown: (e: React.MouseEvent) => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  isLongPressing: boolean
  longPressProgress: number
}

export function useLongPress(callback: () => void, options: LongPressOptions = {}): LongPressResult {
  const [isLongPressing, setIsLongPressing] = useState(false)
  const [longPressProgress, setLongPressProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const {
    threshold = 500,
    onStart = () => {},
    onFinish = () => {},
    onCancel = () => {},
    captureEvent = false,
  } = options

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (captureEvent) {
        e.preventDefault()
        e.stopPropagation()
      }

      onStart(e)
      setIsLongPressing(true)
      setLongPressProgress(0)
      startTimeRef.current = Date.now()

      // Clear any existing timers
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
      }

      // Set up progress updates
      progressTimerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current
        const progress = elapsed / threshold
        setLongPressProgress(progress)

        if (progress >= 1) {
          clearInterval(progressTimerRef.current!)
        }
      }, 16) // ~60fps

      // Set the timeout for the long press
      timerRef.current = setTimeout(() => {
        callback()
        onFinish()
        setIsLongPressing(false)
        setLongPressProgress(0)

        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current)
        }
      }, threshold)
    },
    [callback, threshold, onStart, onFinish, captureEvent],
  )

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }

    if (isLongPressing) {
      onCancel()
      setIsLongPressing(false)
      setLongPressProgress(0)
    }
  }, [isLongPressing, onCancel])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
      }
    }
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
    isLongPressing,
    longPressProgress,
  }
}
