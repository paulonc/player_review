import { useNavigate } from "react-router-dom";
import GameCard from "@/components/GameCard";

interface GameListProps {
    games: {
        id: string;
        title: string;
        image: string;
        categoryName: string;
        avgRating: number;
        reviewCount: number;
    }[];
}

const GameList = ({ games }: GameListProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <div 
          key={game.id}
          onClick={() => navigate(`/games/${game.id}`)}
          className="cursor-pointer"
        >
          <GameCard
            id={game.id}
            title={game.title}
            image={game.image}
            categoryName={game.categoryName}
            avgRating={game.avgRating}
            reviewCount={game.reviewCount}
          />
        </div>
      ))}
    </div>
  );
};

export default GameList;
