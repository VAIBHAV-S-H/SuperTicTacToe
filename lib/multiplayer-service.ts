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

// Simulated server state (for demo purposes)
const activeGames: Record<string, { hostId: string; guestId?: string }> = {}

class MultiplayerService {
  private socket: WebSocket | null = null
  private gameId: string | null = null
  private playerId: string | null = null
  private isHost = false
  private opponentConnected = false
  private pollInterval: NodeJS.Timeout | null = null

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
    this.isHost = true

    // Register the game in our simulated server
    activeGames[this.gameId] = { hostId: this.playerId! }

    this.connectToGame(this.gameId)
    return this.gameId
  }

  // Join an existing game with a friend code
  joinGame(gameId: string): void {
    this.disconnect()
    this.gameId = gameId.toUpperCase()
    this.isHost = false

    // Check if game exists in our simulated server
    if (!activeGames[this.gameId]) {
      if (this.callbacks.onError) {
        this.callbacks.onError("Game not found")
      }
      return
    }

    // Register as guest
    activeGames[this.gameId].guestId = this.playerId!

    this.connectToGame(this.gameId)
  }

  // Connect to a game
  private connectToGame(gameId: string) {
    if (this.callbacks.onConnectionStatusChange) {
      this.callbacks.onConnectionStatusChange("connecting")
    }

    // In a real implementation, this would connect to a WebSocket server
    // For this demo, we'll simulate the connection with a timeout
    setTimeout(() => {
      if (this.isHost) {
        // Host starts in waiting status
        if (this.callbacks.onConnectionStatusChange) {
          this.callbacks.onConnectionStatusChange("waiting")
        }

        // Start polling to check if a guest has joined
        this.startPolling()
      } else {
        // Guest connects immediately
        this.opponentConnected = true

        if (this.callbacks.onConnectionStatusChange) {
          this.callbacks.onConnectionStatusChange("connected")
        }

        // Notify the host that a guest has joined (in our simulated server)
        const game = activeGames[gameId]
        if (game && game.hostId) {
          // In a real implementation, the server would notify the host
          // For demo purposes, the host will discover this through polling
        }
      }
    }, 1000)
  }

  // Start polling to check for opponent connection
  private startPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval)
    }

    this.pollInterval = setInterval(() => {
      if (!this.gameId) return

      const game = activeGames[this.gameId]

      if (this.isHost && game && game.guestId && !this.opponentConnected) {
        // Guest has joined, update host status
        this.opponentConnected = true

        if (this.callbacks.onConnectionStatusChange) {
          this.callbacks.onConnectionStatusChange("connected")
        }
      }
    }, 1000) // Poll every second
  }

  // Simulate a guest joining (for demo purposes only)
  simulateGuestJoined() {
    if (!this.gameId || !this.isHost) return

    // Simulate a guest joining
    activeGames[this.gameId].guestId = "simulated-guest-" + nanoid(4)
    this.opponentConnected = true

    if (this.callbacks.onConnectionStatusChange) {
      this.callbacks.onConnectionStatusChange("connected")
    }
  }

  // Disconnect from the current game
  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    if (this.pollInterval) {
      clearInterval(this.pollInterval)
      this.pollInterval = null
    }

    // Clean up game from simulated server if host
    if (this.gameId && this.isHost && activeGames[this.gameId]) {
      delete activeGames[this.gameId]
    }

    this.gameId = null
    this.opponentConnected = false

    if (this.callbacks.onConnectionStatusChange) {
      this.callbacks.onConnectionStatusChange("disconnected")
    }
  }

  // Send a move to the opponent
  sendMove(boardIndex: number, squareIndex: number) {
    if (!this.opponentConnected) return

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
