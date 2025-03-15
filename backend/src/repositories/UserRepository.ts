import prisma from '../config/prisma';
import { User } from '../models/User';

class UserRepository {
  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findAll(offset: number, limit: number): Promise<Omit<User, 'password'>[]> {
    const totalCount = await prisma.game.count();

    if (offset > 0 && offset >= totalCount) {
      return [];
    }
    
    return await prisma.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async update(
    id: string,
    userData: Partial<Omit<User, 'id' | 'password' | 'createdAt'>>,
  ): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
  }
}

export default new UserRepository();
