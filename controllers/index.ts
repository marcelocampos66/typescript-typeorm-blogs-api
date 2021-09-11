import UsersController from "./UsersController";
import UsersService from '../services/UsersService';

export default {
  UsersController: new UsersController(UsersService),
};
