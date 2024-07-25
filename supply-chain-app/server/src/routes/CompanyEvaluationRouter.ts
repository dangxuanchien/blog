
import { AuthMiddlewares } from '@/middlewares/AuthMiddlewares';
import { Router } from 'express';
import CompanyEvaluationController from '../modules/company-evaluation/CompanyEvaluationController';

const router = Router();

router.post('/search-company', AuthMiddlewares, CompanyEvaluationController.searchCompany);
router.post('/price-compare', AuthMiddlewares, CompanyEvaluationController.priceCompare);
router.post('/detail-companies', AuthMiddlewares, CompanyEvaluationController.detailCompany);
router.post('/parameter-detail', AuthMiddlewares, CompanyEvaluationController.achivementDetails);
router.post('/details-qcd/qcd-relevant', AuthMiddlewares, CompanyEvaluationController.qcdRelevant);
router.post('/details-qcd/qcd-parameter', AuthMiddlewares, CompanyEvaluationController.qcdParameter);
router.post('/details-qcd/get-parameter', AuthMiddlewares, CompanyEvaluationController.getParameters);


export default router;
