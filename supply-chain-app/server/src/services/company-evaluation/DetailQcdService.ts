import { ParameterListDTO, QCDCompanyDTO, RequestCompanyParameters, ResponseCompanyParametersDTO } from '@/dto/DetailQcdDTO';
import { EvaluationDetailItem } from '@/databases/postgresql/entities/EvaluationDetailItem';
import { EvaluationDetailItemCategory } from '@/databases/postgresql/entities/EvaluationDetailItemCategory';
import { EvaluationDetailItemCategoryGroup } from '@/databases/postgresql/entities/EvaluationDetailItemCategoryGroup';
import { EvaluationResultItem } from '@/databases/postgresql/entities/EvaluationResultItem';
import { EvaluationResultItemCategory } from '@/databases/postgresql/entities/EvaluationResultItemCategory';
import { EvaluationResultItemCategoryGroup } from '@/databases/postgresql/entities/EvaluationResultItemCategoryGroup';
import DetailQcdRepository from '@/databases/postgresql/repository/DetailQcd.repository';
import { getTableName } from '@/utils/commonUtils';

export interface CompanyParameter {
  parameter: string;
  score: number;
  company_id: string;
  value: number;
}

export interface QcdParameter {
  score: number;
  parameter: string;
  updateDate: Date;
}
class DetailQcdService {
  async getParameters(data: RequestCompanyParameters): Promise<any> {
    // Detect array condition search to specify entity
    const tableName = getTableName(data.type);
    const conditionSearch = this.getItemCategoryGroup(data);

    // get data from db
    const [companyParameters, parametersOfAllCompany] = await Promise.all([
      DetailQcdRepository.getCompanyParameters(data.companyId, data.relevantScore, tableName, conditionSearch),
      DetailQcdRepository.getParametersOfAllCompany(data.companyId, data.companyIds, data.relevantScore, tableName),
    ]);

    const result = companyParameters.map((item) => {
      return {
        ...item,
        companyScoreList: [],
        companyValueList: [],
      };
    });

    // Filter data
    companyParameters.forEach((element, index) => {
      parametersOfAllCompany.forEach((item) => {
        if (element.parameter === item.parameter) {
          result[index] = {
            ...result[index],
            companyScoreList: [...result[index]?.companyScoreList, item.score],
            companyValueList: [...result[index]?.companyValueList, item.value],
          };
        }
      });
    });
    return new ResponseCompanyParametersDTO(result);
  }

  getEntityByType = (type: string) => {
    let entityRelevant;
    let entityParameter;
    switch (type) {
      case 'ItemName':
        entityRelevant = EvaluationResultItem;
        entityParameter = EvaluationDetailItem;
        break;
      case 'Category':
        entityRelevant = EvaluationResultItemCategory;
        entityParameter = EvaluationDetailItemCategory;
        break;
      case 'Group':
        entityRelevant = EvaluationResultItemCategoryGroup;
        entityParameter = EvaluationDetailItemCategoryGroup;
        break;
      default:
        break;
    }
    return { entityRelevant, entityParameter };
  };

   getItemCategoryGroup = (data: RequestCompanyParameters) => {
    const { itemCategoryGroup, categoryIds, itemNameIds } = data;
  
    const conditionQuery = [
      ...(itemCategoryGroup && itemCategoryGroup.length > 0
        ? [`and item_category_group_id in ('${itemCategoryGroup.join("','")}')`]
        : []),
      ...(categoryIds && categoryIds.length > 0
        ? [`item_category_id in ('${categoryIds.join("','")}')`]
        : []),
      ...(itemNameIds && itemNameIds.length > 0
        ? [`item_id in ('${itemNameIds.join("','")}')`]
        : [])
    ]
    .filter(q => q !== '').join(' and ');
  
    return conditionQuery;
  };

  async qcdRelevant(data: any): Promise<any> {
    let { companyId, relevantScore, type } = data;
    const entity = this.getEntityByType(type);
    
    const records = await DetailQcdRepository.getDataRelevantChart(data, entity.entityRelevant, type);
    const scoreList: Array<QCDCompanyDTO> = [];
    const result = records.map((record: { updateDate: any; qualityScore: any; costScore: any; deliveryScore: any }) => {
      switch (relevantScore) {
        case 'quality_score':
          return {
            updateDate: record.updateDate,
            score: record.qualityScore,
          };
        case 'cost_score':
          return {
            updateDate: record.updateDate,
            score: record.costScore,
          };
        case 'delivery_score':
          return {
            updateDate: record.updateDate,
            score: record.deliveryScore,
          };
        default:
          break;
      }
    });
    
    scoreList.push({
      companyId: companyId,
      relevantScore: relevantScore,
      scoreList: result,
    });
    return scoreList;
  }

  async qcdParameter(data: any): Promise<any> {
    let { type } = data;
    const entity = this.getEntityByType(type);
    const records: QcdParameter[] = await DetailQcdRepository.getDataParameterChart(data, entity.entityParameter, type);

    const getParameterOfCompany = (raw: QcdParameter[]): ParameterListDTO[] => {
      return raw.reduce((accumulator, currVal) => {
        const parameter = currVal.parameter;
  
        // Check if the current parameter already exists in the accumulator
        let indexDuplicateParameterName = accumulator.findIndex((item) => item.parameter === currVal.parameter);
  
        // If it doesn't exist, add it
        if (indexDuplicateParameterName == -1) {
          let temp = {
            parameter,
            scoreList: [
              {
                updateDate: currVal.updateDate,
                score: currVal.score,
              },
            ],
          };
  
          accumulator.push(temp);
          // Otherwise, add the value to the existing parameter
        } else {
          accumulator[indexDuplicateParameterName] = {
            ...accumulator[indexDuplicateParameterName],
            scoreList: [
              ...accumulator[indexDuplicateParameterName].scoreList,
              {
                updateDate: currVal.updateDate,
                score: currVal.score,
              },
            ],
          };
        }
        return accumulator;
      }, []);
    }

    const companyParameters = getParameterOfCompany(records);
    return companyParameters;
  }
}
export default new DetailQcdService();
