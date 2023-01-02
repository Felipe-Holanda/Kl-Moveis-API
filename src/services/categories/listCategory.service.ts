import { categoryRepository } from "../../data-source";

export const listCategoryService = async () => {
    const categories = await categoryRepository.find();
    return categories;
};