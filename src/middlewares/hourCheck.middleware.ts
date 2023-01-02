import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export default function hourCheckMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
    try {
        const { hour } = req.body;
        const hourRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
        if (!hourRegex.test(hour)) throw new AppError('Invalid hour', 400);

        const hourNumber = Number(hour.split(':')[0]);
        if (hourNumber < 8 || hourNumber >= 18) throw new AppError('Invalid hour', 400);
        return next();
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message });
    }
}