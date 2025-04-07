import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import AdminLayout from "@/components/layouts/AdminLayout"
import { companyService } from "@/services/companyService"
import { toast } from "sonner"

export default function EditPublisher() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [imageUrl, setImageUrl] = useState("")

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

  useEffect(() => {
    const loadPublisher = async () => {
      try {
        const res = await companyService.getCompany(id!)
        const pub = res.data
        setName(pub.name)
        setCountry(pub.country)
        setImageUrl(pub.imageUrl)
      } catch (err) {
        toast.error("Failed to load publisher")
        console.error(err)
        navigate("/admin/publishers")
      } finally {
        setLoading(false)
      }
    }
    loadPublisher()
  }, [id, navigate])

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
    if (!imageUrl.trim()) {
      toast.error("Logo URL is required")
      return
    }

    setSaving(true)
    try {
      await companyService.updateCompany(id!, {
        name: name.trim(),
        country,
        imageUrl: imageUrl.trim(),
      })
      toast.success("Publisher updated successfully!")
      navigate("/admin/publishers")
    } catch (error) {
      toast.error("Failed to update publisher")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading publisher...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/admin/publishers"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">Edit Publisher</h1>
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
              disabled={saving}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {saving ? "Saving..." : "Save Publisher"}
            </Button>
          </div>
        </div>

        <Card className="border-muted/60">
          <CardHeader>
            <CardTitle>Publisher Information</CardTitle>
            <CardDescription>Edit existing publisher</CardDescription>
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
                <SelectTrigger
                  id="country"
                  className="bg-muted/50 border-muted focus-visible:ring-primary"
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">
                Logo URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/logo.png"
                className="bg-muted/50 border-muted focus-visible:ring-primary"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter a direct URL to the publisher's logo image
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  )
}
