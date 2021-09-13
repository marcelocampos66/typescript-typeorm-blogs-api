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
    return res.status(200).json({ message: 'isso eh tudo pessoal!' });
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

}

export default BlogPostsController;
