import {
  ValidationError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} from '../errors/AppError';
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import { User } from '../models/User';
import { z } from 'zod';
import { generateToken } from '../config/jwt';

const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'ADMIN']).optional(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'The current password is required.'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});
class UserService {
  async register(user: Omit<User, 'id' | 'createdAt'>): Promise<{ id: string, token: string }> {
    const parsedUser = userSchema.parse(user);

    const existingUser = await UserRepository.findByEmail(parsedUser.email);
    if (existingUser) throw new ConflictError('Email already in use');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await UserRepository.create({
      ...user,
      password: hashedPassword,
    });
    return { id: newUser.id, token: generateToken(newUser.id, newUser.role) };
  }

  async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    if (!id) throw new ValidationError('User ID is required');

    const user = await UserRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return await UserRepository.findAll();
  }

  async update(
    userId: string,
    id: string,
    userData: Partial<Omit<User, 'id' | 'password' | 'createdAt'>>,
  ): Promise<Omit<User, 'password'> | null> {
    if (!id) throw new ValidationError('User ID is required');

    if (userId !== id) {
      throw new ValidationError('You can only update your own information');
    }

    const user = await UserRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');

    if (userData.email) {
      const existingUser = await UserRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictError('Email is already in use by another user');
      }
    }

    return await UserRepository.update(id, userData);
  }

  async deleteUser(userId: string, requesterId: string): Promise<void> {
    if (!userId) throw new ValidationError('User ID is required');

    if (userId !== requesterId) {
      throw new UnauthorizedError(
        'You do not have permission to delete this account',
      );
    }

    const user = await UserRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    await UserRepository.delete(userId);
  }

  async changePassword(
    userId: string,
    requesterId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    if (userId !== requesterId) {
      throw new UnauthorizedError('You can only change your own password');
    }

    const { oldPassword: oldPwd, newPassword: newPwd } =
      changePasswordSchema.parse({
        oldPassword,
        newPassword,
      });

    const user = await UserRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    const isMatch = await bcrypt.compare(oldPwd, user.password);
    if (!isMatch) throw new ValidationError('Incorrect current password');

    const hashedNewPassword = await bcrypt.hash(newPwd, 10);
    await UserRepository.updatePassword(userId, hashedNewPassword);
  }
}

export default new UserService();
