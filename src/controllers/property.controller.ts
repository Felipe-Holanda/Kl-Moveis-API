import { Request, Response } from "express";

import registerPropertyService from "../services/property/registerProperty.service";
import listPropertiesService from "../services/property/listProperties.service";

export async function registerPropertyController(req: Request, res: Response): Promise<Response> {
    const property = await registerPropertyService(req.body);
    return res.status(201).json(property);
}

export async function listPropertiesController(req: Request, res: Response): Promise<Response> {
    const response = await listPropertiesService();
    return res.status(200).json(response);
}