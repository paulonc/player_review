import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"

type Game = {
  id: string
  title: string
  developer: string
  category: string
  rating: number
}

type GamesTableProps = {
  games: Game[]
}

export function GamesTable({ games }: GamesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game Title</TableHead>
            <TableHead>Developer</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="font-medium">{game.title}</div>
              </TableCell>
              <TableCell>{game.developer}</TableCell>
              <TableCell>
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-xs">
                  {game.category}
                </Badge>
              </TableCell>
              <TableCell>
                {game.rating > 0 ? (
                  <span>{game.rating.toFixed(1)}</span>
                ) : (
                  <span className="text-xs text-muted-foreground">Not rated</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 