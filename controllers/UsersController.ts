import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import { TUsersService } from '../Type';

class UsersController extends Middlewares {
  public router: express.Router;
  public service: TUsersService;

  constructor(UsersService: TUsersService) {
    super();
    this.router = express.Router();
    this.service = UsersService;
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.post('/', [
      this.verifyUserInfos,
      this.verifyUserExists,
      this.registerUser,
    ]);
    this.router.post('/login', [
      this.verifyUserCredentials,
      this.login,
    ]);
    this.router.get('/', [
      this.validateJWT,
      this.getAllUsers,
    ]);
    this.router.get('/:id', [
      this.validateJWT,
      this.getUserById,
    ]);
  }

  private registerUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { name, email, password } } = req;
    const result = await this.service.registerUser({ name, email, password });
    return res.status(201).json(result);
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { body: { email, password } } = req;
    const result = await this.service.login({ email, password });
    if (!result) {
      return next({ status: 400, message: 'Invalid email or password' });
    }
    return res.status(200).json(result);
  };

  private getAllUsers = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.service.getAllUsers();
    return res.status(200).json(result);
  };

  private getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.getUserById(Number(id));
    if (!result) {
      return next({ status: 404, message: 'User does not exist' });
    }
    return res.status(200).json(result);
  };

}

export default UsersController;
