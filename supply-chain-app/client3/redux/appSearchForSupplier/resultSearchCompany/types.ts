export enum ActionType {
    GET_SEARCH_INFO_COMPANIES = 'resultSearchCompany/getSearchInfoCompanies',
    GET_DETAIL_INFO_COMPANY = 'resultSearchCompany/getDetailInfoCompanies',
    GET_COMPARE_INFO_COMPANY = 'resultSearchCompany/getCompareInfoCompanies',
}

export interface CompanyInformation {
    id: number;

    companyId: string;
    companyName: string;
    productCategoryGroup: string[];
    itemCategory: string[];

    itemName: ItemName[];
    items: ItemName[];
    originalItemName: ItemName[];

    qualityScore: number;
    costScore: number;
    deliveryScore: number;
    financeScore: number;
    environmentScore: number;
    laborScore: number;
    ethicsScore: number;
    sustainableScore: number;

    isSelect: boolean;
    locationArea: string;
    headquartersLocation: string;
    businessTypeId: string;
    businessTypeName: string;
    capital: number;
    regularCustomer: string;
    establishmentYear: number;
    numberOfEmployees: number;
    representative: string;
    operatingProfit: number;
    capitalRatio: number;
    companyIntroduction: string;
    hpLink: string;
    imagePath: string;
    staffMessage: string;
    updateDate: string;
    updateYear: number;
    sales: number;
}

export interface ParameterSearchCompanies {
    qualityScore: number;
    costScore: number;
    deliveryScore: number;
    financeScore: number;
    environmentScore: number;
    laborScore: number;
    ethicsScore: number;
    sustainableScore: number;
    itemCategoryGroup: string[];
    itemCategory: string[];
    itemName: string[];
    keyWord: string;
    qualityWeight: number;
    costWeight: number;
    deliveryWeight: number;
    financeWeight: number;
    environmentWeight: number;
    laborWeight: number;
    ethicsWeight: number;
    sustainableWeight: number;
}

export interface ItemName {
    itemId: string;
    itemName: string;
}

export interface CompareButton {
    isActiveTrustButton: boolean;
    isActivePriceButton: boolean;
}

export interface CompareDisplay {
    isDisplayTrust: boolean;
    isDisplayPrice: boolean;
    isDisplayMoreTable: boolean;
}

export interface ControlDisplay {
    compareButtons: CompareButton;
    compareDisplay: CompareDisplay;
}

export interface CompanySearchResult {
    searchedCompanies: CompanyInformation[];
    checkedCompanies: CompanyInformation[];
    detailCompanies: CompanyDetail[];
    compareCompanies: CompanyCompare[];
    controlDisplay: ControlDisplay;
    // compareButtons: CompareButton;
    // compareDisplay: CompareDisplay;
}

export interface CompanyCompare {
    updateDate: string;
    companyId: string;
    actualPrice: number;
    orderQuantity: number;
    proposedPrice: number;
}

export interface CompanyDetail {
    companyId: string;
    companyName: string;
    headquartersLocation: string;
    locationArea: string;
    sales: number;
    businessTypeName: string;
    businessTypeCode: string;
    capital: number;
    regularCustomer: string;
    establishmentYear: number;
    numberOfEmployees: number;
    representative: string;
    operatingProfit: number;
    capitalRatio: number;
    companyIntroduction: string;
    hpLink: string;
    imagePath: string;
    staffMessage: string;
    updateDate: string;
    updateYear: number;
    qualityScore: number;
    costScore: number;
    deliveryScore: number;
    financeScore: number;
    environmentScore: number;
    laborScore: number;
    ethicsScore: number;
    sustainableScore: number;
    achivements: Achivement[];
    overalScore: number;
}

export interface Achivement {
    parameter: string;
    value: number;
}

export interface CompareCompanyPayload {
    from: Date;
    to: Date;
    itemId: string;
    companyIds: string[];
}
