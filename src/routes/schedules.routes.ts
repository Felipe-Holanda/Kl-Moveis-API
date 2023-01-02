import { Router } from 'express';

import shapeVerify from '../schemas/shapeVerify.serializer';
import { uuidValidate, createScheduleSchema } from '../schemas/schemas';

import verifyToken from '../middlewares/verifyToken.middleware';

import { listSchedulesController, registerScheduleController } from '../controllers/schedules.controllers';

const schedulesRouter = Router();

schedulesRouter.post('', shapeVerify(createScheduleSchema), verifyToken, registerScheduleController)
schedulesRouter.get('/properties/:id', shapeVerify(uuidValidate), verifyToken, listSchedulesController)

export default schedulesRouter;