import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { gameService } from "@/services/gameService";
import { companyService } from "@/services/companyService";
import { useNavigate } from "react-router-dom";
import PublisherSection from "@/components/PublisherSection";
import TopRatedGamesSection from "@/components/TopRatedGamesSection";
import { Game, TopRatedGame, Company } from "@/types/api";

interface GameListItem {
  id: string;
  title: string;
  image: string;
  categoryId: string;
  avgRating: number;
  reviewCount: number;
  categoryName: string;
}

interface PublisherWithGameCount extends Company {
  gameCount: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [topRatedGames, setTopRatedGames] = useState<GameListItem[]>([]);
  const [publishers, setPublishers] = useState<PublisherWithGameCount[]>([]);
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
    const fetchData = async () => {
      try {
        const [topRatedResponse, publishersResponse] = await Promise.all([
          gameService.getTopRatedGames(4),
          companyService.getCompanies(1, 4)
        ]);

        const topRated = topRatedResponse.data;
        setTopRatedGames(topRated.map(transformGameData));
        
        // Fetch game counts for each publisher
        const publishersWithGameCounts = await Promise.all(
          publishersResponse.data.map(async (publisher) => {
            try {
              const gamesResponse = await gameService.getGames({
                page: 1,
                limit: 1,
                companyId: publisher.id
              });
              
              return {
                ...publisher,
                gameCount: gamesResponse.total
              };
            } catch (error) {
              console.error(`Error fetching games for publisher ${publisher.id}:`, error);
              return {
                ...publisher,
                gameCount: 0
              };
            }
          })
        );
        
        setPublishers(publishersWithGameCounts);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
        <PublisherSection
          publishers={publishers}
          isLoading={isLoading}
          onViewAll={() => navigate('/publishers')}
        />
      </main>
      <Footer />
    </div>
  );
}