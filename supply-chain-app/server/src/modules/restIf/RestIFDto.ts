import { BusinessTypeInfomation } from '@/databases/postgresql/entities/BusinessTypeInfomation';
import { CompanyInformation } from '@/databases/postgresql/entities/CompanyInformation';
import { EvaluationDetailItem } from '@/databases/postgresql/entities/EvaluationDetailItem';
import { EvaluationDetailItemCategory } from '@/databases/postgresql/entities/EvaluationDetailItemCategory';
import { EvaluationDetailItemCategoryGroup } from '@/databases/postgresql/entities/EvaluationDetailItemCategoryGroup';
import { EvaluationResultItem } from '@/databases/postgresql/entities/EvaluationResultItem';
import { EvaluationResultItemCategory } from '@/databases/postgresql/entities/EvaluationResultItemCategory';
import { EvaluationResultItemCategoryGroup } from '@/databases/postgresql/entities/EvaluationResultItemCategoryGroup';
import { ItemInformation } from '@/databases/postgresql/entities/ItemInformation';
import { TransactionInformation } from '@/databases/postgresql/entities/TransactionInformation';
import { stringToNumber } from '@/utils/commonUtils';
import { CompanyInfoDTO } from '../../dto/RequestCompanyDTO';
import { TransactionInfoDTO } from '../../dto/RequestTransactionDTO';

export class CompanyInformationDto extends CompanyInformation {
  constructor(data: CompanyInfoDTO, index: number) {
    super();
    const now = new Date();
    this.companyId = data.companyId;
    this.businessTypeId = data.businessTypeId;
    this.companyName = data.companyName;
    this.headquartersLocation = data.headquartersLocation;
    this.locationArea = data.locationArea;
    this.capital = stringToNumber(data.capital);
    this.regularCustomer = data.regularCustomer;
    this.establishmentYear = stringToNumber(data.establishmentYear);
    this.numberOfEmployees = stringToNumber(data.numberOfEmployees);
    this.representative = data.representative;
    this.sales = stringToNumber(data.sales);
    this.operatingProfit = stringToNumber(data.operatingProfit);
    this.capitalRatio = stringToNumber(data.capitalRatio);
    this.companyIntroduction = '・得意製品、企業取組';
    this.hpLink = 'https://www.chusho.meti.go.jp/zoomup/index.html';
    this.imagePath = 'com-img-624714.4';
    this.staffMessage = 'Ｘｘｘｘが得意な会社です．是非活用ください';
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}

export class CompanyInforAndBusinessDto {
  companyInformationList: CompanyInformationDto[];
  businessTypeInformationList: BusinessTypeInfomation[] = [];

