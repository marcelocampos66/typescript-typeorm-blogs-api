import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from '../middlewares/errorMiddleware';
import { IControllers } from '../Type';

class App {
  public app: express.Application;
  private controllers: IControllers;
  public port: number;

  constructor(port: number, controllers: IControllers) {
    this.app = express();
    this.controllers = controllers;
    this.port = port;
    this.initializeMiddlewares();
    this.callRouters();
    this.handleErrors();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private callRouters() {
    this.app.use('/users', this.controllers.UsersController.router);
    this.app.use('/categories', this.controllers.CategoriesController.router);
    this.app.use('/posts', this.controllers.BlogPostsController.router);
  }

  private handleErrors() {
    this.app.use(errorMiddleware);
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`🔥🐉 API online on port: ${this.port} 🐉🔥`);
    });
  }

}

export default App;
