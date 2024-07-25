
export class RequestSearchCompanyDTO {
  itemCategoryGroup: Array<string>;
  itemCategory: Array<string>;
  itemName: Array<string>;
  keyWord: string;

  // 8 score
  qualityScore: number;
  costScore: number;
  deliveryScore: number;
  financeScore: number;
  environmentScore: number;
  laborScore: number;
  ethicsScore: number;
  sustainableScore: number;

  // 8 weight
  qualityWeight: number;
  costWeight: number;
  deliveryWeight: number;
  financeWeight: number;
  environmentWeight: number;
  laborWeight: number;
  ethicsWeight: number;
  sustainableWeight: number;
}

export class ResponseCompanyDTO {
  companyId: string;
  companyName: string;
  headquartersLocation: string;
  locationArea: string;
  sales: string;
  businessTypeCode: string;
  businessTypeName: string;
  capital: string;
  regularCustomer: string;
  establishmentYear: string;
  numberOfEmployees: string;
  representative: string;
  operatingProfit: string;
  capitalRatio: string;
  companyIntroduction: string;
  hpLink: string;
  imagePath: string;
  staffMessage: string;
  updateDate: string;
  updateYear: string;
  
  // item Information
  items: Array<ResponseItem>;
  originalItemNames: Array<ResponseItem>;
  itemCategories: Array<string>;
  itemCategoryGroups: Array<string>;

  // evaluation score
  qualityScore: number;
  costScore: number;
  deliveryScore: number;
  financeScore: number;
  environmentScore: number;
  laborScore: number;
  ethicsScore: number;
  sustainableScore: number;

}


export class ResponseItem {
  itemId: string;
  itemName: string;
}