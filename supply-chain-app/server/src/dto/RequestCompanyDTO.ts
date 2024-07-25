export class RequestCompanyInfo {
  companyInformations: CompanyInfoDTO[];
}
export class CompanyInfoDTO {
  companyId: string;
  companyName: string;
  headquartersLocation: string;
  locationArea: string;
  capital: string;
  businessTypeId: string;
  businessTypeName: string;
  regularCustomer: string;
  establishmentYear: string;
  numberOfEmployees: string;
  representative: string;
  sales: string;
  operatingProfit: string;
  capitalRatio: string;
}
