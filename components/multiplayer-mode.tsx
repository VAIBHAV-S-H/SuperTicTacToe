"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/lib/store"
import { motion } from "framer-motion"
import { multiplayerService, type ConnectionStatus } from "@/lib/multiplayer-service"
import { Loader2, Copy, Check } from "lucide-react"

export default function MultiplayerMode() {
  const router = useRouter()
  const { createMultiplayerGame, joinMultiplayerGame, friendCode } = useGameStore()
  const [joinCode, setJoinCode] = useState("")
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Register connection status callback
    multiplayerService.registerCallbacks({
      onConnectionStatusChange: (status) => {
        setConnectionStatus(status)
        if (status === "connected") {
          router.push("/game")
        }
      },
    })

    return () => {
      // Clean up
      multiplayerService.registerCallbacks({
        onConnectionStatusChange: undefined,
      })
    }
  }, [router])

  const handleCreateGame = () => {
    createMultiplayerGame()
  }

  const handleJoinGame = () => {
    if (joinCode.trim()) {
      joinMultiplayerGame(joinCode.trim())
    }
  }

  const copyToClipboard = () => {
    if (friendCode) {
      navigator.clipboard.writeText(friendCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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
          <CardTitle className="text-2xl text-center text-blue-800">Multiplayer Game</CardTitle>
          <CardDescription className="text-center text-blue-600">Play with a friend online</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectionStatus === "disconnected" && (
            <>
              <div className="space-y-2">
                <h3 className="font-medium text-blue-800">Create a new game</h3>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  onClick={handleCreateGame}
                >
                  Create Game
                </Button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-blue-800">Join with a friend code</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter friend code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    className="flex-1"
                    maxLength={6}
                  />
                  <Button onClick={handleJoinGame} disabled={!joinCode.trim()}>
                    Join
                  </Button>
                </div>
              </div>
            </>
          )}

          {connectionStatus === "connecting" && (
            <div className="py-8 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
              <p className="text-blue-800 font-medium">Connecting...</p>
            </div>
          )}

          {connectionStatus === "waiting" && friendCode && (
            <div className="py-4 flex flex-col items-center justify-center">
              <div className="mb-4">
                <p className="text-blue-800 font-medium mb-2">Share this code with your friend:</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="bg-blue-100 px-4 py-2 rounded-md text-2xl font-bold tracking-wider text-blue-800">
                    {friendCode}
                  </div>
                  <Button size="icon" variant="outline" onClick={copyToClipboard} className="h-10 w-10">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin mb-2" />
              <p className="text-blue-600 text-sm">Waiting for opponent to join...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
