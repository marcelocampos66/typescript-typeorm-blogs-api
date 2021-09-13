import { getRepository } from "typeorm";
import Helpers from '../utils/Helpers';
import { BlogPost } from "../database/models/BlogPost";
import { Category } from "../database/models/Category";
import { IPost, IPostWithoutCategoryIds } from "../Type";

export class BlogPostsService {
  private helpers: Helpers

  constructor() {
    this.helpers = new Helpers();
  }

  public async registerPost(id: number, postInfos: IPost) {
    const postRepository = getRepository(BlogPost);
    const categoryRepository = getRepository(Category)
    const categories = await categoryRepository.findByIds(postInfos.categoryIds);
    const newPost = this.helpers.postStructure(id, postInfos, categories) as any;
    const post = postRepository.create(newPost);
    await postRepository.save(post);
    return post;
  }

  public async getAllPosts() {
    const postRepository = getRepository(BlogPost);
    const posts = await postRepository.find({
      relations: ['categories'],
    });
    return posts;
  }

  public async getPostById(id: number) {
    const postRepository = getRepository(BlogPost);
    const post = await postRepository.findOne(
      id,
      { relations: ['categories', 'user'] },
    );
    if (!post) return;
    return post;
  }

  public async updatePostById(id: number, newPostInfos: IPostWithoutCategoryIds) {
    const postRepository = getRepository(BlogPost);
    await postRepository.update(id, newPostInfos);
    const updatedPost = await postRepository.findOne(id, { relations: ['categories'] });
    return updatedPost;
  }

  public async deletePostById(id: number) {
    const postRepository = getRepository(BlogPost);
    const result = await postRepository.delete(id);
    if (result.affected === 0) return;
    return { message: 'Post successfully deleted' };
  }

}

export default new BlogPostsService();
