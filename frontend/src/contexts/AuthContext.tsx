import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = Cookies.get("authToken")
    return !!token
  })
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("authToken")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = (token: string) => {
    Cookies.set("authToken", token, { 
      expires: 7,
      secure: true,
      sameSite: "Strict"
    })
    setIsAuthenticated(true)
  }

  const logout = () => {
    Cookies.remove("authToken")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
