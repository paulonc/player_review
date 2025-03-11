// src/services/AuthService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';
import { NotFoundError, ValidationError } from '../errors/AppError';

class AuthService {
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new NotFoundError('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ValidationError('Invalid credentials');

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );

    return { token };
  }
}

export default new AuthService();
