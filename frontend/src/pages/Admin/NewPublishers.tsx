import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import AdminLayout from "@/components/layouts/AdminLayout"
import { companyService } from "@/services/companyService"
import { toast } from "sonner"

export default function NewPublisher() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [logoUrl, setLogoUrl] = useState("")

  const countries = [
    "United States",
    "Japan",
    "United Kingdom",
    "Canada",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Australia",
    "Brazil",
    "China",
    "South Korea",
    "Sweden",
    "Poland",
    "Netherlands",
    "Russia",
  ]

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      toast.error("Company name is required")
      return
    }

    if (!country) {
      toast.error("Country is required")
      return
    }

    if (!logoUrl.trim()) {
      toast.error("Logo URL is required")
      return
    }

    setLoading(true)
    try {
      await companyService.createCompany({
        name: name.trim(),
        country,
        logoUrl: logoUrl.trim()
      })
      toast.success("Publisher created successfully!")
      navigate("/admin/publishers")
    } catch (error) {
      toast.error("Failed to create publisher")
      console.error("Error creating publisher:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/admin/publishers" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">Add New Publisher</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline" 
              className="border-primary/20 hover:bg-primary/10"
              onClick={() => navigate("/admin/publishers")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {loading ? "Saving..." : "Save Publisher"}
            </Button>
          </div>
        </div>

        <Card className="border-muted/60">
          <CardHeader>
            <CardTitle>Publisher Information</CardTitle>
            <CardDescription>Create a new game publisher</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter publisher name"
                className="bg-muted/50 border-muted focus-visible:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="bg-muted/50 border-muted focus-visible:ring-primary">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="logo-url">
                  Logo URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="logo-url"
                  placeholder="https://example.com/logo.png"
                  className="bg-muted/50 border-muted focus-visible:ring-primary"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">Enter a direct URL to the publisher's logo image</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button 
            type="button"
            variant="outline" 
            className="border-primary/20 hover:bg-primary/10"
            onClick={() => navigate("/admin/publishers")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            {loading ? "Saving..." : "Save Publisher"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  )
}

