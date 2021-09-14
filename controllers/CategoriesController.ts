import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import { TCategoriesServices } from '../@Types/Type';

class CategoriesController extends Middlewares {
  public router: express.Router;
  private service: TCategoriesServices;

  constructor(CategoriesServices: TCategoriesServices) {
    super();
    this.router = express.Router();
    this.service = CategoriesServices;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', [
      this.validateJWT,
      this.verifyCategoryExists,
      this.verifyCategoryInfo,
      this.registerCategory,
    ]);
    this.router.get('/', [
      this.validateJWT,
      this.getAllCategories,
    ]);
    this.router.get('/:id', [
      this.validateJWT,
      this.getCategoryById,
    ]);
    this.router.put('/:id', [
      this.validateJWT,
      this.verifyCategoryInfo,
      this.updateCategoryById,
    ]);
    this.router.delete('/:id', [
      this.validateJWT,
      this.deleteCategoryById,
    ]);
  }

  private registerCategory = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { name } } = req;
    const result = await this.service.registerCategory({ name });
    return res.status(201).json(result);
  };

  private getAllCategories = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.service.getAllCategories();
    return res.status(200).json(result);
  };

  private getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.getCategoryById(Number(id));
    if (!result) {
      return next({ status: 404, message: 'This category does not exist' });
    }
    return res.status(200).json(result);
  };

  private updateCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id }, body: { name } } = req;
    const result = await this.service.updateCategoryById(Number(id), { name });
    if (!result) {
      return next({ status: 404, message: 'Category not found' });
    }
    return res.status(200).json(result);
  };

  private deleteCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.deleteCategoryById(Number(id));
    if (!result) {
      return next({ status: 404, message: 'This category does not exist' });
    }
    return res.status(200).json(result);
  };

}

export default CategoriesController;
