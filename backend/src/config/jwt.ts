import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role: string;
}

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
