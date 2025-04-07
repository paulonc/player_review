import { Star } from "lucide-react"
import { Link, useParams } from "react-router-dom"

interface SimilarGame {
  id: string
  title: string
  imageUrl: string
  avgRating: number
  reviewCount: number
}

interface SimilarGamesProps {
  games: SimilarGame[]
}

export default function SimilarGames({ games }: SimilarGamesProps) {
  const { id: currentGameId } = useParams<{ id: string }>()

  const filteredGames = games.filter(game => game.id !== currentGameId)

  if (filteredGames.length === 0) {
    return null
  }

  return (
    <div className="rounded-lg border p-6 bg-muted/10 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 text-primary">Similar Games</h2>
      <div className="space-y-4">
        {filteredGames.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="flex gap-3 group hover:shadow hover:shadow-primary/10 rounded-lg p-2 transition-shadow duration-200"
          >
            <img
              src={game.imageUrl}
              alt={game.title}
              className="w-16 h-16 rounded object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {game.title}
              </h3>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                <span className="text-sm">{game.avgRating.toFixed(1)}</span>
                <span className="text-sm ml-2">({game.reviewCount} reviews)</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
