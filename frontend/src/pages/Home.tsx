import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import FilterButtons from "@/components/FilterButtons";
import GameList from "@/components/GameList";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CategoryFilter from "@/components/CategoryFilter";
import { useEffect, useState } from "react";
import { gameService } from "@/services/gameService";
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
  const [topRatedGames, setTopRatedGames] = useState<GameListItem[]>([]);
  const [recentGames, setRecentGames] = useState<GameListItem[]>([]);
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
        const [topRatedResponse, newReleasesResponse] = await Promise.all([
          gameService.getTopRatedGames(4),
          gameService.getNewReleases(4)
        ]);

        const topRated = topRatedResponse.data;
        const newReleases = newReleasesResponse.data;

        setTopRatedGames(topRated.map(transformGameData));
        setRecentGames(newReleases.map(transformGameData));

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
        <section className="py-12">
          <SectionTitle title="Top Rated Games" colorClass="bg-primary" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 justify-end w-full">
              <CategoryFilter />
              <FilterButtons />
            </div>
          </div>  
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <GameList games={topRatedGames} />
          )}
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10 transition-all duration-300">
              View All Top Rated Games
            </Button>
          </div>
        </section>

        <section className="py-12">
          <SectionTitle title="Recently Released" colorClass="bg-purple-500" />
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <GameList games={recentGames} />
          )}
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10 transition-all duration-300">
              View All Recent Games
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};