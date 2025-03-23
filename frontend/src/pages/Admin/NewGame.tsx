import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import AdminLayout from "@/components/layouts/AdminLayout"
export default function NewGame() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const categories = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Racing",
    "Puzzle",
    "Horror",
    "Platformer",
    "Fighting",
    "Shooter",
  ]

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/admin/games" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold">Add New Game</h1>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            Save Game
          </Button>
        </div>
      </div>

      <Card className="border-muted/60">
        <CardHeader>
          <CardTitle>Game Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Game Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter game title"
              className="bg-muted/50 border-muted focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Enter a description of the game"
              className="min-h-[150px] bg-muted/50 border-muted focus-visible:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="release-date">
                Release Date <span className="text-red-500">*</span>
              </Label>
              <Input id="release-date" type="date" className="bg-muted/50 border-muted focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">
                Publisher <span className="text-red-500">*</span>
              </Label>
              <Input
                id="publisher"
                placeholder="Game publisher"
                className="bg-muted/50 border-muted focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category" className="bg-muted/50 border-muted focus-visible:ring-primary">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">
              Image URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="image-url"
              placeholder="https://example.com/game-image.jpg"
              className="bg-muted/50 border-muted focus-visible:ring-primary"
            />
            <p className="text-xs text-muted-foreground">Enter a URL for the game's cover image</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
          Cancel
        </Button>
        <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
          Save Game
        </Button>
      </div>
    </div>
    </AdminLayout>
  )
}

