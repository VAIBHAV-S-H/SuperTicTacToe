import { create } from "zustand"
import { calculateWinner, findBestMove } from "./game-utils"
import type { Board, GameMode, Player } from "./types"

interface GameState {
  gameMode: GameMode | null
  board: Board
  currentPlayer: Player
  nextBoardIndex: number | null
  miniWinners: Array<string | null>
  gameWinner: string | null
  moveHistory: Array<{ boardIndex: number; squareIndex: number; player: Player }>

  setGameMode: (mode: GameMode) => void
  makeMove: (boardIndex: number, squareIndex: number) => void
  resetGame: () => void
  aiMove: () => void
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

  setGameMode: (mode) => {
    set({ gameMode: mode })
  },

  makeMove: (boardIndex, squareIndex) => {
    const { board, currentPlayer, nextBoardIndex, miniWinners, gameWinner, moveHistory } = get()

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

    // Update state
    set({
      board: newBoard,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      nextBoardIndex: newNextBoardIndex,
      miniWinners: newMiniWinners,
      gameWinner: newGameWinner,
      moveHistory: newMoveHistory,
    })
  },

  resetGame: () => {
    set({
      board: createInitialBoard(),
      currentPlayer: "X",
      nextBoardIndex: null,
      miniWinners: Array(9).fill(null),
      gameWinner: null,
      moveHistory: [],
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
}))
