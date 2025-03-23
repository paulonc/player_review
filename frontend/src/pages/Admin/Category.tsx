import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import AdminLayout from "@/components/layouts/AdminLayout"

export default function CategoriesAdmin() {
  const categories = [
    {
      id: "1",
      name: "Action",
      gameCount: 245,
    },
    {
      id: "2",
      name: "Adventure",
      gameCount: 187,
    },
    {
      id: "3",
      name: "RPG",
      gameCount: 156,
    },
    {
      id: "4",
      name: "Strategy",
      gameCount: 98,
    },
    {
      id: "5",
      name: "Simulation",
      gameCount: 76,
    },
    {
      id: "10",
      name: "Platformer",
      gameCount: 67,
    },
  ]

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link to="/admin/categories/new">
          <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Category
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-8 bg-muted/50 border-muted focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Games</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.gameCount}</TableCell>
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

