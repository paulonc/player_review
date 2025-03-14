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

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await prisma.user.findMany({
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
