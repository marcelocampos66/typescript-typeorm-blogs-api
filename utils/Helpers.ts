import joi from 'joi';
import md5 from 'md5';
import { IUser, ICredentials, ICategory } from '../Type';

class Helpers {

  public hashPassword(password: string) {
    return md5(password);
  }

  public verifyUserInfosJoi = (infos: IUser) => (
    joi.object({
      name: joi.string().min(4).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    }).validate(infos)
  );

  public verifyUserCredentialsJoi = (credentials: ICredentials) => (
    joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    }).validate(credentials)
  );

  public verifyCategoryInfoJoi = (infos: ICategory) => (
    joi.object({
      name: joi.string().min(3).required(),
    }).validate(infos)
  );

}

export default Helpers;
