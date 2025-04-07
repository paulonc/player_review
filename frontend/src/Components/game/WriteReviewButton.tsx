import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface WriteReviewButtonProps {
  gameId: string
  gameTitle: string
}

export default function WriteReviewButton({ gameId, gameTitle }: WriteReviewButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/games/${gameId}/review`)
  }
  return (
    <div className="rounded-lg border p-6 mb-6 bg-muted/10 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 text-primary">Write a Review</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Share your experience with {gameTitle} and help other gamers make informed decisions.
      </p>
      <Button 
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg shadow-primary/20"
      >
        Write a Review
      </Button>
    </div>
  )
} 