import bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository";
import { User } from "../models/User";

class UserService {
  async register(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const existingUser = await UserRepository.findByEmail(user.email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await UserRepository.create({ ...user, password: hashedPassword });
  }

  async getUserById(id: string): Promise<Omit<User, "password"> | null> {
    return await UserRepository.findById(id);
  }

  async getAllUsers(): Promise<Omit<User, "password">[]> {
    return await UserRepository.findAll();
  }

  async update(id: string, userData: Partial<Omit<User, "id" | "password" |"createdAt">>): Promise<Omit<User, "password"> | null> {
    return await UserRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    await UserRepository.delete(id);
  }
}

export default new UserService();
