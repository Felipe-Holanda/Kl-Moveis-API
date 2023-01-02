import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { propertyRepository } from '../data-source';
import { Like } from 'typeorm';

export default function propertyCreationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const existentProperty = propertyRepository.findOne({ where: { address: Like(req.body.address) }, relations: ['address'] });

        return next();
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message })
    }

}