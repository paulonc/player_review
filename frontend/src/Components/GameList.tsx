import GameCard from "@/components/GameCard";

interface GameListProps {
    games: {
        id: string;
        title: string;
        image: string;
        category: string;
        rating: number;
        reviewCount: number;
    }[];
}

const GameList = ({ games }: GameListProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {games.map((game) => (
      <GameCard
        key={game.id}
        id={game.id}
        title={game.title}
        image={game.image}
        category={game.category}
        rating={game.rating}
        reviewCount={game.reviewCount}
      />
    ))}
  </div>
);

export default GameList;
