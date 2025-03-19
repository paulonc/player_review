import { Game } from './Game';

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  games?: Game[];
}

