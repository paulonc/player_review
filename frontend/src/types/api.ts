export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  imageUrl: string;
  companyId: string;
  categoryId: string;
  createdAt: string;
}

export interface TopRatedGame {
  game: Game;
  avgRating: number;
  reviewCount: number;
  categoryName: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface Review {
  id: string;
  content: string;
  rating: number;
  userId: string;
  gameId: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  country: string;
  createdAt: string;
} 