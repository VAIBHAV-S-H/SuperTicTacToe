import GameBoard from "@/components/game-board"
import MobileGameBoard from "@/components/mobile/game-board"
import Header from "@/components/header"
import ResponsiveLayout from "@/components/responsive-layout"

export default function GamePage() {
  return (
    <ResponsiveLayout
      mobileContent={
        <main className="flex min-h-screen flex-col items-center justify-center p-0 relative z-10">
          <MobileGameBoard />
        </main>
      }
    >
      <main className="flex min-h-screen flex-col items-center justify-center p-4 relative z-10">
        <Header />
        <GameBoard />
      </main>
    </ResponsiveLayout>
  )
}
