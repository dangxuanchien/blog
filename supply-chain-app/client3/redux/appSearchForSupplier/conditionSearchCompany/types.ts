import { Nullable, Option } from '@/types';

export interface Item {
    itemId: string;
    itemName: string;
}
export interface SettingSearchConditionPayload {
    itemCategoryGroupName: string;
    itemCategoryName: string;
    itemName: string;
}
export interface BusinessOption extends Option {
    checked?: boolean;
}

export interface itemCategoryOption extends BusinessOption {
    itemCategoryGroupId: string;
}

export interface itemNameOption extends itemCategoryOption {
    itemCategoryId: string;
}
export interface ResultSettingSearchConditionItem {
    itemCategoryGroupId: string;
    itemCategoryGroupName: string;
    itemCategoryId: string;
    itemCategoryName: string;
    itemId: string;
    itemName: string;
    hasChecked?: boolean;
}

export interface SearchBusinessConditions {
    itemCategoryGroupOptions: BusinessOption[];
    itemCategoryOptions: itemCategoryOption[];
    itemNameOptions: itemNameOption[];
    keyWord?: string;
}

export interface SearchScoreConditions {
    qualityScore: number;
    costScore: number;
    deliveryScore: number;
    financeScore: number;
    environmentScore: number;
    laborScore: number;
    ethicsScore: number;
    sustainableScore: number;
}

export interface SearchWeightConditions {
    qualityWeight: number;
    costWeight: number;
    deliveryWeight: number;
    financeWeight: number;
    environmentWeight: number;
    laborWeight: number;
    ethicsWeight: number;
    sustainableWeight: number;
}

export interface ResultSearchCompanyItem {
    companyId: string;
    companyName: string;
    businessTypeId: string;
    businessTypeName: string;
    headquartersLocation: string;
    locationArea: string;
    sales: number;
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
    items: Item[];
    originalItemNames: Item[];
    itemCategories: string[];
    itemCategoryGroups: string[];
    qualityScore: number;
    costScore: number;
    deliveryScore: number;
    financeScore: number;
    environmentScore: number;
    laborScore: number;
    ethicsScore: number;
    sustainableScore: number;
}

export interface ConditionSearchCompanyState {
    business: SearchBusinessConditions;
    score: SearchScoreConditions;
    weight: SearchWeightConditions;
    candidateList: ResultSettingSearchConditionItem[];
    resultSearchCompanyList: ResultSearchCompanyItem[];
}

export enum ActionType {
    SEARCH_COMPANY = 'conditionSearchCompany/SEARCH_COMPANY',
    SEARCH_SETTINGS_CONDITION = 'conditionSearchSettings/SEARCH_SETTINGS_CONDITION',
    GET_WEIGHT_INFO = 'conditionSearchWeightInfo/GET_WEIGHT_INFO',
    SAVE_WEIGHT_INFO = 'conditionSearchWeightInfo/SAVE_WEIGHT_INFO',
}
