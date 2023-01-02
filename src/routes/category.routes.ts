import { Router } from 'express';

import { createCategorySchema } from '../schemas/schemas';
import shapeVerify from '../schemas/shapeVerify.serializer';

import verifyToken from '../middlewares/verifyToken.middleware';
import verifyPrivilleges from '../middlewares/verifyPrivilleges.middleware';
import categoryCreationMiddleware from '../middlewares/categoryCreation.middleware';
import seekForIdMiddleware from '../middlewares/seekForId.middleware';
import { uuidValidate } from '../schemas/schemas';

import { createCategoryController, listCategoryController, listByCategoryController } from '../controllers/category.controllers';

export const categoryRouter = Router();

categoryRouter.post('', shapeVerify(createCategorySchema), verifyToken, verifyPrivilleges, categoryCreationMiddleware, createCategoryController);
categoryRouter.get('', listCategoryController);
categoryRouter.get('/:id/properties', shapeVerify(uuidValidate), seekForIdMiddleware, listByCategoryController);

export default categoryRouter;