import { Request, Response } from 'express';

import listSchedulesService from '../services/schedules/listSchedule.service';
import registerScheduleService from '../services/schedules/registerSchedule.service';

export async function registerScheduleController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const schedule = await registerScheduleService(req.body, id);
    return res.status(201).json(schedule);
}

export async function listSchedulesController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await listSchedulesService(id);
    return res.status(200).json(response);
}

