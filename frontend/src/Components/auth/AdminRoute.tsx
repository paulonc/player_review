import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface AdminRouteProps {
  children: React.ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
} 