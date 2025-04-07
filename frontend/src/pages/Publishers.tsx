import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronLeft, ChevronRight, Loader2, Globe } from "lucide-react"
import PublisherCard from "@/components/PublisherCard"
import { companyService } from "@/services/companyService"
import Navbar from "@/components/Navbar"
import { PaginatedResponse, Company } from "@/types/api"
import { Link } from "react-router-dom"

export default function PublishersPage() {
  // States to control UI and data
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [publishers, setPublishers] = useState<Company[]>([])
  const [countries, setCountries] = useState<{name: string, count: number}[]>([])
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
    const fetchCountries = async () => {
      try {
        // Since there's no getCountries method, we'll extract unique countries from publishers
        // This will be populated after we fetch publishers
        if (publishers.length > 0) {
          const uniqueCountries = [...new Set(publishers.map(p => p.country))]
          const countryCounts = uniqueCountries.map(country => ({
            name: country,
            count: publishers.filter(p => p.country === country).length
          }))
          setCountries(countryCounts)
        }
      } catch (err) {
        setError("Failed to load countries. Please try again later.")
        console.error("Error loading countries:", err)
      }
    }

    fetchCountries()
  }, [publishers])

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
  }, [currentPage, selectedCountries, debouncedSearchQuery])

  // Event handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page when search changes
  }

  const toggleCountry = (country: string) => {
    setSelectedCountries(
      (prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [country]), // Allow only one country at a time
    )
    setCurrentPage(1) // Reset to first page when country changes
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDebouncedSearchQuery("")
    setSelectedCountries([])
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Generate array of pages for pagination
  const getPageNumbers = () => {
    if (!pagination) return []

    const pageNumbers = []
    const maxVisiblePages = 5
    const totalPages = pagination.totalPages

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are fewer than the maximum visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Logic to show pages around the current one
      let startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      // Adjust if near the end
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

          {/* Country filters */}
          {countries.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by Country
                </h2>
                {(selectedCountries.length > 0 || searchQuery) && (
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
                {countries.map((country) => (
                  <Badge
                    key={country.name}
                    variant={selectedCountries.includes(country.name) ? "default" : "outline"}
                    className={`
                      cursor-pointer 
                      ${
                        selectedCountries.includes(country.name)
                          ? "bg-primary hover:bg-primary/80"
                          : "border-primary/20 hover:bg-primary/10 hover:text-primary"
                      }
                    `}
                    onClick={() => toggleCountry(country.name)}
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    {country.name}
                    {country.count && <span className="ml-1 text-xs opacity-70">({country.count})</span>}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Results and stats */}
          {pagination && !isLoading && (
            <div className="text-sm text-muted-foreground">
              Showing {pagination.total} {pagination.total === 1 ? "publisher" : "publishers"}
              {selectedCountries.length > 0 && countries.length > 0 && <> from {selectedCountries.join(", ")}</>}
              {searchQuery && <> matching "{searchQuery}"</>}
            </div>
          )}

          {/* Error message */}
          {error && <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-500">{error}</div>}

          {/* Loading state */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading publishers...</p>
            </div>
          ) : (
            <>
              {/* Publishers grid */}
              {publishers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {publishers.map((publisher) => (
                    <PublisherCard
                      key={publisher.id}
                      id={publisher.id}
                      name={publisher.name}
                      logo={publisher.imageUrl}
                      country={publisher.country}
                      rating={0} // Default value since it's not in the Company interface
                      gameCount={0} // Default value since it's not in the Company interface
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

              {/* Pagination */}
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

      <footer className="border-t py-6 md:py-0 bg-muted/30 mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 GameReviewer. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

