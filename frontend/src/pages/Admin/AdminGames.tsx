import { useState, useEffect } from "react"
import AdminLayout from "@/components/layouts/AdminLayout"
import { GamesHeader } from "@/components/admin/games/GamesHeader"
import { GamesSearch } from "@/components/admin/games/GamesSearch"
import { GamesTable } from "@/components/admin/games/GamesTable"
import { gameService } from "@/services/gameService"
import { Game } from "@/types/api"

export default function GamesAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const [games, setGames] = useState<Game[]>([])
  const [, setLoading] = useState(false)

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        const response = await gameService.getGames({ search: searchQuery }) 
        setGames(response)
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [searchQuery])

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <GamesHeader />
        <div className="flex items-center justify-between">
          <GamesSearch onSearch={setSearchQuery} />
        </div>
        <GamesTable games={filteredGames} />
      </div>
    </AdminLayout>
  )
}
