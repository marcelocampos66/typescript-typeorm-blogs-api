import UsersController from "./UsersController";
import CategoriesController from './CategoriesController';
import BlogPostsController from "./BlogPostsController";
import UsersService from '../services/UsersService';
import CategoriesServices from '../services/CategoriesService';
import BlogPostsService from '../services/BlogPostsService';

export default {
  UsersController: new UsersController(UsersService),
  CategoriesController: new CategoriesController(CategoriesServices),
  BlogPostsController: new BlogPostsController(BlogPostsService),
};
