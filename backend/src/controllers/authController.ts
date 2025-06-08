import { Request, Response, NextFunction } from 'express';
import dbUtils from "../utils/db.utils";
import * as bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from '../models/sql/User';
dotenv.config();
const secretKey= process.env.AUTH_SECRET_KEY;

class AuthController {

  private generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = Math.random() * 16 | 0;
      const value = char === 'x' ? random : (random & 0x3 | 0x8);
      return value.toString(16);
    });
  }

  async doRegistration(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;
    let userIdGUI = this.generateGuid()
    try {
      const connection = await dbUtils.getDefaultConnection();
      const memberRepo = connection.getRepository(User)

      const userExists = await memberRepo
        .createQueryBuilder('user')
        .where('user.email = :email', { email: email })
        .getOne();

      if (userExists) {
        return res.status(409).json({ message: 'Email Id exists' });
      }

      const member = memberRepo.create({
        // id: userIdGUI,
        name: name,
        email: email,
        password: password,
      });

      await memberRepo.save(member);
      return res.status(200).json({message:'User registered successfully'});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'error', error });
    }
  }

  async doLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const connection = await dbUtils.getDefaultConnection();
      const userRepo = connection.getRepository(User);

      if(!email || !password) {
        return res.status(403).json({ message: 'Email and password are required' });

      }
      const user = await userRepo.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = Jwt.sign(
        { 
          userId: user.id,
          email: user.email 
        },
        secretKey || "your-secret-key",
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new AuthController();