export interface Game {
  id: string;
  title: string;
  description: string | null;
  companyId: string;
  releaseDate: Date;
  createdAt: Date;
}
