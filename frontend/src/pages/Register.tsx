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

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.")
        return
      }

      const { token } = data
      if (token) {
        login(token)
        navigate("/")
      } else {
        setError("Token not returned")
      }
    } catch (err) {
      console.error(err)
      setError("Registration failed. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col">
      <AuthNavbar />
      <AuthLayout
        title="Create an account"
        subtitle="Join our gaming community today"
      >
        <AuthError error={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="username"
            label="Username"
            placeholder="username"
            value={username}
            onChange={setUsername}
            required
          />

          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={setEmail}
            required
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            required
            helpText="Password must be at least 8 characters long"
          />

          <FormField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              required
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:text-primary/90 transition-colors">
                terms of service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:text-primary/90 transition-colors">
                privacy policy
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary/90 transition-colors font-medium">
            Sign in
          </Link>
        </div>
      </AuthLayout>
    </div>
  )
}
