import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import FilterButtons from "@/components/FilterButtons";
import GameList from "@/components/GameList";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CategoryFilter from "@/components/CategoryFilter";


export default function Home() {
  const topRatedGames = [
    { id: "1", title: "Elden Ring", image: "/placeholder.svg?height=300&width=400", category: "RPG", rating: 4.8, reviewCount: 1243 },
    { id: "2", title: "God of War: Ragnarök", image: "/placeholder.svg?height=300&width=400", category: "Action Adventure", rating: 4.9, reviewCount: 982 },
    { id: "3", title: "Cyberpunk 2077", image: "/placeholder.svg?height=300&width=400", category: "RPG", rating: 4.2, reviewCount: 1876 },
    { id: "4", title: "Horizon Forbidden West", image: "/placeholder.svg?height=300&width=400", category: "Action RPG", rating: 4.7, reviewCount: 754 }
  ];

  const recentlyReviewedGames = [
    { id: "5", title: "Starfield", image: "/placeholder.svg?height=300&width=400", category: "Sci-Fi RPG", rating: 4.5, reviewCount: 632 },
    { id: "6", title: "Baldur's Gate 3", image: "/placeholder.svg?height=300&width=400", category: "RPG", rating: 4.9, reviewCount: 1432 },
    { id: "7", title: "Final Fantasy XVI", image: "/placeholder.svg?height=300&width=400", category: "JRPG", rating: 4.6, reviewCount: 892 },
    { id: "8", title: "Resident Evil 4 Remake", image: "/placeholder.svg?height=300&width=400", category: "Horror", rating: 4.8, reviewCount: 743 }
  ];

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
          <GameList games={topRatedGames} />
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10 transition-all duration-300">
              View All Top Rated Games
            </Button>
          </div>
        </section>

        <section className="py-12">
          <SectionTitle title="Recently Reviewed" colorClass="bg-purple-500" />
          <GameList games={recentlyReviewedGames} />
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10 transition-all duration-300">
              View All Recent Reviews
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};