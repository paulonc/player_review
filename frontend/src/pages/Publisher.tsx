import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"
import { companyService } from "@/services/companyService"
import { gameService } from "@/services/gameService"
import { Company, Game } from "@/types/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Calendar, Gamepad, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

interface CompanyDetails {
  company: Company;
  games: Game[];
}

// Component for displaying company header information
const CompanyHeader = ({ company, gamesCount }: { company: Company; gamesCount: number }) => (
  <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
    <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
      {company.imageUrl ? (
        <img 
          src={company.imageUrl} 
          alt={company.name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-muted-foreground text-4xl font-bold">
          {company.name.charAt(0)}
        </div>
      )}
    </div>
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {company.country}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Gamepad className="h-3 w-3" />
          {gamesCount} Games
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Founded {new Date(company.createdAt).getFullYear()}
        </Badge>
      </div>
      <p className="text-muted-foreground">
        {company.name} is a game development company based in {company.country}.
      </p>
    </div>
  </div>
);

// Component for displaying a list of games
const GameList = ({ games }: { games: Game[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {games.map((game) => (
      <Card key={game.id} className="overflow-hidden flex flex-col h-full">
        <div className="w-full h-48 relative">
          <img 
            src={game.imageUrl || "/placeholder.svg"} 
            alt={game.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="p-4 flex-none">
          <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
          <CardDescription className="text-sm">
            Released: {new Date(game.releaseDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Link to={`/games/${game.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    ))}
  </div>
);

// Component for displaying company statistics
const CompanyStats = ({ company, gamesCount }: { company: Company; gamesCount: number }) => (
  <Card>
    <CardHeader>
      <CardTitle>Company Stats</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Games Published</span>
          <span className="font-medium">{gamesCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Founded</span>
          <span className="font-medium">{new Date(company.createdAt).getFullYear()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Country</span>
          <span className="font-medium">{company.country}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Component for displaying loading state
const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
    <Navbar />
    <main className="container py-6">
      <div className="flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    </main>
    <Footer />
  </div>
);

// Component for displaying error state
const ErrorState = ({ error }: { error: string | null }) => (
  <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
    <Navbar />
    <main className="container py-6">
      <div className="flex items-center justify-center">
        <div className="text-destructive">{error || 'Company not found'}</div>
      </div>
    </main>
    <Footer />
  </div>
);

export default function CompanyPage() {
  const { id } = useParams();
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const companyResponse = await companyService.getCompany(id);
        
        const gamesResponse = await gameService.getGames({ 
          companyId: id,
          limit: 100
        });
        
        const companyDetails: CompanyDetails = {
          company: companyResponse.data,
          games: gamesResponse.data
        };
        
        setCompanyDetails(companyDetails);
      } catch (err) {
        setError('Failed to load company details');
        console.error('Error fetching company details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !companyDetails) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <main className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CompanyHeader company={companyDetails.company} gamesCount={companyDetails.games.length} />

            <Tabs defaultValue="games" className="mb-8">
              <TabsList className="bg-muted/50 border border-muted">
                <TabsTrigger
                  value="games"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Games
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  About
                </TabsTrigger>
              </TabsList>
              <TabsContent value="games" className="pt-6">
                {companyDetails.games.length > 0 ? (
                  <GameList games={companyDetails.games} />
                ) : (
                  <div className="text-center py-12">
                    <Gamepad className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No games found</h3>
                    <p className="text-muted-foreground">
                      This company hasn't published any games yet.
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="about" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {companyDetails.company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {companyDetails.company.name} is a game development company based in {companyDetails.company.country}.
                      They have published {companyDetails.games.length} games.
                    </p>
                    <p className="text-muted-foreground">
                      Founded in {new Date(companyDetails.company.createdAt).getFullYear()}, 
                      they continue to create innovative gaming experiences for players around the world.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:col-span-1 mt-12">
            <div className="sticky top-24">
              <CompanyStats company={companyDetails.company} gamesCount={companyDetails.games.length} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 