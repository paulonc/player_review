import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import PublisherCard from "@/components/PublisherCard"
import { companyService } from "@/services/companyService"
import { gameService } from "@/services/gameService"
import Navbar from "@/components/Navbar"
import { Company, Game } from "@/types/api"
import Footer from "@/components/Footer"

export default function PublishersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [publishers, setPublishers] = useState<Company[]>([])
  const [publisherGames, setPublisherGames] = useState<Record<string, Game[]>>({})
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const publishersPerPage = 12

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])



  useEffect(() => {
    const fetchPublishers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await companyService.getCompanies(currentPage, publishersPerPage)
        
        setPublishers(response.data)
        setPagination({
          total: response.data.length,
          page: currentPage,
          limit: publishersPerPage,
          totalPages: Math.ceil(response.data.length / publishersPerPage)
        })
      } catch (err) {
        setError("Failed to load publishers. Please try again later.")
        console.error("Error loading publishers:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPublishers()
  }, [currentPage, debouncedSearchQuery])

  useEffect(() => {
    const fetchPublisherGames = async () => {
      if (publishers.length === 0) return;
      
      try {
        const gamesPromises = publishers.map(publisher => 
          gameService.getGames({ companyId: publisher.id, limit: 100 })
            .then(response => ({ publisherId: publisher.id, games: response.data }))
            .catch(err => {
              console.error(`Error fetching games for publisher ${publisher.id}:`, err);
              return { publisherId: publisher.id, games: [] };
            })
        );
        
        const results = await Promise.all(gamesPromises);
        
        const gamesMap: Record<string, Game[]> = {};
        
        results.forEach(result => {
          gamesMap[result.publisherId] = result.games;
        });
        
        setPublisherGames(gamesMap);
      } catch (err) {
        console.error("Error fetching publisher games:", err);
      }
    };
    
    fetchPublisherGames();
  }, [publishers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDebouncedSearchQuery("")
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const getPageNumbers = () => {
    if (!pagination) return []

    const pageNumbers = []
    const maxVisiblePages = 5
    const totalPages = pagination.totalPages

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
              Game Publishers
            </h1>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search publishers by name..."
                className="pl-8 rounded-full bg-muted/50 border-muted focus-visible:ring-primary"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {pagination && !isLoading && (
            <div className="text-sm text-muted-foreground">
              Showing {pagination.total} {pagination.total === 1 ? "publisher" : "publishers"}
              {searchQuery && <> matching "{searchQuery}"</>}
            </div>
          )}

          {error && <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-500">{error}</div>}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading publishers...</p>
            </div>
          ) : (
            <>
              {publishers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {publishers.map((publisher) => (
                    <PublisherCard
                      key={publisher.id}
                      id={publisher.id}
                      name={publisher.name}
                      logo={publisher.imageUrl}
                      country={publisher.country}
                      gameCount={publisherGames[publisher.id]?.length || 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-muted/30 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No publishers found</h3>
                  <p className="text-muted-foreground max-w-md">
                    We couldn't find any publishers matching your search criteria. Try adjusting your filters or search
                    query.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-primary/20 hover:bg-primary/10"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {pagination && pagination.totalPages > 1 && (
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
                          ${
                            currentPage === page
                              ? "bg-primary/10 hover:bg-primary/20 text-primary"
                              : "hover:bg-primary/10"
                          }
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
                      disabled={pagination && currentPage === pagination.totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

    <Footer />
    </div>
  )
}

