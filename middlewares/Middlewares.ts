import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Helpers from '../utils/Helpers';
import { User } from '../database/models/User';
import { Category } from '../database/models/Category';
import { BlogPost } from '../database/models/BlogPost';
import { ITokenPayload } from '../Type';

class Middlewares {
  private helpers: Helpers;
  private secret: jwt.Secret;

  constructor() {
    this.helpers = new Helpers();
    this.secret = process.env.JWT_SECRET as string;
  }

  public validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { headers: { authorization } } = req;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const payload = jwt.verify(authorization, this.secret);
      if (!payload) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
      req.payload = payload as ITokenPayload;
      return next();
    } catch (e) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };

  public verifyUserExists = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { email } } = req;
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      return next({ status: 409, message: 'User already exists' });
    }
    return next();
  };

  public verifyUserInfos = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { name, email, password } } = req;
    const { error } = this.helpers.verifyUserInfosJoi({ name, email, password });
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  };

  public verifyUserCredentials = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { email, password } } = req;
    const { error } = this.helpers.verifyUserCredentialsJoi({ email, password });
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  };

  public verifyCategoryInfo = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { name } } = req;
    const { error } = this.helpers.verifyCategoryInfoJoi({ name });
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  };

  public verifyCategoryExists = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { name } } = req;
    const categoryRepository = getRepository(Category);
    const userExists = await categoryRepository.findOne({ where: { name } });
    if (userExists) {
      return next({ status: 409, message: 'Category already exists' });
    }
    return next();
  }

  public verifyPostInfos = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { title, content, categoryIds } } = req;
    const { error } = this.helpers.verifyPostInfosJoi(
      { title, content, categoryIds },
    );
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  };

  public verifyCategoryIds = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { categoryIds } } = req;
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    const ids = categories.map(({ id }) => id);
    const result = categoryIds.every((id: number) => ids.includes(id));
    if (!result) {
      return next({ status: 400, message: 'Some "categoryIds" not found' });
    }
    return next();
  };

  public verifyPostExists = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const postRepository = getRepository(BlogPost);
    const post = await postRepository.findOne({ where: { id } });
    if (!post) {
      return next({ status: 404, message: 'Post not found' });
    }
    return next();
  };

}

export default Middlewares;
