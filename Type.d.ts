import UsersController from './controllers/UsersController';
import CategoriesController from './controllers/CategoriesController';
import { UsersService } from './services/UsersService';
import { CategoriesServices } from './services/CategoriesService';

interface IControllers {
  UsersController: UsersController;
  CategoriesController: CategoriesController;
}

type TUsersService = UsersService;

type TCategoriesServices = CategoriesServices;

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

interface ICategory {
  name: string;
}
