import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function ArrowBack() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" />
      Back
    </Link>
  )
}