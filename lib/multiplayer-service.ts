// This service handles WebSocket connections for multiplayer games
import { nanoid } from "nanoid"
import type { Board, Player } from "./types"

// Types for multiplayer
export type GameState = {
  board: Board
  currentPlayer: Player
  nextBoardIndex: number | null
  miniWinners: Array<string | null>
  gameWinner: string | null
  moveHistory: Array<{ boardIndex: number; squareIndex: number; player: Player }>
}

export type ChatMessage = {
  id: string
  text: string
  sender: "me" | "opponent"
  timestamp: number
}

export type ConnectionStatus = "disconnected" | "connecting" | "waiting" | "connected"

// Predefined chat messages
export const PRESET_MESSAGES = [
  "Good game!",
  "Nice move!",
  "Gotcha!",
  "Well played!",
  "Oops!",
  "Your turn!",
  "Thinking...",
  "Good luck!",
  "Let's play again after this!",
  "I'm enjoying this game!",
]

class MultiplayerService {
  private socket: WebSocket | null = null
  private gameId: string | null = null
  private playerId: string | null = null
  private callbacks: {
    onConnectionStatusChange?: (status: ConnectionStatus) => void
    onGameStateChange?: (state: GameState) => void
    onChatMessage?: (message: ChatMessage) => void
    onError?: (error: string) => void
    onOpponentMove?: (boardIndex: number, squareIndex: number) => void
  } = {}

  // Initialize the service
  init() {
    this.playerId = localStorage.getItem("playerId") || nanoid(8)
    localStorage.setItem("playerId", this.playerId)
  }

  // Register callbacks
  registerCallbacks(callbacks: {
    onConnectionStatusChange?: (status: ConnectionStatus) => void
    onGameStateChange?: (state: GameState) => void
    onChatMessage?: (message: ChatMessage) => void
    onError?: (error: string) => void
    onOpponentMove?: (boardIndex: number, squareIndex: number) => void
  }) {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  // Create a new game and get a friend code
  createGame(): string {
    this.disconnect()
    this.gameId = nanoid(6).toUpperCase()
    this.connectToGame(this.gameId, true)
    return this.gameId
  }

  // Join an existing game with a friend code
  joinGame(gameId: string): void {
    this.disconnect()
    this.gameId = gameId.toUpperCase()
    this.connectToGame(this.gameId, false)
  }

  // Connect to a game
  private connectToGame(gameId: string, isHost: boolean) {
    if (this.callbacks.onConnectionStatusChange) {
      this.callbacks.onConnectionStatusChange("connecting")
    }

    // In a real implementation, this would connect to a WebSocket server
    // For this demo, we'll simulate the connection with a timeout
    setTimeout(() => {
      if (isHost) {
        if (this.callbacks.onConnectionStatusChange) {
          this.callbacks.onConnectionStatusChange("waiting")
        }

        // FIXED: Simulate the host getting connected after a short delay
        // This simulates a guest joining the game
        setTimeout(() => {
          if (this.callbacks.onConnectionStatusChange) {
            this.callbacks.onConnectionStatusChange("connected")
          }
        }, 3000)
      } else {
        // Guest connects immediately
        if (this.callbacks.onConnectionStatusChange) {
          this.callbacks.onConnectionStatusChange("connected")
        }

        // Simulate sending a notification to the host that a guest has joined
        // In a real implementation, this would be handled by the server
      }
    }, 1000)
  }

  // Disconnect from the current game
  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    this.gameId = null
    if (this.callbacks.onConnectionStatusChange) {
      this.callbacks.onConnectionStatusChange("disconnected")
    }
  }

  // Send a move to the opponent
  sendMove(boardIndex: number, squareIndex: number) {
    // In a real implementation, this would send the move through the WebSocket
    console.log(`Sending move: board ${boardIndex}, square ${squareIndex}`)

    // For demo purposes, simulate receiving the move after a delay
    setTimeout(() => {
      if (this.callbacks.onOpponentMove) {
        // Simulate opponent's move
        const opponentBoardIndex = Math.floor(Math.random() * 9)
        const opponentSquareIndex = Math.floor(Math.random() * 9)
        this.callbacks.onOpponentMove(opponentBoardIndex, opponentSquareIndex)
      }
    }, 1500)
  }

  // Send a chat message
  sendChatMessage(text: string) {
    const message: ChatMessage = {
      id: nanoid(),
      text,
      sender: "me",
      timestamp: Date.now(),
    }

    // In a real implementation, this would send the message through the WebSocket
    console.log(`Sending chat message: ${text}`)

    // For demo purposes, we'll simulate receiving a response after a delay
    setTimeout(() => {
      if (this.callbacks.onChatMessage) {
        this.callbacks.onChatMessage(message)

        // Simulate opponent response
        if (Math.random() > 0.5) {
          const responseIndex = Math.floor(Math.random() * PRESET_MESSAGES.length)
          const responseMessage: ChatMessage = {
            id: nanoid(),
            text: PRESET_MESSAGES[responseIndex],
            sender: "opponent",
            timestamp: Date.now(),
          }

          setTimeout(
            () => {
              if (this.callbacks.onChatMessage) {
                this.callbacks.onChatMessage(responseMessage)
              }
            },
            1000 + Math.random() * 2000,
          )
        }
      }
    }, 100)
  }
}

// Export a singleton instance
export const multiplayerService = new MultiplayerService()

// Initialize the service when imported
if (typeof window !== "undefined") {
  multiplayerService.init()
}
