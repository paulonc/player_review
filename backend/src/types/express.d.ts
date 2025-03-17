declare global {
  namespace Express {
    export interface UserAuthenticatedRequest extends Request {
      user?: {
        id: string;
        role: string;
        iat: number;
        exp: number;
      };
    }
  }
}

export { UserAuthenticatedRequest };
