import { userRepository, schedulesRepository, propertyRepository } from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";


export default async function createScheduleService(data, id) {
    const { date, hour, propetieId } = data;
    const user = await userRepository.findOneBy({ id });
    const property = await propertyRepository.findOneBy({ id: propetieId });

    const scheduling = new Schedules();
    scheduling.date = date;
    scheduling.hour = hour;
    scheduling.userId = user.id;
    scheduling.propertyId = property.id;

    const result = await schedulesRepository.save(scheduling);
};