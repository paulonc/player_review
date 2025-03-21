import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import AuthLayout from "@/components/layouts/AuthLayout"
import AuthError from "@/components/auth/AuthError"
import FormField from "@/components/auth/FormField"
import AuthNavbar from "@/components/auth/AuthNavbar"
import { useAuth } from "@/contexts/AuthContext"
import { authService } from "@/services/authService"
import { AxiosError } from "axios"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const { token } = await authService.login({ email, password })
      if (token) {
        login(token)
        navigate("/")
      } else {
        setError("Token not returned")
      }
    } catch (err) {
      console.error(err)
      const axiosError = err as AxiosError<{ message: string }>
      setError(axiosError.response?.data?.message || "Error logging in. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthNavbar />
      <AuthLayout
        title="Welcome back"
        subtitle="Enter your account to continue"
      >
        <AuthError error={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={setEmail}
            required
          />

          <div className="space-y-2">
              <FormField
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                required
              />
            </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:text-primary/90 transition-colors font-medium">
            Register
          </Link>
        </div>
      </AuthLayout>
    </>
  )
}
