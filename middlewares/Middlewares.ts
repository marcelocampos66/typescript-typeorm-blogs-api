import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Helpers from '../utils/Helpers';
import { User } from '../database/models/User';
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
  }

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
  }

}

export default Middlewares;
