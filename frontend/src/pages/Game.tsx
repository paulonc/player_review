import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GameHeader from "@/components/game/GameHeader"
import GameInfo from "@/components/game/GameInfo"
import GameReviews from "@/components/game/GameReviews"
import SimilarGames from "@/components/game/SimilarGames"
import WriteReviewButton from "@/components/game/WriteReviewButton"
import { useEffect, useState } from "react"
import { gameService } from "@/services/gameService"
import { Game, Review } from "@/types/api"

interface GameDetails {
  game: Game;
  avgRating: number;
  reviewCount: number;
  companyName: string;
  categoryName: string;
}

interface SimilarGame {
  id: string;
  title: string;
  imageUrl: string;
  avgRating: number;
  reviewCount: number;
}

interface TransformedReview {
  username: string;
  avatar: string;
  date: string;
  rating: number;
  content: string;
}

export default function GamePage() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarGames, setSimilarGames] = useState<SimilarGame[]>([]);
  const [reviews, setReviews] = useState<TransformedReview[]>([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await gameService.getGameDetails(id);
        setGameDetails(response.data);
        const similarGamesResponse = await gameService.getTopRatedGamesByCategory(id);
        setSimilarGames(similarGamesResponse.data);
        
        const transformedReviews = response.data.game.reviews?.map((review: Review) => ({
          username: "User",
          avatar: "/placeholder.svg?height=40&width=40",
          date: new Date(review.createdAt).toLocaleDateString(),
          rating: review.rating,
          content: review.review || ""
        })) || [];
        
        setReviews(transformedReviews);
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
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <Navbar />
        <main className="container py-6">
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
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <Navbar />
        <main className="container py-6">
          <div className="flex items-center justify-center">
            <div className="text-destructive">{error || 'Game not found'}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <main className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GameHeader
              title={gameDetails.game.title}
              image={gameDetails.game.imageUrl || "/placeholder.svg"}
              category={gameDetails.categoryName}
              rating={gameDetails.avgRating}
              reviewCount={gameDetails.reviewCount}
            />

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="bg-muted/50 border border-muted">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-6">
                <GameInfo
                  description={gameDetails.game.description || ""}
                  releaseDate={new Date(gameDetails.game.releaseDate).toLocaleDateString()}
                  category={gameDetails.categoryName}
                  company={gameDetails.companyName}
                />
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <GameReviews reviews={reviews}/>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:col-span-1 mt-12">
            <div className="sticky top-24">
              {gameDetails.game.id && <WriteReviewButton gameId={gameDetails.game.id} gameTitle={gameDetails.game.title} />}
              <SimilarGames games={similarGames} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

