import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import { TBlogPostsService } from '../Type';

class BlogPostsController extends Middlewares {
  public router: express.Router;
  private service: TBlogPostsService;

  constructor(BlogPostsService: TBlogPostsService) {
    super();
    this.router = express.Router();
    this.service = BlogPostsService
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', [
      this.validateJWT,
      this.verifyPostInfos,
      this.verifyCategoryIds,
      this.registerPost,
    ]);
    this.router.get('/', [
      this.validateJWT,
      this.getAllPosts,
    ]);
    this.router.get('/:id', [
      this.validateJWT,
      this.verifyPostExists,
      this.getPostById,
    ]);
    this.router.put('/:id', [
      this.validateJWT,
      this.verifyPostExists,
      this.verifyPostOwner,
      this.updatePostById,
    ]);
    this.router.delete('/:id', [
      this.validateJWT,
      this.verifyPostOwner,
      this.deletePostById,
    ]);
  }

  private registerPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { body: { title, content, categoryIds }, payload: { id } } = req;
    const result = await this.service.registerPost(
      id,
      { title, content, categoryIds },
    );
    return res.status(200).json(result);
  };

  private getAllPosts = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.service.getAllPosts();
    return res.status(200).json(result);
  };

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.getPostById(Number(id));
    if (!result) {
      return next({ status: 404, message: 'No posts found' });
    }
    return res.status(200).json(result);
  };

  private updatePostById = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { title, content }, params: { id } } = req;
    const result = await this.service.updatePostById(
      Number(id),
      { title, content }
    );
    return res.status(200).json(result);
  };

  private deletePostById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.deletePostById(Number(id));
    if (!result) {
      return next({ status: 404, message: 'This post does not exist' });
    }
    return res.status(200).json(result);
  };

}

export default BlogPostsController;
