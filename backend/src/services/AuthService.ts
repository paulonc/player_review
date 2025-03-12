import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import { NotFoundError, ValidationError } from '../errors/AppError';
import { generateToken } from '../config/jwt';

class AuthService {
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new NotFoundError('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ValidationError('Invalid credentials');

    const token = generateToken(user.id, user.role);

    return { token };
  }
}

export default new AuthService();
