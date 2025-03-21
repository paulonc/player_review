import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { User } from "@/types/api"

interface JwtPayload {
  id: string
  username: string
  email: string
  role: string
  iat: number
  exp: number
}

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
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
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("authToken")
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token)
        const userFromToken: User = {
          id: decodedToken.id,
          username: decodedToken.username,
          email: decodedToken.email,
          role: decodedToken.role,
          createdAt: new Date().toISOString()
        }
        setUser(userFromToken)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (token: string) => {
    Cookies.set("authToken", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict"
    })
    try {
      const decodedToken = jwtDecode<JwtPayload>(token)
      const userFromToken: User = {
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role,
        createdAt: new Date().toISOString()
      }
      setUser(userFromToken)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Error decoding token:", error)
    }
  }

  const logout = () => {
    Cookies.remove("authToken")
    setIsAuthenticated(false)
    setUser(null)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
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
