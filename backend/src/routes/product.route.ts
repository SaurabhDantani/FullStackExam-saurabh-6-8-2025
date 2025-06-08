import { Request, Response } from "express";
import { IRouting, ImportedRoute } from "./routing.interface";
import * as express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import ProductController from "../controllers/ProductController";

@ImportedRoute.register
class ProductRoute implements IRouting {
  prefix = "/product";
  register(app: express.Application) {

    // Protected routes
    app.get(
      `${this.prefix}/insert`,
      authenticateToken,
      (req: Request, res: Response, next: express.NextFunction) => {
        return ProductController.insertProducts(req, res, next);
      }
    );

    app.get(
      `${this.prefix}/list`,
      authenticateToken,
      (req: Request, res: Response, next: express.NextFunction) => {
        return ProductController.listProducts(req, res, next);
      }
    );

    app.get(
      `${this.prefix}/info/:id`,
      authenticateToken,
      (req: Request, res: Response, next: express.NextFunction) => {
        return ProductController.infoProducts(req, res, next);
      }
    );

  }
}

export default new ProductRoute();
