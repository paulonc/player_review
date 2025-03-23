import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function GamesHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Games</h1>
      <Link to="/admin/games/new">
        <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Game
        </Button>
      </Link>
    </div>
  )
} 