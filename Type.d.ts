import UsersController from './controllers/UsersController';
import CategoriesController from './controllers/CategoriesController';
import BlogPostsController from './controllers/BlogPostsController';
import { UsersService } from './services/UsersService';
import { CategoriesServices } from './services/CategoriesService';
import { BlogPostsService } from './services/BlogPostsService';

interface IControllers {
  UsersController: UsersController;
  CategoriesController: CategoriesController;
  BlogPostsController: BlogPostsController;
}

type TUsersService = UsersService;

type TCategoriesServices = CategoriesServices;

type TBlogPostsService = BlogPostsService;

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

interface IPost {
  title: string;
  content: string;
  categoryIds: Array<number>;
}

interface IPostWithoutCategoryIds {
  title: string;
  content: string;
}
