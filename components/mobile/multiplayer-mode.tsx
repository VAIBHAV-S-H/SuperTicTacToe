"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/lib/store"
import { motion } from "framer-motion"
import { multiplayerService, type ConnectionStatus } from "@/lib/multiplayer-service"
import { Loader2, Copy, Check, UserPlus } from "lucide-react"

export default function MobileMultiplayerMode() {
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

  // For demo purposes only - simulate a guest joining
  const simulateGuestJoined = () => {
    multiplayerService.simulateGuestJoined()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2"
    >
      <Card className="ocean-card border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center text-blue-800">Multiplayer Game</CardTitle>
          <CardDescription className="text-center text-blue-600">Play with a friend online</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {connectionStatus === "disconnected" && (
            <>
              <div className="space-y-2">
                <h3 className="font-medium text-blue-800 text-sm">Create a new game</h3>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  onClick={handleCreateGame}
                  size="sm"
                >
                  Create Game
                </Button>
              </div>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-blue-800 text-sm">Join with a friend code</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    className="flex-1"
                    maxLength={6}
                  />
                  <Button onClick={handleJoinGame} disabled={!joinCode.trim()} size="sm">
                    Join
                  </Button>
                </div>
              </div>
            </>
          )}

          {connectionStatus === "connecting" && (
            <div className="py-6 flex flex-col items-center justify-center">
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin mb-3" />
              <p className="text-blue-800 font-medium text-sm">Connecting...</p>
            </div>
          )}

          {connectionStatus === "waiting" && friendCode && (
            <div className="py-3 flex flex-col items-center justify-center">
              <div className="mb-3">
                <p className="text-blue-800 font-medium mb-2 text-sm">Share this code with your friend:</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="bg-blue-100 px-3 py-1 rounded-md text-xl font-bold tracking-wider text-blue-800">
                    {friendCode}
                  </div>
                  <Button size="icon" variant="outline" onClick={copyToClipboard} className="h-8 w-8">
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin mb-2" />
              <p className="text-blue-600 text-xs">Waiting for opponent to join...</p>

              {/* Demo button to simulate a guest joining */}
              <div className="mt-3 border-t border-gray-200 pt-3 w-full">
                <p className="text-xs text-gray-500 mb-2 text-center">Demo: Simulate opponent joining</p>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-1 text-xs"
                  onClick={simulateGuestJoined}
                  size="sm"
                >
                  <UserPlus className="h-3 w-3" />
                  <span>Simulate Opponent Joined</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
