import { categoryRepository } from "../../data-source";
import { Category } from "../../entities/category.entity";

interface ICategoryResponse {
    id: string
    name: string
}

export default async function createCategoryService(name: string): Promise<ICategoryResponse> {
    const category = new Category();
    category.name = name;
    await categoryRepository.save(category);
    return { id: category.id, name: category.name }
}