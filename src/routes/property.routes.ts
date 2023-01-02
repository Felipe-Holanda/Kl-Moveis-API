import { Router } from 'express';

import shapeVerify from '../schemas/shapeVerify.serializer';
import { registerPropertySchema } from '../schemas/schemas';

import verifyToken from '../middlewares/verifyToken.middleware';
import verifyPrivilleges from '../middlewares/verifyPrivilleges.middleware';
import propertyCreationMiddleware from '../middlewares/propertyCreation.middleware';
import categoryIdMiddleware from '../middlewares/categoryId.middleware';

import { registerPropertyController } from '../controllers/property.controller';
import { listPropertiesController } from '../controllers/property.controller';


const propertyRouter = Router();


propertyRouter.post('', shapeVerify(registerPropertySchema), verifyToken, verifyPrivilleges, categoryIdMiddleware, registerPropertyController);
propertyRouter.get('', listPropertiesController);

export default propertyRouter; 