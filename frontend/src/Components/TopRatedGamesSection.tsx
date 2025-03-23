import { Button } from "@/components/ui/button";
import SectionTitle from "./SectionTitle";
import FilterButtons from "./FilterButtons";
import GameList from "./GameList";
import CategoryFilter from "./CategoryFilter";

interface GameListItem {
  id: string;
  title: string;
  image: string;
  categoryId: string;
  avgRating: number;
  reviewCount: number;
  categoryName: string;
}

interface TopRatedGamesSectionProps {
  games: GameListItem[];
  isLoading: boolean;
  onViewAll: () => void;
}

export default function TopRatedGamesSection({ games, isLoading, onViewAll }: TopRatedGamesSectionProps) {
  return (
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
        <GameList games={games} />
      )}
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          className="border-primary/20 hover:bg-primary/10 transition-all duration-300" 
          onClick={onViewAll}
        >
          View All Games
        </Button>
      </div>
    </section>
  );
} 