  constructor(data: CompanyInfoDTO[]) {
    this.companyInformationList = data.map((item, index) => {
      const businessType = new BusinessTypeInfomation();
      businessType.businessTypeId = item.businessTypeId;
      businessType.businessTypeName = item.businessTypeName;
      if (!this.businessTypeInformationList.find((bTI) => bTI.businessTypeId === item.businessTypeId)) {
        this.businessTypeInformationList.push(businessType);
      }
      return new CompanyInformationDto(item, index);
    });
  }
}

export class TransactionInformationDto extends TransactionInformation {
  constructor(data: TransactionInfoDTO, itemInfor: ItemInformation, index: number) {
    super();
    const now = new Date();
    this.buyerCompanyId = data.buyerCompanyId;
    this.vendorCompanyId = data.vendorCompanyId;
    this.itemId = itemInfor.itemId;
    this.originalItemName = data.originalItemName;
    this.proposedPrice = stringToNumber(data.proposedPrice);
    this.actualPrice = stringToNumber(data.actualPrice);
    this.orderQuantity = stringToNumber(data.orderQuantity);
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}

interface EvaluationDetailItemCategoryGroupRaw {
  companyId: string;
  itemCategoryGroupId: string;
  relevantScore: string;
  score: string;
  parameter: string;
  value: string;
  minValue: string;
  bottom25perValue: string;
  medianValue: string;
  top25perValue: string;
  maxValue: string;
}
interface EvaluationDetailItemCategoryRaw extends EvaluationDetailItemCategoryGroupRaw {
  itemCategoryId: string;
}
interface EvaluationDetailItemRaw extends EvaluationDetailItemCategoryRaw {
  itemId: string;
}

interface EvaluationResultItemCategoryGroupRaw {
  companyId: string;
  itemCategoryGroupId: string;
  qualityScore: string;
  costScore: string;
  deliveryScore: string;
  financeScore: string;
  environmentScore: string;
  laborScoret: string;
  ethicsScore: string;
  sustainableScore: string;
}
interface EvaluationResultItemCategoryRaw extends EvaluationResultItemCategoryGroupRaw {
  itemCategoryId: string;
}
interface EvaluationResultItemRaw extends EvaluationResultItemCategoryRaw {
  itemId: string;
}

export class EvaluationDataDto {
  evaluationDetailItem: EvaluationDetailItemRaw[];
  evaluationDetailItemCategory: EvaluationDetailItemCategoryRaw[];
  evaluationDetailItemCategoryGroup: EvaluationDetailItemCategoryGroupRaw[];
  evaluationResultItem: EvaluationResultItemRaw[];
  evaluationResultItemCategory: EvaluationResultItemCategoryRaw[];
  evaluationResultItemCategoryGroup: EvaluationResultItemCategoryGroupRaw[];
}

export class EvaluationDetailItemCategoryGroupDTO extends EvaluationDetailItemCategoryGroup {
  constructor(data: EvaluationDetailItemCategoryGroupRaw, index: number) {
    super();
    const now = new Date();
    this.companyId = data.companyId;
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.relevantScore = data.relevantScore;
    this.score = stringToNumber(data.score);
    this.parameter = data.parameter;
    this.value = stringToNumber(data.value);
    this.minValue = stringToNumber(data.minValue);
    this.bottom25perValue = stringToNumber(data.bottom25perValue);
    this.medianValue = stringToNumber(data.medianValue);
    this.top25perValue = stringToNumber(data.top25perValue);
    this.maxValue = stringToNumber(data.maxValue);
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}

export class EvaluationDetailItemCategoryDTO extends EvaluationDetailItemCategory {
  constructor(data: EvaluationDetailItemCategoryRaw, index: number) {
    super();
    const now = new Date();
    this.companyId = data.companyId;
    this.itemCategoryId = data.itemCategoryId;
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.relevantScore = data.relevantScore;
    this.score = stringToNumber(data.score);
    this.parameter = data.parameter;
    this.value = stringToNumber(data.value);
    this.minValue = stringToNumber(data.minValue);
    this.bottom25perValue = stringToNumber(data.bottom25perValue);
    this.medianValue = stringToNumber(data.medianValue);
    this.top25perValue = stringToNumber(data.top25perValue);
    this.maxValue = stringToNumber(data.maxValue);
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}

export class EvaluationDetailItemDTO extends EvaluationDetailItem {
  constructor(data: EvaluationDetailItemRaw, index: number) {
    super();
    const now = new Date();
    this.companyId = data.companyId;
    this.itemCategoryId = data.itemCategoryId;
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.itemId = data.itemId;
    this.relevantScore = data.relevantScore;
    this.score = stringToNumber(data.score);
    this.parameter = data.parameter;
    this.value = stringToNumber(data.value);
    this.minValue = stringToNumber(data.minValue);
    this.bottom25perValue = stringToNumber(data.bottom25perValue);
    this.medianValue = stringToNumber(data.medianValue);
    this.top25perValue = stringToNumber(data.top25perValue);
    this.maxValue = stringToNumber(data.maxValue);
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}

export class EvaluationResultItemCategoryGroupDTO extends EvaluationResultItemCategoryGroup {
  constructor(data: EvaluationResultItemCategoryGroupRaw, index: number) {
    super();
    const now = new Date();
    this.companyId = data.companyId;
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.qualityScore = stringToNumber(data.qualityScore);
    this.costScore = stringToNumber(data.costScore);
    this.deliveryScore = stringToNumber(data.deliveryScore);
    this.financeScore = stringToNumber(data.financeScore);
    this.environmentScore = stringToNumber(data.environmentScore);
    this.laborScore = stringToNumber(data.laborScoret);
    this.ethicsScore = stringToNumber(data.ethicsScore);
    this.sustainableScore = stringToNumber(data.sustainableScore);
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}

export class EvaluationResultItemCategoryDTO extends EvaluationResultItemCategory {
  constructor(data: EvaluationResultItemCategoryRaw, index: number) {
    super();
    const now = new Date();
    this.companyId = data.companyId;
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.itemCategoryId = data.itemCategoryId;
    this.qualityScore = stringToNumber(data.qualityScore);
    this.costScore = stringToNumber(data.costScore);
    this.deliveryScore = stringToNumber(data.deliveryScore);
    this.financeScore = stringToNumber(data.financeScore);
    this.environmentScore = stringToNumber(data.environmentScore);
    this.laborScore = stringToNumber(data.laborScoret);
    this.ethicsScore = stringToNumber(data.ethicsScore);
    this.sustainableScore = stringToNumber(data.sustainableScore);
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}

export class EvaluationResultItemDTO extends EvaluationResultItem {
  constructor(data: EvaluationResultItemRaw, index: number) {
    super();
    const now = new Date();
    this.itemId = data.itemId;
    this.companyId = data.companyId;
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.itemCategoryId = data.itemCategoryId;
    this.qualityScore = stringToNumber(data.qualityScore);
    this.costScore = stringToNumber(data.costScore);
    this.deliveryScore = stringToNumber(data.deliveryScore);
    this.financeScore = stringToNumber(data.financeScore);
    this.environmentScore = stringToNumber(data.environmentScore);
    this.laborScore = stringToNumber(data.laborScoret);
    this.ethicsScore = stringToNumber(data.ethicsScore);
    this.sustainableScore = stringToNumber(data.sustainableScore);
    this.updateDate = new Date(now.getTime() + index);
    this.updateYear = now.getFullYear();
  }
}
