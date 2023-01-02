import { Request, Response, NextFunction } from "express";
import { categoryRepository } from "../data-source";
import { AppError } from "../errors";

export default async function categoryCreationMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const { name } = req.body;
        if (!name) throw new AppError("Name is required", 400);
        const category = await categoryRepository.find()

        category.forEach((category) => {
            let categoryName = category.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
            let nameToCompare = name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

            if (categoryName === nameToCompare) throw new AppError("Category already exists", 409);

        })

        return next();
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message });
    }
}
