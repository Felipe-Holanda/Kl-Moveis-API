import { propertyRepository, addressRepository } from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Property } from "../../entities/property.entity";

export default async function registerPropertyService(data) {
    const address = new Address();
    address.district = data.address.district;
    address.city = data.address.city;
    address.state = data.address.state;
    address.zipCode = data.address.zipCode;
    address.number = data.address.number;

    const created = await addressRepository.save(address);

    const property = new Property();
    property.value = data.value;
    property.size = data.size;
    property.category = data.categoryId;
    property.address = created;

    const createdProperty = await propertyRepository.save(property);

    return createdProperty;
}