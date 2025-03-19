import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import { NotFoundError, UnauthorizedError } from '../errors/AppError';
import { generateToken } from '../config/jwt';
import { z } from 'zod';

const loginSchema = z.object({
  emailZod: z.string().email('Invalid email format'),
  passwordZod: z.string().min(8, 'Password must be at least 8 characters'),
});

class AuthService {
  async login(email: string, password: string): Promise<{ token: string }> {
    const { emailZod, passwordZod } = loginSchema.parse({ email, password });

    const user = await UserRepository.findByEmail(emailZod);
    if (!user) throw new NotFoundError('User not found');

    const isMatch = await bcrypt.compare(passwordZod, user.password);
    if (!isMatch) throw new UnauthorizedError('Invalid credentials');

    const token = generateToken(user.id, user.role);

    return { token };
  }
}

export default new AuthService();
