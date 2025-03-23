import { useState } from "react"
import AdminLayout from "@/components/layouts/AdminLayout"
import { GamesHeader } from "@/components/admin/games/GamesHeader"
import { GamesSearch } from "@/components/admin/games/GamesSearch"
import { GamesTable } from "@/components/admin/games/GamesTable"

export default function GamesAdmin() {
  const [searchQuery, setSearchQuery] = useState("")

  const games = [
    {
      id: "1",
      title: "Elden Ring",
      developer: "FromSoftware",
      category: "RPG",
      rating: 4.8,
    },
    {
      id: "2",
      title: "God of War: Ragnarök",
      developer: "Santa Monica Studio",
      category: "Action",
      rating: 4.9,
    },
    {
      id: "3",
      title: "Cyberpunk 2077",
      developer: "CD Projekt Red",
      category: "RPG",
      rating: 4.2,
    },
    {
      id: "4",
      title: "Horizon Forbidden West",
      developer: "Guerrilla Games",
      category: "Action RPG",
      rating: 4.7,
    },
    {
      id: "5",
      title: "Starfield",
      developer: "Bethesda Game Studios",
      category: "Sci-Fi",
      rating: 4.5,
    },
    {
      id: "6",
      title: "Upcoming Game",
      developer: "Secret Studio",
      category: "Adventure",
      rating: 0,
    },
  ]

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
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
