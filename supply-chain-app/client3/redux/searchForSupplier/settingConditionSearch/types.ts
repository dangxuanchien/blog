export interface EnterpriseSearchItem {
    index?: string | number;
    itemCategoryGroupId: string;
    itemCategoryGroupName: string;
    itemCategoryId: string;
    itemCategoryName: string;
    itemId: string;
    itemName: string;
}

export interface EnterpriseSearchData {
    tableSearchCondition: EnterpriseSearchItem[];
    listChecked: EnterpriseSearchItem[];
}
export interface RequesConditionSearch {
    [key: string]: string;
}