import { getRepository } from "typeorm";
import Helpers from "../utils/Helpers";
import { Category } from "../database/models/Category";
import { ICategory } from "../Type";

export class CategoriesServices {
  private helpers: Helpers;

  constructor() {
    this.helpers = new Helpers();
  }

  public async registerCategory({ name }: ICategory) {
    const categoryRepository = getRepository(Category);
    const category = categoryRepository.create({ name });
    await categoryRepository.save(category);
    return category;
  }

  public async getAllCategories() {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    return categories;
  }

  public async getCategoryById(id: number) {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne(id);
    if (!category) return;
    return category;
  }

  public async updateCategoryById(id: number, newInfo: ICategory) {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne(id);
    if (!category) return;
    await categoryRepository.update(id, newInfo);
    const updatedCategory = await categoryRepository.findOne(id);
    return updatedCategory;
  }

  public async deleteCategoryById(id: number) {
    const categoryRepository = getRepository(Category);
    const result = await categoryRepository.delete(id);
    if (result.affected === 0) return;
    return { message: 'Category successfully deleted' };
  }

}

export default new CategoriesServices();
