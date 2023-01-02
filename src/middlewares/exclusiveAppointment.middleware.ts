import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../data-source';
import { QueryBuilder } from 'typeorm';
import { Schedules } from '../entities/schedules.entity';
import { AppError } from '../errors';
import jwt from "jsonwebtoken";
import 'dotenv/config';

export default async function exclusiveAppointmentMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const { sub } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as { sub: string };
        const { date, hour, propertieId } = req.body;

        //using querybuilder to check if has a appointment in the same date and hour

        const queryBuilder: QueryBuilder<Schedules> = AppDataSource.getRepository(Schedules).createQueryBuilder('schedules')
            .where('schedules.date = :date', { date })
            .andWhere('schedules.hour = :hour', { hour })
            .andWhere('schedules.propertieId = :propertieId', { propertieId })
            .andWhere('schedules.userId = :userId', { userId: sub });

        if (queryBuilder) throw new AppError('You already have an appointment in this date and hour', 400);
        return next();
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message });
    }
}