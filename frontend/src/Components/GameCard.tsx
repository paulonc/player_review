import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

interface GameCardProps {
  id: string
  title: string
  image: string
  categoryName: string
  avgRating: number
  reviewCount: number
}

export default function GameCard({ id, title, image, categoryName, avgRating, reviewCount }: GameCardProps) {
  return (
    <Link to={`/games/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          <Badge className="absolute top-2 right-2">{categoryName}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span className="font-medium">{avgRating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground text-sm ml-2">({reviewCount} reviews)</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <span className="text-sm text-muted-foreground">View details</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
