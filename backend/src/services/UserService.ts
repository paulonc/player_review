import bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository";
import { User } from "../models/User";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "The current password is required."),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
class UserService {
  async register(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const parsedUser = userSchema.parse(user);

    const existingUser = await UserRepository.findByEmail(parsedUser.email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await UserRepository.create({ ...user, password: hashedPassword });
  }

  async getUserById(id: string): Promise<Omit<User, "password"> | null> {
    if (!id) throw new Error("User ID is required");

    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers(): Promise<Omit<User, "password">[]> {
    return await UserRepository.findAll();
  }

  async update(
    id: string,
    userData: Partial<Omit<User, "id" | "password" | "createdAt">>
  ): Promise<Omit<User, "password"> | null> {
    if (!id) throw new Error("User ID is required");

    if (userData.email) {
      const existingUser = await UserRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email is already in use by another user");
      }
    }
    const updatedUser = await UserRepository.update(id, userData);
    if (!updatedUser) throw new Error("User not found");

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) throw new Error("User ID is required");

    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");

    await UserRepository.delete(id);
  }

  async updatePassword(id: string, newPassword: string): Promise<boolean> {
    const user = await UserRepository.findById(id);
    if (!user) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserRepository.changePassword(id, hashedPassword);
    return true;
  }
}

export default new UserService();
