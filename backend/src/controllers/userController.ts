import { Request, Response, NextFunction } from 'express';
import dbUtils from "../utils/db.utils";
import { User } from '../models/sql/User';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretKey= process.env.AUTH_SECRET_KEY;
dotenv.config();
class AuthController {

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const connection = await dbUtils.getDefaultConnection();
      const userRepo = connection.getRepository(User);
      
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
      
      const decoded = jwt.verify(token, secretKey || 'your-secret-key') as any;
  
      if (!decoded) {
        return res.status(401).json({ message: 'Session expired or invalid' });
      }
      
      const userId = decoded.userId;
      const user = await userRepo.findOne({
        where: { id: userId },
        select: ['id', 'name', 'email']
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error getting profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}

export default new AuthController();
