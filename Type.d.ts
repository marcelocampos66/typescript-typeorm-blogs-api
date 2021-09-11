import UsersController from './controllers/UsersController';
import { UsersService } from './services/UsersService';

interface IControllers {
  UsersController: UsersController;
}

type TUsersService = UsersService;

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ICredentials {
  email: string;
  password: string;
}

interface ITokenPayload {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
