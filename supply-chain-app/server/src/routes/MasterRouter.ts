
import MasterController from '@/modules/master/MasterController';
import { AuthMiddlewares } from '@/middlewares/AuthMiddlewares';
import { Router } from 'express';

const router = Router();


router.post('/weight-info', AuthMiddlewares, MasterController.updateWeightInfo);
router.get('/weight-info', AuthMiddlewares,  MasterController.getByIdWeightInfo);
router.post('/setting-search-condition',AuthMiddlewares, MasterController.getSearchCondition);

export default router;
