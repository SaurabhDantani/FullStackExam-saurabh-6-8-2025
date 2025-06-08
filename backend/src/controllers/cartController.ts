import { Request, Response, NextFunction } from 'express';
import { AppError, catchAsync } from '../middleware/errorHandler';
import { Cart } from '../models/mongo/cart';
import { Product } from '../models/mongo/Product';
import * as dotenv from 'dotenv';
dotenv.config();
const secretKey= process.env.AUTH_SECRET_KEY;
import jwt from 'jsonwebtoken';

class CartController {

  private async getUserId(req: any, res:any) {
    try {
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

      return userId;
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  }
  async addToCart(req: Request, res: Response, next: NextFunction) {
    const { productId, quantity } = req.body;
    const userId = await this.getUserId(req, res);    

    if (!userId) {
      return next(new AppError('Please login to add items to cart', 401));
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return next(new AppError('Not enough stock available', 400));
    }

    // Find user's cart or create new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      // Check if product already exists in cart
      const existingItem = cart.items.find(
        item => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {  
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    // Populate product details
    await cart.populate('items.productId');

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    const userId = await this.getUserId(req, res)

    if (!userId) {
      return next(new AppError('Please login to view cart', 401));
    }

    const cart = await Cart.findOne({ userId })
      .populate({
        path: 'items.productId',
        select: 'name price image description'
      });

    if (!cart) {
      return res.status(200).json({
        status: 'success',
        data: {
          cart: { items: [] }
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  }

  async removeFromCart(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;
    const userId = await this.getUserId(req, res)

    if (!userId) {
      return next(new AppError('Please login to modify cart', 401));
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  }

}

export default new CartController();