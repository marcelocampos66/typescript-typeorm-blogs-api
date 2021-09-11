import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import { TUsersService } from '../Type';

class UsersController extends Middlewares {
  public router: express.Router;
  private service: TUsersService;

  constructor(UsersService: TUsersService) {
    super();
    this.router = express.Router();
    this.service = UsersService;
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.post('/login', [
      this.verifyUserCredentials,
      this.login,
    ]);
    this.router.post('/register', [
      this.verifyUserInfos,
      this.verifyUserExists,
      this.registerUser,
    ]);
    this.router.get('/', [
      this.validateJWT,
      this.getAllUsers,
    ]);
    this.router.get('/:id', [
      this.validateJWT,
      this.getUserById,
    ]);
    this.router.put('/self-update', [
      this.validateJWT,
      this.updateUser,
    ]);
    this.router.delete('/me', [
      this.validateJWT,
      this.deleteUser,
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

  private updateUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { name, email, password }, payload: { id } } = req;
    const result = await this.service
      .updateUserById(id, { name, email, password });
    return res.status(200).json(result);
  };

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { payload: { id } } = req;
    const result = await this.service.deleteUserById(id);
    if (!result) {
      return next({ status: 404, message: 'This category does not exist' });
    }
    return res.status(200).json(result);
  };

}

export default UsersController;
