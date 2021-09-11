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
    return res.status(200).json({});
  };

}

export default BlogPostsController;
