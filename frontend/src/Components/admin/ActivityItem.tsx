import { LucideIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ActivityItemProps {
  Icon: LucideIcon
  title: string
  highlight: string
  timestamp: string
  author?: string
}

export function ActivityItem({
  Icon,
  title,
  highlight,
  timestamp,
  author,
}: ActivityItemProps) {
  const timeAgo = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/10 border border-muted/60">
      <div className="bg-primary/10 p-2 rounded-full">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">
          {title}{" "}
          <span className="text-purple-800 font-semibold">
            {highlight}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          {timeAgo}
          {author ? ` por ${author}` : ""}
        </p>
      </div>
    </div>
  )
}
