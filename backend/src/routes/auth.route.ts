import { Request, Response } from "express";
import { IRouting, ImportedRoute } from "./routing.interface";
import * as express from "express";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import { authenticateToken } from "../middleware/auth.middleware";

@ImportedRoute.register
class AuthRoute implements IRouting {
  prefix = "/auth";

  register(app: express.Application) {
    // Public routes
    app.post(`${this.prefix}/register`, (req: Request, res: Response, next: express.NextFunction) => {
      return authController.doRegistration(req, res, next);
    });
  
    app.post(`${this.prefix}/login`, (req: Request, res: Response, next: express.NextFunction) => {
      return authController.doLogin(req, res, next);
    });

    app.get(`${this.prefix}/profile`, authenticateToken, (req: Request, res: Response, next: express.NextFunction) => {
      return userController.getProfile(req, res, next);
    });
  }
}

export default new AuthRoute();
