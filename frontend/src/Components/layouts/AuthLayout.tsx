import { type ReactNode } from "react"
import Footer from "@/components/auth/AuthFooter"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </main> 
      <Footer />
    </div>
  )
} 