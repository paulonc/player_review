import prisma from "../config/prisma";
import { User } from "../models/User";

class UserRepository {
  async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
}

export default new UserRepository();
