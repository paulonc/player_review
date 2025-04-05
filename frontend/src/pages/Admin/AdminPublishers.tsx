import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Pencil, Trash2, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import AdminLayout from "@/components/layouts/AdminLayout"
import { useState } from "react"
import { useEffect } from "react"
import { companyService } from "@/services/companyService"
import { Company } from "@/types/api"

export default function PublishersAdmin() {

  const [publishers, setPublishers] = useState<Company[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchPublishers = async () => {
      const response = await companyService.getCompanies()
      setPublishers(response.data)
    }
    fetchPublishers()
  }, [searchQuery])

  const filteredPublishers = publishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publisher</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPublishers.map((publisher) => (
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

