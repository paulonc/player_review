import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface Category {
  id: string
  name: string
  created_at: string
}

export default function CategoryFilter() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data: Category[] = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Categories
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Game Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category.id}
            checked={selectedCategoryIds.includes(category.id)}
            onCheckedChange={() => toggleCategory(category.id)}
          >
            {category.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

