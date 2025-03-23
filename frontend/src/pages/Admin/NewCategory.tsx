import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Tag } from "lucide-react"
import AdminLayout from "@/components/layouts/AdminLayout"
export default function NewCategory() {
  const [name, setName] = useState("")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/admin/categories" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold">Add New Category</h1>
        </div>
        <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
          Save Category
        </Button>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="flex flex-row items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="name">
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter category name (e.g. Action, RPG, Strategy)"
              className="bg-muted/50 border-muted focus-visible:ring-primary"
              value={name}
              onChange={handleNameChange}
            />
            <p className="text-sm text-muted-foreground mt-4">
              This category will be available for selection when adding or editing games.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
          Cancel
        </Button>
        <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
          Save Category
        </Button>
      </div>
    </div>
    </AdminLayout>
  )
}

