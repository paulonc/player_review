import { useParams, useNavigate } from "react-router-dom"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import ReviewHeader from "@/components/review/ReviewHeader"
import GameCard from "@/components/review/GameCard"
import ReviewForm, { ReviewFormData } from "@/components/review/ReviewForm"
import { reviewService } from "@/services/reviewService"
import { gameService } from "@/services/gameService"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { Game } from "@/types/api"

interface GameDetails {
  game: Game;
  avgRating: number;
  reviewCount: number;
  companyName: string;
  categoryName: string;
}

export default function WriteReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await gameService.getGameDetails(id);
        setGameDetails(response.data);
      } catch (err) {
        setError('Failed to load game details');
        console.error('Error fetching game details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-6 max-w-3xl">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !gameDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-6 max-w-3xl">
          <div className="flex items-center justify-center">
            <div className="text-destructive">{error || 'Game not found'}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (data: ReviewFormData) => {
    try {
      if (!user?.id) {
        throw new Error("User not authenticated")
      }

      await reviewService.createReview({
        title: gameDetails.game.title,
        gameId: gameDetails.game.id,
        userId: user.id,
        rating: data.rating,
        review: data.review,
        hoursPlayed: data.hoursPlayed,
        recommended: data.recommended
      })

      toast.success("Review submitted successfully!")
      navigate(`/games/${gameDetails.game.id}`)
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error("Failed to submit review. Please try again.")
    }
  }

  const handleCancel = () => {
    navigate(`/games/${gameDetails.game.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />    
      <main className="container py-6 max-w-3xl">
        <ReviewHeader
          title="Write a Review"
          subtitle={`Share your thoughts about ${gameDetails.game.title} with the community`}
        />

        <div className="space-y-12 mt-10">
          <GameCard
            title={gameDetails.game.title}
            image={gameDetails.game.imageUrl}
            developer={gameDetails.companyName}
            category={gameDetails.categoryName}
          />

          <div className="mt-12">
            <ReviewForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
