import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const secretKey= process.env.AUTH_SECRET_KEY;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey || 'your-secret-key') as any;

    if (!decoded) {
      return res.status(401).json({ message: 'Session expired or invalid' });
    }
    next();
    return
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// export const authorizeRole = (roles: RoleEnum[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = (req as any).user as AuthUser;
//     if (!user) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }

//     if (!roles.includes(user.role)) {
//       return res.status(401).json({ message: 'Insufficient permissions' });
//     }

//     next();
//     return
//   };
// };