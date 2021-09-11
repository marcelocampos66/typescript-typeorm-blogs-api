import UsersController from "./UsersController";
import CategoriesController from './CategoriesController';
import UsersService from '../services/UsersService';
import CategoriesServices from '../services/CategoriesService';

export default {
  UsersController: new UsersController(UsersService),
  CategoriesController: new CategoriesController(CategoriesServices),
};
