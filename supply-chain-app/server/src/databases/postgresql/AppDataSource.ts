import ConfigEnv from '@/common/configs/ConfigEnv';
import path from 'path';
import { DataSource } from 'typeorm';
import { BusinessTypeInfomation } from './entities/BusinessTypeInfomation';
import { CompanyInformation } from './entities/CompanyInformation';
import { EvaluationDetailItem } from './entities/EvaluationDetailItem';
import { EvaluationDetailItemCategory } from './entities/EvaluationDetailItemCategory';
import { EvaluationDetailItemCategoryGroup } from './entities/EvaluationDetailItemCategoryGroup';
import { EvaluationResultItemCategoryGroup } from './entities/EvaluationResultItemCategoryGroup';
import { EvaluationResultItem } from './entities/EvaluationResultItem';
import { EvaluationResultItemCategory } from './entities/EvaluationResultItemCategory';
import { ItemCategoryGroupInformation } from './entities/ItemCategoryGroupInformation';
import { ItemCategoryInformation } from './entities/ItemCategoryInformation';
import { ItemInformation } from './entities/ItemInformation';
import { TransactionInformation } from './entities/TransactionInformation';
import { UserMaster } from './entities/UserMaster';
import { WeightMaster } from './entities/WeightMaster';

export const AppDataSource = new DataSource({
  ...ConfigEnv.postgresConfig,
  entities: [
    ItemCategoryGroupInformation,
    BusinessTypeInfomation,
    CompanyInformation,
    EvaluationDetailItem,
    EvaluationResultItem,
    EvaluationDetailItemCategory,
    EvaluationResultItemCategoryGroup,
    EvaluationDetailItemCategoryGroup,
    EvaluationResultItemCategory,
    ItemCategoryInformation,
    ItemInformation,
    TransactionInformation,
    UserMaster,
    WeightMaster
  ],
});
