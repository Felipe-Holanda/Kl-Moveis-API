import { propertyRepository } from "../../data-source";

export default async function listPropertiesService() {
    const properties = await propertyRepository.find({ relations: ['address', 'category'], });
    return properties;
}