import { Button } from "@/components/ui/button"
import ReviewCard from "@/components/ReviewCard"

interface Review {
  username: string
  avatar: string
  date: string
  rating: number
  content: string
}

interface GameReviewsProps {
  reviews: Review[]
}

export default function GameReviews({ reviews }: GameReviewsProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="h-5 w-1 bg-primary rounded-full"></span>
          User Reviews
        </h2>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            username={review.username}
            avatar={review.avatar}
            date={review.date}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
        >
          Load More Reviews
        </Button>
      </div>
    </div>
  )
} 