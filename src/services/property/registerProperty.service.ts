import { propertyRepository, categoryRepository, addressRepository } from "../../data-source";
import { AppError } from "../../errors";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertiesService = async (data: IPropertyRequest) => {

    const categExist = await categoryRepository.findOneBy({
        id: data.categoryId,
    });

    const addressExist = await addressRepository.findOneBy({
        zipCode: data.address.zipCode,
    });

    if (!categExist) {
        throw new AppError("Categorie not exist", 404);
    }

    if (data.address.state.length > 2) {
        throw new AppError(
            "Cannot be registered with state more than 2 digits",
            400
        );
    }

    if (data.address.zipCode.length > 8) {
        throw new AppError(
            "Cannot be registered with zipcode more than 8 digits",
            400
        );
    }

    if (addressExist) {
        throw new AppError("Address already exist", 409);
    }

    const createAddres = addressRepository.create(data.address);
    await addressRepository.save(createAddres);

    const dataProps = {
        address: createAddres,
        category: categExist,
        size: data.size,
        value: data.value,
    };

    const props = propertyRepository.create(dataProps);

    await propertyRepository.save(props);

    return props;
};

export default createPropertiesService;