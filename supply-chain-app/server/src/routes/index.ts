import { Router } from 'express';
import AuthRouter from './AuthRouter';
import SearchConditionsRouter from './CompanyEvaluationRouter';
import RestIFRouter from './RestIFRouter';
import MasterRouter from './MasterRouter';
const router = Router();

router.use('/auth', AuthRouter);
router.use('/company-evaluation', SearchConditionsRouter);
router.use('/master', MasterRouter);
router.use('/rest-if', RestIFRouter);

export default router;
