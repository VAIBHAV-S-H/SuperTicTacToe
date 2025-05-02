import type { Board, Player } from "./types"

// Calculate winner of a mini-board or the overall game
export function calculateWinner(squares: Array<string | null>): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  // Check for draw (all squares filled)
  if (squares.every((square) => square !== null)) {
    return "draw"
  }

  return null
}

// Minimax algorithm for AI
export function findBestMove(
  board: Board,
  nextBoardIndex: number | null,
  miniWinners: Array<string | null>,
): { boardIndex: number; squareIndex: number } | null {
  // Determine which boards are valid to play in
  const validBoards: number[] = []

  if (nextBoardIndex !== null) {
    // If there's a specific board to play in and it's not won/full
    if (!miniWinners[nextBoardIndex] && board[nextBoardIndex].some((square) => square === null)) {
      validBoards.push(nextBoardIndex)
    } else {
      // If the specified board is won/full, all non-won/non-full boards are valid
      for (let i = 0; i < 9; i++) {
        if (!miniWinners[i] && board[i].some((square) => square === null)) {
          validBoards.push(i)
        }
      }
    }
  } else {
    // If free choice, all non-won/non-full boards are valid
    for (let i = 0; i < 9; i++) {
      if (!miniWinners[i] && board[i].some((square) => square === null)) {
        validBoards.push(i)
      }
    }
  }

  if (validBoards.length === 0) return null

  // Find all possible moves
  const possibleMoves: Array<{ boardIndex: number; squareIndex: number; score: number }> = []

  for (const boardIndex of validBoards) {
    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      if (board[boardIndex][squareIndex] === null) {
        // Try this move
        const newBoard = [...board]
        newBoard[boardIndex] = [...board[boardIndex]]
        newBoard[boardIndex][squareIndex] = "O" // AI is O

        // Calculate score for this move
        const score = evaluateMove(
          newBoard,
          boardIndex,
          squareIndex,
          miniWinners,
          "O",
          3, // Depth limit for minimax
        )

        possibleMoves.push({ boardIndex, squareIndex, score })
      }
    }
  }

  // Find the move with the highest score
  if (possibleMoves.length === 0) return null

  possibleMoves.sort((a, b) => b.score - a.score)

  // Add some randomness to make the AI less predictable
  // Pick from the top 3 moves (or fewer if there aren't 3)
  const topMoves = possibleMoves.slice(0, Math.min(3, possibleMoves.length))
  const selectedMove = topMoves[Math.floor(Math.random() * topMoves.length)]

  return { boardIndex: selectedMove.boardIndex, squareIndex: selectedMove.squareIndex }
}

// Evaluate a move for the minimax algorithm
function evaluateMove(
  board: Board,
  lastBoardIndex: number,
  lastSquareIndex: number,
  miniWinners: Array<string | null>,
  player: Player,
  depth: number,
): number {
  // Create a copy of miniWinners
  const newMiniWinners = [...miniWinners]

  // Check if the last move won a mini-board
  if (!miniWinners[lastBoardIndex]) {
    const winner = calculateWinner(board[lastBoardIndex])
    if (winner) {
      newMiniWinners[lastBoardIndex] = winner

      // Check if the game is won
      const gameWinner = calculateWinner(newMiniWinners)
      if (gameWinner) {
        return gameWinner === "O" ? 1000 : gameWinner === "X" ? -1000 : 0
      }
    }
  }

  // If we've reached the depth limit, evaluate the current board state
  if (depth === 0) {
    return evaluateBoard(board, newMiniWinners)
  }

  // Determine the next board to play in
  let nextBoardIndex = lastSquareIndex

  // If the next board is already won or full, allow free choice
  if (newMiniWinners[nextBoardIndex] || board[nextBoardIndex].every((square) => square !== null)) {
    nextBoardIndex = -1 // -1 means any board
  }

  // Determine valid boards
  const validBoards: number[] = []
  if (nextBoardIndex === -1) {
    // Free choice
    for (let i = 0; i < 9; i++) {
      if (!newMiniWinners[i] && board[i].some((square) => square === null)) {
        validBoards.push(i)
      }
    }
  } else if (!newMiniWinners[nextBoardIndex] && board[nextBoardIndex].some((square) => square === null)) {
    validBoards.push(nextBoardIndex)
  }

  if (validBoards.length === 0) {
    // No valid moves, evaluate the current board state
    return evaluateBoard(board, newMiniWinners)
  }

  const nextPlayer = player === "X" ? "O" : "X"
  let bestScore = player === "O" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

  // Try each valid move
  for (const boardIndex of validBoards) {
    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      if (board[boardIndex][squareIndex] === null) {
        // Make the move
        const newBoard = [...board]
        newBoard[boardIndex] = [...board[boardIndex]]
        newBoard[boardIndex][squareIndex] = player

        // Recursively evaluate
        const score = evaluateMove(newBoard, boardIndex, squareIndex, newMiniWinners, nextPlayer, depth - 1)

        // Update best score
        if (player === "O") {
          bestScore = Math.max(bestScore, score)
        } else {
          bestScore = Math.min(bestScore, score)
        }
      }
    }
  }

  return bestScore
}

// Evaluate the current board state
function evaluateBoard(board: Board, miniWinners: Array<string | null>): number {
  let score = 0

  // Evaluate each mini-board
  for (let i = 0; i < 9; i++) {
    if (miniWinners[i] === "O") {
      score += 10
    } else if (miniWinners[i] === "X") {
      score -= 10
    } else {
      // Evaluate potential wins in this mini-board
      score += evaluateMiniBoard(board[i], "O") - evaluateMiniBoard(board[i], "X")
    }
  }

  // Evaluate potential overall wins
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    let oCount = 0
    let xCount = 0

    if (miniWinners[a] === "O") oCount++
    if (miniWinners[b] === "O") oCount++
    if (miniWinners[c] === "O") oCount++

    if (miniWinners[a] === "X") xCount++
    if (miniWinners[b] === "X") xCount++
    if (miniWinners[c] === "X") xCount++

    // Two in a row with the third available is valuable
    if (oCount === 2 && xCount === 0) score += 50
    if (xCount === 2 && oCount === 0) score -= 50

    // One in a row with the others available is somewhat valuable
    if (oCount === 1 && xCount === 0) score += 5
    if (xCount === 1 && oCount === 0) score -= 5
  }

  return score
}

// Evaluate a mini-board for a specific player
function evaluateMiniBoard(squares: Array<string | null>, player: Player): number {
  const opponent = player === "X" ? "O" : "X"
  let score = 0

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    let playerCount = 0
    let opponentCount = 0

    if (squares[a] === player) playerCount++
    if (squares[b] === player) playerCount++
    if (squares[c] === player) playerCount++

    if (squares[a] === opponent) opponentCount++
    if (squares[b] === opponent) opponentCount++
    if (squares[c] === opponent) opponentCount++

    // Two in a row with the third available is valuable
    if (playerCount === 2 && opponentCount === 0) score += 3

    // One in a row with the others available is somewhat valuable
    if (playerCount === 1 && opponentCount === 0) score += 1
  }

  return score
}
