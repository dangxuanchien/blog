export interface TableSearchItem {
    id: number;
    companyId: string;
    companyName: string;
    countryRegion: string;
    locationOfCompany: string;
    capital: number;
    mainJob: string;
    productCategory: string;
    productHandled: string;
    qualityScore: string;
    costScore: string;
    deliveryScore: string;
    financeScore: string;
    environmentScore: string;
    laborScore: string;
    ethicsScore: string;
    sustainableScore: string;
    totalMoney: string;
    totalDeliveries: string;
    isSelect: boolean;
}

export interface TableSearch {
    tableSearchData: Array<TableSearchItem>;
    checkedCompanyData: Array<TableSearchItem>;
}
// Initial state for Table search
const initialState: TableSearch = {
    tableSearchData: [],
    checkedCompanyData: [],
};
export { initialState };
