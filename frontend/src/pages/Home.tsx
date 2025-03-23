import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { gameService } from "@/services/gameService";
import { useNavigate } from "react-router-dom";
import PublisherSection from "@/components/PublisherSection";
import TopRatedGamesSection from "@/components/TopRatedGamesSection";
import { Game, TopRatedGame } from "@/types/api";

interface GameListItem {
  id: string;
  title: string;
  image: string;
  categoryId: string;
  avgRating: number;
  reviewCount: number;
  categoryName: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [topRatedGames, setTopRatedGames] = useState<GameListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const transformGameData = (data: Game | TopRatedGame): GameListItem => {
    const isTopRated = "game" in data;
    const gameData = isTopRated ? data.game : data;
  
    return {
      id: gameData.id,
      title: gameData.title,
      image: gameData.imageUrl,
      categoryId: gameData.categoryId,
      categoryName: isTopRated ? data.categoryName : "Unknown",
      avgRating: isTopRated ? data.avgRating : 0,
      reviewCount: isTopRated ? data.reviewCount : 0,
    };
  };
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const [topRatedResponse] = await Promise.all([
          gameService.getTopRatedGames(4),
        ]);

        const topRated = topRatedResponse.data;
        setTopRatedGames(topRated.map(transformGameData));

      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <main className="container py-6 md:py-12">
        <HeroSection />
        <TopRatedGamesSection 
          games={topRatedGames}
          isLoading={isLoading}
          onViewAll={() => navigate('/games')}
        />
        <PublisherSection />
      </main>
      <Footer />
    </div>
  );
}