import GameRepository from "../repositories/GameRepository";
import ReviewRepository from "../repositories/ReviewRepository";
import UserRepository from "../repositories/UserRepository";

class DashService {
  async getCounts(): Promise<{ games: number; reviews: number; users: number }> {
    const gamesCount = await GameRepository.count();
    const reviewsCount = await ReviewRepository.count();
    const usersCount = await UserRepository.count();
    return { games: gamesCount, reviews: reviewsCount, users: usersCount };
  }

  async getRecentActivities(): Promise<{ type: string; title: string; timestamp: Date; }[]> {
    const recentReviews = await ReviewRepository.findRecent();

    console.log(recentReviews)
    const activities = [
      ...recentReviews.map(review => ({ type: 'Review', title: review.review.title, author: review.userName, game: review.game, timestamp: review.review.createdAt })),
    ];

    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export default new DashService();