import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type GamesSearchProps = {
  onSearch: (value: string) => void
}

export function GamesSearch({ onSearch }: GamesSearchProps) {
  return (
    <div className="relative w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search games..."
        className="pl-8 bg-muted/50 border-muted focus-visible:ring-primary"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
} 