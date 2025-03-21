import { useParams, useNavigate } from "react-router-dom"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import ReviewHeader from "@/components/review/ReviewHeader"
import GameCard from "@/components/review/GameCard"
import ReviewForm, { ReviewFormData } from "@/components/review/ReviewForm"
import { reviewService } from "@/services/reviewService"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

interface Game {
  id: string
  title: string
  image: string
  developer: string
  category: string
  description: string
}

export default function WriteReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const game: Game = {
    id: id || "",
    title: "Elden Ring",
    image: "https://gameforfun.com.br/wp-content/uploads/2020/05/Especial-Assassins-Creed-Valhalla.jpg",
    developer: "FromSoftware",
    category: "Action RPG",
    description: "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment."
  }

  const handleSubmit = async (data: ReviewFormData) => {
    try {
      if (!user?.id) {
        throw new Error("User not authenticated")
      }

      await reviewService.createReview({
        title: game.title,
        gameId: game.id,
        userId: user.id,
        rating: data.rating,
        review: data.review,
        hoursPlayed: data.hoursPlayed,
        recommended: data.recommended
      })

      toast.success("Review submitted successfully!")
      navigate(`/games/${game.id}`)
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error("Failed to submit review. Please try again.")
    }
  }

  const handleCancel = () => {
    navigate(`/games/${game.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />    
      <main className="container py-6 max-w-3xl">
        <ReviewHeader
          title="Write a Review"
          subtitle={`Share your thoughts about ${game.title} with the community`}
        />

        <div className="space-y-12 mt-10">
          <GameCard
            title={game.title}
            image={game.image}
            developer={game.developer}
            category={game.category}
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
