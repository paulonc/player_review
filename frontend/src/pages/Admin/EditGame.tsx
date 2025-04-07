import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { gameService } from "@/services/gameService";
import { categoryService } from "@/services/categoryService";
import { companyService } from "@/services/companyService";
import { Category, Company } from "@/types/api";
import { toast } from "sonner";

export default function EditGame() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    companyId: "",
    categoryId: "",
    imageUrl: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [catsRes, compsRes, gameRes] = await Promise.all([
          categoryService.getCategories(1, 100),
          companyService.getCompanies(1, 100),
          gameService.getGame(id!),
        ]);
        setCategories(catsRes.data);
        setCompanies(compsRes.data);
        const game = gameRes.data;
        if (!game) {
          toast.error("Game not found");
          navigate("/admin/games");
          return;
        }
        setFormData({
          title: game.title,
          description: game.description,
          releaseDate: game.releaseDate.toString().split("T")[0],
          companyId: game.companyId,
          categoryId: game.categoryId,
          imageUrl: game.imageUrl,
        });
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await gameService.updateGame(id!, {
        title: formData.title,
        description: formData.description,
        releaseDate: formData.releaseDate,
        companyId: formData.companyId,
        categoryId: formData.categoryId,
        imageUrl: formData.imageUrl,
      });
      toast.success("Game updated successfully!");
      navigate("/admin/games");
    } catch (err) {
      toast.error("Failed to update game");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading game data...</p>
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
              to="/admin/games"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">Edit Game</h1>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
              onClick={() => navigate("/admin/games")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <Card className="border-muted/60">
          <CardHeader>
            <CardTitle>Game Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Game Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter game title"
                className="bg-muted/50 border-muted focus-visible:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a description of the game"
                className="min-h-[150px] bg-muted/50 border-muted focus-visible:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="releaseDate">
                  Release Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className="bg-muted/50 border-muted focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">
                  Publisher <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, companyId: value }))
                  }
                >
                  <SelectTrigger
                    id="companyId"
                    className="bg-muted/50 border-muted focus-visible:ring-primary"
                  >
                    <SelectValue placeholder="Select a publisher" />
                  </SelectTrigger>
                  <SelectContent className="border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    {companies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, categoryId: value }))
                }
              >
                <SelectTrigger
                  id="categoryId"
                  className="bg-muted/50 border-muted focus-visible:ring-primary"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">
                Image URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/game-image.jpg"
                className="bg-muted/50 border-muted focus-visible:ring-primary"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter a URL for the game's cover image
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
}
