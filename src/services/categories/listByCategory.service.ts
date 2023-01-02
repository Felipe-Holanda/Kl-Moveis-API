import { propertyRepository } from "../../data-source";

export default async function listByCategoryService(id: string) {
    const properties = await propertyRepository.find({
        where: { category: { id } },
        relations: ['address', 'category'],
    });
    return properties;
}