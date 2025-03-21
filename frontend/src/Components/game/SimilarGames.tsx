import { Star } from "lucide-react"

interface SimilarGame {
  id: string
  title: string
  image: string
  rating: number
}

interface SimilarGamesProps {
  games: SimilarGame[]
}

export default function SimilarGames({ games }: SimilarGamesProps) {
  return (
    <div className="rounded-lg border p-6 bg-muted/10 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 text-primary">Similar Games</h2>
      <div className="space-y-4">
        {games.map((game) => (
          <div key={game.id} className="flex gap-3 group">
            <img
              src={game.image}
              alt={game.title}
              className="w-16 h-16 rounded object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h3 className="font-medium group-hover:text-primary transition-colors">{game.title}</h3>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                <span className="text-sm">{game.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 