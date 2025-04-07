import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"

interface PublisherCardProps {
  id: string
  name: string
  logo: string
  country: string
  gameCount: number
}

export default function PublisherCard({ id, name, logo, country, gameCount }: PublisherCardProps) {
  return (
    <Link to={`/publishers/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border-muted/60 group h-full">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center p-2 mb-4 overflow-hidden">
            <img
              src={logo || "/placeholder.svg"}
              alt={name}
              className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center justify-center mt-2 gap-1.5">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{country}</span>
          </div>
        </div>
        <CardContent className="p-4 pt-0 flex flex-col items-center">
          <div className="flex items-center mt-2">
            <span className="text-muted-foreground text-sm">{gameCount} games</span>
          </div>
          <Badge className="mt-3 bg-primary/10 text-primary hover:bg-primary/20 border-none">Top Publisher</Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between border-t border-muted/30 mt-2">
          <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">View details</span>
          <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

