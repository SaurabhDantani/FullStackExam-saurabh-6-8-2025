import { Request, Response } from "express";
import { IRouting, ImportedRoute } from "./routing.interface";
import * as express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import CartController from "../controllers/cartController";

@ImportedRoute.register
class CartRoute implements IRouting {
  prefix = "/cart";
  register(app: express.Application) {

    // Protected routes
    app.post(
      `${this.prefix}/add`,
      authenticateToken,
      (req: Request, res: Response, next: express.NextFunction) => {
        return CartController.addToCart(req, res, next);
      }
    );

    app.delete(
      `${this.prefix}/:productId`,
      authenticateToken,
      (req: Request, res: Response, next: express.NextFunction) => {
        return CartController.removeFromCart(req, res, next);
      }
    );

    app.get(
      `${this.prefix}/get`,
      authenticateToken,
      (req: Request, res: Response, next: express.NextFunction) => {
        return CartController.getCart(req, res, next);
      }
    );

  }
}

export default new CartRoute();
