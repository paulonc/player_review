import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Tag, Loader2 } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { categoryService } from "@/services/categoryService";
import { toast } from "sonner";

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await categoryService.getCategory(id!);
        setName(res.data.name);
      } catch (err) {
        toast.error("Failed to load category");
        console.error(err);
        navigate("/admin/categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [id, navigate]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSaving(true);
    try {
      await categoryService.updateCategory(id!, name.trim());
      toast.success("Category updated successfully!");
      navigate("/admin/categories");
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Carregando categoria...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/admin/categories"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">Edit Category</h1>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
              onClick={() => navigate("/admin/categories")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {saving ? "Saving..." : "Save Category"}
            </Button>
          </div>
        </div>

        <Card className="border-muted/60">
          <CardHeader className="flex items-center gap-2">
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
                required
              />
              <p className="text-sm text-muted-foreground mt-4">
                This category will be available for selection when adding or
                editing games.
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
}
