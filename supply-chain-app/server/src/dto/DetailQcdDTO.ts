export class RequestCompanyParameters {
  type: string;
  companyId?: string;
  companyIds?: string[];
  relevantScore: string;
  categoryIds: string[];
  itemCategoryGroup: string[];
  itemNameIds: string[];
}

export interface CompanyParametersDTO {
  companyId: string;
  score: number;
  parameter: string;
  value: number;
  companyScoreList: number[];
  companyValueList: number[];
}

export interface ScoreList {
  updateDate: Date;
  score: number;
}

export interface ParameterListDTO {
  parameter: string;
  scoreList: ScoreList[];
}

export class QCDCompanyDTO {
  companyId: string;
  relevantScore: string;
  scoreList: Array<Object>;
}

export class QCDEvaluationDTO {
  companyId: string;
  parameter: string;
  scoreList: Array<Object>;
}

export class ResponseCompanyParametersDTO {
  companyDetail: CompanyParametersDTO[] = [];
  constructor(data: any) {
    this.companyDetail = data.map((element: any) => ({
      companyId: element.company_id,
      parameter: element.parameter,
      score: element.score,
      value: element.value,
      minValue: element.min_value,
      bottom25perValue: element.bottom_25per_value,
      medianValue: element.median_value,
      top25perValue: element.top_25per_value,
      maxValue: element.max_value,
      companyScoreList: element.companyScoreList,
      companyValueList: element.companyValueList
    }));
  }
}