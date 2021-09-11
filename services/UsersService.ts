import 'dotenv/config';
import jwt from 'jsonwebtoken';
import typeorm, { getRepository } from "typeorm";
import Helpers from '../utils/Helpers';
import { User } from "../database/models/User";
import { ICredentials, IUser } from "../Type";

export class UsersService {
  // public manager: typeorm.Connection;s
  // public userRepository: typeorm.Repository<User>;
  private secret: jwt.Secret;
  private jwtConfig: jwt.SignOptions;
  private helpers: Helpers;

  constructor() {
    // this.manager = getConnectionManager().get();
    // this.userRepository = this.manager.getRepository(User);
    this.secret = process.env.JWT_SECRET as string;
    this.jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
    this.helpers = new Helpers();
  }

  private generateToken(newUser: User) {
    const { id, name, email } = newUser;
    return jwt.sign({ id, name, email }, this.secret, this.jwtConfig);
  }

  public async registerUser({ name, email, password }: IUser) {
    const userRepository = getRepository(User);
    const hashedPassword = this.helpers.hashPassword(password);
    const user = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(user);
    const token = this.generateToken(user);
    return { token };
  }

  public async login({ email, password }: ICredentials) {
    const userRepository = getRepository(User);
    const hashedPassword = this.helpers.hashPassword(password);
    const userWithHashPass = { email, password: hashedPassword };
    const user = await userRepository.findOne({ where: userWithHashPass });
    if (!user) return;
    const token = this.generateToken(user);
    return { token };
  }

  public async getAllUsers() {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return users;
  }

  public async getUserById(id: number) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) return;
    return user;
  }

}

export default new UsersService();
