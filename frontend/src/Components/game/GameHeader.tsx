import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Share2 } from "lucide-react"
import ArrowBack from "../ArrowBack"

interface GameHeaderProps {
  title: string
  image: string
  category: string
  rating: number
  reviewCount: number
}

export default function GameHeader({ title, image, category, rating, reviewCount }: GameHeaderProps) {
  return (
    <>
      <ArrowBack />

      <div className="rounded-lg overflow-hidden mb-6 border shadow-xl shadow-primary/5">
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              <Badge
                key={category}
                variant="secondary"
                className="bg-primary/80 text-primary-foreground hover:bg-primary"
              >
                {category}
              </Badge>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
        {title}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
          <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 mr-1" />
          <span className="font-medium text-lg">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">({reviewCount} reviews)</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-primary/20 hover:bg-primary/10 transition-all duration-300"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </>
  )
} 