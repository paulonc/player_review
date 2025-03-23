import { LucideIcon } from "lucide-react"

interface ActivityItemProps {
  Icon: LucideIcon
  title: string
  highlight: string
  timestamp: string
  author?: string
}

export function ActivityItem({ Icon, title, highlight, timestamp, author }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/10 border border-muted/60">
      <div className="bg-primary/10 p-2 rounded-full">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">
          {title} <span className="text-primary">{highlight}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {timestamp}{author ? ` by ${author}` : ""}
        </p>
      </div>
    </div>
  )
} 