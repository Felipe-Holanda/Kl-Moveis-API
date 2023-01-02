import { AppError } from "../errors";
import { categoryRepository } from "../data-source";
import { Request, Response, NextFunction } from "express";

export default async function verifyIdMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const { categoryId } = req.body;
        const category = await categoryRepository.findOneBy({ id: categoryId })
        if (!category) throw new AppError('Category not found', 404);
        return next();
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message });
    }
}