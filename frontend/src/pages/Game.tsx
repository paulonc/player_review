import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GameHeader from "@/components/game/GameHeader"
import GameInfo from "@/components/game/GameInfo"
import GameReviews from "@/components/game/GameReviews"
import SimilarGames from "@/components/game/SimilarGames"
import WriteReviewButton from "@/components/game/WriteReviewButton"

export default function GamePage() {
  const { id } = useParams();
    
  const game = {
    id: id,
    title: "Elden Ring",
    description:
      "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. The game was directed by Hidetaka Miyazaki and made in collaboration with fantasy novelist George R. R. Martin, who provided material for the game's setting.",
    image: "https://gameforfun.com.br/wp-content/uploads/2020/05/Especial-Assassins-Creed-Valhalla.jpg",
    releaseDate: "February 25, 2022",
    developer: "FromSoftware",
    company: "Bandai Namco Entertainment",
    platforms: ["PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One", "PC"],
    category: "Action RPG",
    rating: 4.8,
    reviewCount: 1243,
  }

  const similarGames = [
    {
      id: "1",
      title: "Dark Souls 3",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.7
    },
    {
      id: "2",
      title: "Bloodborne",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.8
    },
    {
      id: "3",
      title: "Sekiro: Shadows Die Twice",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.6
    },
    {
      id: "4",
      title: "Demon's Souls",
      image: "/placeholder.svg?height=60&width=60",
      rating: 4.5
    }
  ]

  const reviews = [
    {
      username: "GamerPro123",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "March 15, 2023",
      rating: 5,
      content: "Elden Ring is a masterpiece. The open world design is breathtaking, and the combat is challenging but fair. The lore is deep and mysterious, typical of FromSoftware games. I've spent over 200 hours exploring the Lands Between and still finding new things.",
      ratings: {
        graphics: 5,
        gameplay: 5,
        story: 4,
        sound: 5,
        value: 5,
      },
      likes: 42,
      comments: 8,
    },
    {
      username: "RPGFan",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "April 2, 2023",
      rating: 4,
      content: "Elden Ring expands on the Souls formula in exciting ways. The open world gives you freedom to approach challenges in different orders, which helps if you get stuck. The only downside is some performance issues on PC, but they've been mostly patched out.",
      ratings: {
        graphics: 4,
        gameplay: 5,
        story: 4,
        sound: 4,
        value: 5,
      },
      likes: 28,
      comments: 3,
    },
    {
      username: "CasualGamer",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "May 10, 2023",
      rating: 3,
      content: "As someone new to FromSoftware games, I found Elden Ring extremely difficult. The lack of clear direction can be frustrating, and the boss fights are punishing. However, the world design and atmosphere are incredible, and there's a real sense of achievement when you finally overcome a challenge.",
      ratings: {
        graphics: 5,
        gameplay: 3,
        story: 3,
        sound: 4,
        value: 4,
      },
      likes: 15,
      comments: 12,
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <main className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GameHeader
              title={game.title}
              image={game.image}
              category={game.category}
              rating={game.rating}
              reviewCount={game.reviewCount}
            />

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="bg-muted/50 border border-muted">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-6">
                <GameInfo
                  description={game.description}
                  releaseDate={game.releaseDate}
                  developer={game.developer}
                  company={game.company}
                  platforms={game.platforms}
                />
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <GameReviews reviews={reviews}/>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:col-span-1 mt-12">
            <div className="sticky top-24">
              {game.id && <WriteReviewButton gameId={game.id} gameTitle={game.title} />}
              <SimilarGames games={similarGames} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

