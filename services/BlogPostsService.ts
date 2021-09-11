import { getRepository } from "typeorm";
import Helpers from '../utils/Helpers';
import { BlogPost } from "../database/models/BlogPost";
import { IPost } from "../Type";

export class BlogPostsService {
  private helpers: Helpers

  constructor() {
    this.helpers = new Helpers();
  }

  public async registerPost(id: number, postInfos: IPost) {
    const postRepository = getRepository(BlogPost);
    const newPost = this.helpers.postStructure(id, postInfos);
    console.log(newPost);
    const post = postRepository.create(newPost);
    // Deu ruim :(
  }

}

export default new BlogPostsService();
