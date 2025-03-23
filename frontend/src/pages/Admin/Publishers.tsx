import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Pencil, Trash2, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import AdminLayout from "@/components/layouts/AdminLayout"

export default function PublishersAdmin() {
  const publishers = [
    {
      id: "1",
      name: "Bandai Namco Entertainment",
      country: "Japan",
      logo: "/placeholder.svg?height=40&width=40",
      gameCount: 87,
      status: "Active",
    },
    {
      id: "2",
      name: "Sony Interactive Entertainment",
      country: "United States",
      logo: "/placeholder.svg?height=40&width=40",
      gameCount: 64,
      status: "Active",
    },
    {
      id: "3",
      name: "Electronic Arts",
      country: "United States",
      logo: "/placeholder.svg?height=40&width=40",
      gameCount: 112,
      status: "Active",
    },
    {
      id: "4",
      name: "Ubisoft",
      country: "France",
      logo: "/placeholder.svg?height=40&width=40",
      gameCount: 93,
      status: "Active",
    },
    {
      id: "5",
      name: "Square Enix",
      country: "Japan",
      logo: "/placeholder.svg?height=40&width=40",
      gameCount: 76,
      status: "Active",
    },
    {
      id: "6",
      name: "Activision Blizzard",
      country: "United States",
      logo: "/placeholder.svg?height=40&width=40",
      gameCount: 89,
      status: "Inactive",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Publishers</h1>
        <Link to="/admin/publishers/new">
          <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Publisher
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search publishers..."
            className="pl-8 bg-muted/50 border-muted focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publisher</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Games</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publishers.map((publisher) => (
              <TableRow key={publisher.id} className="hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={publisher.logo || "/placeholder.svg"}
                      alt={publisher.name}
                      className="h-8 w-8 rounded-md object-contain bg-muted/30"
                    />
                    <span className="font-medium">{publisher.name}</span>
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  {publisher.country}
                </TableCell>
                <TableCell>{publisher.gameCount}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      publisher.status === "Active"
                        ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                        : "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30"
                    }
                  >
                    {publisher.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}

