import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ReviewCardProps {
  username: string
  avatar: string
  date: string
  rating: number
  content: string
}

export default function ReviewCard({
  username,
  avatar,
  date,
  rating,
  content,
}: ReviewCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-muted/60">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="border-2 border-primary/20">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{username}</h3>
                <p className="text-sm text-muted-foreground">{date}</p>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted-foreground"}`}
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed">{content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

