import { propertyRepository } from "../../data-source";
import { AppError } from "../../errors";

export default async function listSchedulesService(id: string) {

    const property = await propertyRepository.findOneBy({ id });

    if (!property) throw new AppError("Schedule does not exist", 404);

    const schedules = await propertyRepository.findOne({
        relations: { schedules: true },
        where: { id },
    });

    return schedules;
};
