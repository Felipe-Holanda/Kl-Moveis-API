import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { categoryRepository } from '../data-source';
import { propertyRepository } from '../data-source';

export default async function seekForIdMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const { id } = req.params;
        const category = await categoryRepository.findOneBy({ id })
        if (!category) throw new AppError('Category not found', 404);
        return next();
    } catch (err) {
        console.log(err)
        return res.status(err.status || 400).json({ message: err.message });
    }
}