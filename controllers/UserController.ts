import express, { Request, Response, NextFunction } from 'express';

class UserController {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/ping', (req, res) => { res.json({ message: 'pong!' }) });
  }

}

export default UserController;
