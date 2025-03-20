import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface AuthErrorProps {
  error: string
}

export default function AuthError({ error }: AuthErrorProps) {
  if (!error) return null

  return (
    <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-500">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
} 