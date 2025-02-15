import * as bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository";
import { User } from "../models/User";

class UserService {
  async register(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const existingUser = await UserRepository.findByEmail(user.email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await UserRepository.create({ ...user, password: hashedPassword });
  }
}

export default new UserService();
