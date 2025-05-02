import GameBoard from "@/components/game-board"
import Header from "@/components/header"

export default function GamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative z-10">
      <Header />
      <GameBoard />
    </main>
  )
}
