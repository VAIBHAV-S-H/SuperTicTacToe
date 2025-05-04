import { create } from "zustand"
import { calculateWinner, findBestMove } from "./game-utils"
import type { Board, GameMode, Player } from "./types"
import { multiplayerService } from "./multiplayer-service"

interface GameState {
  gameMode: GameMode | null
  board: Board
  currentPlayer: Player
  nextBoardIndex: number | null
  miniWinners: Array<string | null>
  gameWinner: string | null
  moveHistory: Array<{ boardIndex: number; squareIndex: number; player: Player }>
  isMyTurn: boolean
  friendCode: string | null
  isHost: boolean
  playerSymbol: Player | null

  setGameMode: (mode: GameMode) => void
  makeMove: (boardIndex: number, squareIndex: number) => void
  resetGame: () => void
  aiMove: () => void
  createMultiplayerGame: () => string
  joinMultiplayerGame: (code: string) => void
  leaveMultiplayerGame: () => void
  handleOpponentMove: (boardIndex: number, squareIndex: number) => void
}

// Initialize a 3x3 grid of 3x3 mini boards
const createInitialBoard = (): Board => {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))
}

export const useGameStore = create<GameState>((set, get) => ({
  gameMode: null,
  board: createInitialBoard(),
  currentPlayer: "X",
  nextBoardIndex: null,
  miniWinners: Array(9).fill(null),
  gameWinner: null,
  moveHistory: [],
  isMyTurn: true,
  friendCode: null,
  isHost: false,
  playerSymbol: null,

  setGameMode: (mode) => {
    set({ gameMode: mode })
  },

  makeMove: (boardIndex, squareIndex) => {
    const {
      board,
      currentPlayer,
      nextBoardIndex,
      miniWinners,
      gameWinner,
      moveHistory,
      gameMode,
      isMyTurn,
      playerSymbol,
    } = get()

    // In multiplayer mode, only allow moves when it's the player's turn
    if (gameMode === "multiplayer") {
      if (!isMyTurn) return

      // In multiplayer, validate that the current player matches the player's symbol
      if (playerSymbol !== currentPlayer) return
    }

    // Don't allow moves if game is over or the board is not active
    if (gameWinner || (nextBoardIndex !== null && nextBoardIndex !== boardIndex)) {
      return
    }

    // Don't allow moves on already played squares or won mini-boards
    if (board[boardIndex][squareIndex] || miniWinners[boardIndex]) {
      return
    }

    // Create a new board with the move
    const newBoard = [...board]
    newBoard[boardIndex] = [...board[boardIndex]]
    newBoard[boardIndex][squareIndex] = currentPlayer

    // Check if this move won the mini-board
    const newMiniWinners = [...miniWinners]
    if (!miniWinners[boardIndex]) {
      const winner = calculateWinner(newBoard[boardIndex])
      if (winner) {
        newMiniWinners[boardIndex] = winner
      }
    }

    // Determine the next board to play in
    let newNextBoardIndex = squareIndex

    // If the next board is already won or full, allow free choice
    if (newMiniWinners[newNextBoardIndex] || board[newNextBoardIndex].every((square) => square !== null)) {
      newNextBoardIndex = null
    }

    // Check if the game is won
    let newGameWinner = null
    if (newMiniWinners.filter(Boolean).length >= 5) {
      newGameWinner = calculateWinner(newMiniWinners)
    }

    // Update move history
    const newMoveHistory = [...moveHistory, { boardIndex, squareIndex, player: currentPlayer }]

    // If in multiplayer mode, send the move to the opponent
    if (gameMode === "multiplayer") {
      multiplayerService.sendMove(boardIndex, squareIndex)

      // Toggle turn in multiplayer mode
      set({
        board: newBoard,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
        nextBoardIndex: newNextBoardIndex,
        miniWinners: newMiniWinners,
        gameWinner: newGameWinner,
        moveHistory: newMoveHistory,
        isMyTurn: false, // It's now the opponent's turn
      })
    } else {
      // Update state for local or AI mode
      set({
        board: newBoard,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
        nextBoardIndex: newNextBoardIndex,
        miniWinners: newMiniWinners,
        gameWinner: newGameWinner,
        moveHistory: newMoveHistory,
      })
    }
  },

  handleOpponentMove: (boardIndex, squareIndex) => {
    const { board, currentPlayer, nextBoardIndex, miniWinners, gameWinner, moveHistory } = get()

    // Don't process opponent moves if the game is over
    if (gameWinner) {
      return
    }

    // Create a new board with the opponent's move
    const newBoard = [...board]
    newBoard[boardIndex] = [...board[boardIndex]]
    newBoard[boardIndex][squareIndex] = currentPlayer

    // Check if this move won the mini-board
    const newMiniWinners = [...miniWinners]
    if (!miniWinners[boardIndex]) {
      const winner = calculateWinner(newBoard[boardIndex])
      if (winner) {
        newMiniWinners[boardIndex] = winner
      }
    }

    // Determine the next board to play in
    let newNextBoardIndex = squareIndex

    // If the next board is already won or full, allow free choice
    if (newMiniWinners[newNextBoardIndex] || board[newNextBoardIndex].every((square) => square !== null)) {
      newNextBoardIndex = null
    }

    // Check if the game is won
    let newGameWinner = null
    if (newMiniWinners.filter(Boolean).length >= 5) {
      newGameWinner = calculateWinner(newMiniWinners)
    }

    // Update move history
    const newMoveHistory = [...moveHistory, { boardIndex, squareIndex, player: currentPlayer }]

    // Update state and set isMyTurn to true since it's now the player's turn
    set({
      board: newBoard,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      nextBoardIndex: newNextBoardIndex,
      miniWinners: newMiniWinners,
      gameWinner: newGameWinner,
      moveHistory: newMoveHistory,
      isMyTurn: true, // It's now the player's turn
    })
  },

  resetGame: () => {
    const { gameMode, isHost } = get()

    // Determine player's turn based on role in multiplayer
    const isMyTurn = gameMode !== "multiplayer" || isHost

    // In multiplayer, host is X, guest is O
    const playerSymbol = gameMode === "multiplayer" ? (isHost ? "X" : "O") : null

    set({
      board: createInitialBoard(),
      currentPlayer: "X", // X always goes first
      nextBoardIndex: null,
      miniWinners: Array(9).fill(null),
      gameWinner: null,
      moveHistory: [],
      isMyTurn,
      playerSymbol,
    })
  },

  aiMove: () => {
    const { board, nextBoardIndex, miniWinners } = get()

    // Find the best move using minimax
    const move = findBestMove(board, nextBoardIndex, miniWinners)

    if (move) {
      get().makeMove(move.boardIndex, move.squareIndex)
    }
  },

  createMultiplayerGame: () => {
    const friendCode = multiplayerService.createGame()

    // Register callback for opponent moves
    multiplayerService.registerCallbacks({
      onOpponentMove: (boardIndex, squareIndex) => {
        get().handleOpponentMove(boardIndex, squareIndex)
      },
    })

    set({
      friendCode,
      isHost: true,
      isMyTurn: true, // Host plays as X and goes first
      playerSymbol: "X", // Host is always X
      gameMode: "multiplayer",
      board: createInitialBoard(),
      currentPlayer: "X",
      nextBoardIndex: null,
      miniWinners: Array(9).fill(null),
      gameWinner: null,
      moveHistory: [],
    })
    return friendCode
  },

  joinMultiplayerGame: (code) => {
    multiplayerService.joinGame(code)

    // Register callback for opponent moves
    multiplayerService.registerCallbacks({
      onOpponentMove: (boardIndex, squareIndex) => {
        get().handleOpponentMove(boardIndex, squareIndex)
      },
    })

    set({
      friendCode: code,
      isHost: false,
      isMyTurn: false, // Guest plays as O and goes second
      playerSymbol: "O", // Guest is always O
      gameMode: "multiplayer",
      board: createInitialBoard(),
      currentPlayer: "X", // X always goes first
      nextBoardIndex: null,
      miniWinners: Array(9).fill(null),
      gameWinner: null,
      moveHistory: [],
    })
  },

  leaveMultiplayerGame: () => {
    multiplayerService.disconnect()
    set({
      friendCode: null,
      isHost: false,
      playerSymbol: null,
      gameMode: null,
    })
  },
}))
