export interface Game {
  id: string;
  title: string;
  description: string | null;
  companyId: string;
  categoryId: string;
  releaseDate: Date;
  createdAt: Date;
  imageUrl: string | null;
}
