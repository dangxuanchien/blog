import RestIfController from '@/modules/restIf/RestIFController';
import { Router } from 'express';

const router = Router();

router.post('/companies', RestIfController.addCompanyInfor);
router.post('/transactions', RestIfController.addTransactionInfor);
router.post('/evaluation-data', RestIfController.insertEvaluationData);
router.get('/items-information', RestIfController.categories);

export default router;
