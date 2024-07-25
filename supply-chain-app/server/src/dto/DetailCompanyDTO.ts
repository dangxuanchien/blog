import { CompanyInformation } from "@/databases/postgresql/entities/CompanyInformation";

export class RequestSearchDetailCompanyDTO {
  type: string;
  data: RequestDetailCompanyDTO;
}


export class RequestDetailCompanyDTO {

    // companyId
    companies: Array<CompanyInformation>
    itemCategoryGroupIds: Array<string>
    categoryIds: Array<string>
    itemIds: Array<string>

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

export class ResponseDetailCompanyDTO {
    companyId: string;
    companyName: string;
    headquartersLocation: string;
    locationArea: string;
    sales: string;
    businessTypeName: string;
    businessTypeCode: string;
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
  
    // evaluation score
    qualityScore: number;
    costScore: number;
    deliveryScore: number;
    financeScore: number;
    environmentScore: number;
    laborScore: number;
    ethicsScore: number;
    sustainableScore: number;

    // overal Score
    overalScore: number

    achivements: Array<Achivement>;
}
export class Achivement {
  parameter: string;
  value: number;
}