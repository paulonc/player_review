import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("authToken") // Lê o cookie HTTP-only
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (token: string) => {
    // Definindo o cookie HTTP-only com segurança (mesmo após login)
    Cookies.set("authToken", token, { 
      expires: 7, // Expiração em 7 dias
      secure: true, // Garantir que seja enviado apenas por HTTPS
      sameSite: "Strict" // Evitar que o cookie seja enviado em requisições de outros sites
    })
    setIsAuthenticated(true)
  }

  const logout = () => {
    Cookies.remove("authToken") // Remove o cookie ao fazer logout
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
