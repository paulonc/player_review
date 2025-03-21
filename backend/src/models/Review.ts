export interface Review {
  id: string;
  userId: string;
  gameId: string;
  title: string;
  rating: number;
  review: string | null;
  hoursPlayed: number | null;
  recommended: boolean | null;
  createdAt: Date;
}
