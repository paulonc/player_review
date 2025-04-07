import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

interface QuickActionProps {
  to: string
  Icon: LucideIcon
  label: string
}

export function QuickAction({ to, Icon, label }: QuickActionProps) {
  return (
    <Link to={to}>
      <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 h-auto py-6 flex flex-col gap-2">
        <Icon className="h-6 w-6" />
        <span>{label}</span>
      </Button>
    </Link>
  )
} 