import { getRepository } from "typeorm";
import Helpers from '../utils/Helpers';
import { BlogPost } from "../database/models/BlogPost";
import { IPost } from "../Type";

interface test {
  title: string;
  content: string;
  user: number;
  published: Date;
  updated: Date;
}

export class BlogPostsService {
  private helpers: Helpers

  constructor() {
    this.helpers = new Helpers();
  }

  public async registerPost(id: number, postInfos: IPost) {
    const postRepository = getRepository(BlogPost);
    const newPost = this.helpers.postStructure(id, postInfos) as any;
    const post = postRepository.create(newPost);
    await postRepository.save(post);
    return post;
  }

  public async getAllPosts() {
    const postRepository = getRepository(BlogPost);
    const posts = await postRepository.find({ relations: ['categories'] });
    return posts;
  }

  public async getPostById(id: number) {
    const postRepository = getRepository(BlogPost);
    const post = await postRepository.findOne(id, { relations: ['categories'] });
    if (!post) return;
    return post;
  }

}

export default new BlogPostsService();
