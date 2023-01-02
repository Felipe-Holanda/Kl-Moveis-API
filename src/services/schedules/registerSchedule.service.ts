import { userRepository, schedulesRepository, propertyRepository } from "../../data-source";

import { AppError } from "../../errors";


export default async function createScheduleService(data, id) {

    const userExist = await userRepository.findOneBy({
        id: id,
    });

    const scheduleExist = await schedulesRepository.findOneBy({
        hour: data.hour,
        date: data.date
    });

    const propertyExist = await propertyRepository.findOneBy({
        id: data.propertyId,
    });

    const dateSchedule = new Date(data.date).getDay();

    const wrongHour: any = data.hour?.split(":");

    if (!userExist) {
        throw new AppError("User not exist", 404);
    }

    if (!propertyExist) {
        throw new AppError("propertie not exist", 404);
    }

    if (scheduleExist) {
        throw new AppError("Schedule already exist", 409);
    }

    if (parseInt(wrongHour[0]) <= 8) {
        throw new AppError("Wrong hour", 400);
    }

    if (parseInt(wrongHour[0]) >= 18) {
        throw new AppError("Wrong hour", 400);
    }

    if (dateSchedule == 6 || dateSchedule == 0) {
        throw new AppError("Invalid date", 400);
    }

    const toSchedule = schedulesRepository.create({
        date: data.date,
        hour: data.hour,

    });
    await schedulesRepository.save(toSchedule);

    return { message: "Successfully created!" };
};