import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import { listCategoryService } from "../services/categories/listCategory.service";
import listByCategoryService from "../services/categories/listByCategory.service";

export async function createCategoryController(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const category = await createCategoryService(name);
    return res.status(201).json(category);
}

export async function listCategoryController(req: Request, res: Response): Promise<Response> {
    const categories = await listCategoryService();
    return res.status(200).json(categories);
}

export async function listByCategoryController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const properties = await listByCategoryService(id);
    return res.status(200).json(properties);
}