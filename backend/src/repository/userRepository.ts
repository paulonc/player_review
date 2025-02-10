import User from "../models/User";

export class UserRepository {
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    return await User.create({ name, email, password });
  }

  async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }
}
