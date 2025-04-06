import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import GameCard from "@/components/GameCard"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { gameService } from "@/services/gameService"
import type { Game } from "@/types/api"

const allGames = [
  {
    id: "1",
    title: "Elden Ring",
    image: "/placeholder.svg?height=300&width=400",
    category: "RPG",
    rating: 4.8,
    reviewCount: 1243,
  },
  {
    id: "2",
    title: "God of War: Ragnarök",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action Adventure",
    rating: 4.9,
    reviewCount: 982,
  },
  {
    id: "3",
    title: "Cyberpunk 2077",
    image: "/placeholder.svg?height=300&width=400",
    category: "RPG",
    rating: 4.2,
    reviewCount: 1876,
  },
  {
    id: "4",
    title: "Horizon Forbidden West",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action RPG",
    rating: 4.7,
    reviewCount: 754,
  },
  {
    id: "5",
    title: "Starfield",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sci-Fi RPG",
    rating: 4.5,
    reviewCount: 632,
  },
  {
    id: "6",
    title: "Baldur's Gate 3",
    image: "/placeholder.svg?height=300&width=400",
    category: "RPG",
    rating: 4.9,
    reviewCount: 1432,
  },
  {
    id: "7",
    title: "Final Fantasy XVI",
    image: "/placeholder.svg?height=300&width=400",
    category: "JRPG",
    rating: 4.6,
    reviewCount: 892,
  },
  {
    id: "8",
    title: "Resident Evil 4 Remake",
    image: "/placeholder.svg?height=300&width=400",
    category: "Horror",
    rating: 4.8,
    reviewCount: 743,
  },
  {
    id: "9",
    title: "The Legend of Zelda: Tears of the Kingdom",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action Adventure",
    rating: 4.9,
    reviewCount: 1567,
  },
  {
    id: "10",
    title: "Diablo IV",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action RPG",
    rating: 4.3,
    reviewCount: 1123,
  },
  {
    id: "11",
    title: "Hogwarts Legacy",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action RPG",
    rating: 4.6,
    reviewCount: 987,
  },
  {
    id: "12",
    title: "Star Wars Jedi: Survivor",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action Adventure",
    rating: 4.5,
    reviewCount: 876,
  },
  {
    id: "13",
    title: "Street Fighter 6",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fighting",
    rating: 4.7,
    reviewCount: 654,
  },
  {
    id: "14",
    title: "Assassin's Creed Mirage",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action Adventure",
    rating: 4.4,
    reviewCount: 789,
  },
  {
    id: "15",
    title: "Alan Wake 2",
    image: "/placeholder.svg?height=300&width=400",
    category: "Horror",
    rating: 4.8,
    reviewCount: 543,
  },
  {
    id: "16",
    title: "Spider-Man 2",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action Adventure",
    rating: 4.9,
    reviewCount: 1234,
  },
  {
    id: "17",
    title: "Mortal Kombat 1",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fighting",
    rating: 4.6,
    reviewCount: 876,
  },
  {
    id: "18",
    title: "Forza Horizon 5",
    image: "/placeholder.svg?height=300&width=400",
    category: "Racing",
    rating: 4.8,
    reviewCount: 1023,
  },
  {
    id: "19",
    title: "The Last of Us Part I",
    image: "/placeholder.svg?height=300&width=400",
    category: "Action Adventure",
    rating: 4.9,
    reviewCount: 1432,
  },
  {
    id: "20",
    title: "Hades II",
    image: "/placeholder.svg?height=300&width=400",
    category: "Roguelike",
    rating: 4.7,
    reviewCount: 876,
  },
  {
    id: "21",
    title: "Persona 5 Royal",
    image: "/placeholder.svg?height=300&width=400",
    category: "JRPG",
    rating: 4.9,
    reviewCount: 1345,
  },
  {
    id: "22",
    title: "Hollow Knight: Silksong",
    image: "/placeholder.svg?height=300&width=400",
    category: "Metroidvania",
    rating: 4.8,
    reviewCount: 987,
  },
  {
    id: "23",
    title: "Stardew Valley",
    image: "/placeholder.svg?height=300&width=400",
    category: "Simulation",
    rating: 4.8,
    reviewCount: 2134,
  },
  {
    id: "24",
    title: "Minecraft",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sandbox",
    rating: 4.7,
    reviewCount: 3456,
  },
]

// Extrair categorias únicas dos jogos
const allCategories = Array.from(new Set(allGames.map((game) => game.category)))

type SearchBarProps = {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch }) => (
  <div className="relative w-full md:w-[300px]">
    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search games by name..."
      className="pl-8 rounded-full bg-muted/50 border-muted focus-visible:ring-primary"
      value={searchQuery}
      onChange={handleSearch}
    />
  </div>
);

type CategoryFilterProps = {
  allCategories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearFilters: () => void;
  searchQuery: string;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ allCategories, selectedCategories, toggleCategory, clearFilters, searchQuery }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Filter by Category
      </h2>
      {(selectedCategories.length > 0 || searchQuery) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-8 px-2 text-xs hover:text-primary"
        >
          Clear Filters
        </Button>
      )}
    </div>

    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategories.includes(category) ? "default" : "outline"}
          className={
            selectedCategories.includes(category)
              ? "bg-primary hover:bg-primary/80"
              : "border-primary/20 hover:bg-primary/10 hover:text-primary"
          }
          onClick={() => toggleCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  </div>
);

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const gamesPerPage = 12

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await gameService.getGames({
          page: currentPage,
          limit: gamesPerPage,
          search: searchQuery,
          categoryId: selectedCategories.length === 1 ? selectedCategories[0] : undefined
        })
        setGames(response)
      } catch (err) {
        setError("Failed to load games. Please try again later.")
        console.error("Error fetching games:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [currentPage, searchQuery, selectedCategories])

  // Filter games based on search query and selected categories
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(game.categoryId)
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage)

  // Manipuladores de eventos
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      let startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
    }

    return pageNumbers
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <main className="container py-6 md:py-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              All Games
            </h1>
            <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
          </div>

          <CategoryFilter
            allCategories={allCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            clearFilters={clearFilters}
            searchQuery={searchQuery}
          />

          {/* Resultados e estatísticas */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"}
            {selectedCategories.length > 0 && (
              <>
                {" "}
                in {selectedCategories.length} {selectedCategories.length === 1 ? "category" : "categories"}
              </>
            )}
            {searchQuery && <> matching "{searchQuery}"</>}
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-center py-4">
              {error}
            </div>
          )}

          {/* Lista de jogos */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={game.imageUrl || "/placeholder.svg?height=300&width=400"}
                  categoryName={game.categoryId}
                  avgRating={0} // These values will come from the API response
                  reviewCount={0}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted/30 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No games found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any games matching your search criteria. Try adjusting your filters or search query.
              </p>
              <Button variant="outline" className="mt-4 border-primary/20 hover:bg-primary/10" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Paginação */}
          {!isLoading && filteredGames.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 border-primary/20 hover:bg-primary/10"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>

                {getPageNumbers().map((page) => (
                  <Button
                    key={page}
                    variant="outline"
                    size="sm"
                    className={`
                      border-primary/20 
                      ${currentPage === page ? "bg-primary/10 hover:bg-primary/20 text-primary" : "hover:bg-primary/10"}
                    `}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 border-primary/20 hover:bg-primary/10"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

