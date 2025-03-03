export interface Review {
    id: string;
    userId: string;
    gameId: string;
    rating: number;
    review: string | null;
    createdAt: Date;
  }
  