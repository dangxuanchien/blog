
interface TableSearchItem {
    id: number;
    companyName: string;
    countryRegion: string;
    locationOfCompany: string;
    capital: number;
    mainJob: string;
    productCategory: string;
    productHandled: string;
    qualityScore: string,
    costScore: string,
    deliveryScore:string ,
    financeScore: string,
    environmentScore:string ,
    laborScore:string,
    ethicsScore: string,
    sustainableScore:string,
    totalMoney: string;
    totalDeliveries: string
    isSelect: boolean;
}

interface TableDetails {
    0: string,
    1: string,
    2: string,
    3: string,
    4: Array<evaluationDetails>,
    5: string,
    6: string,
    7: string,
    8: string,
    9: string,
    10: string,
    11: string,
    12: string,
    13: string,
    14: string,
    15: string,
    16: string,
    17: string,
    18: string,
    19: string,
    20: string,
    21: string,
    22: string,
    23: string,
    24: string,
    25: string,
    26: string,
    27: string,
    28: string,
    29: string,
    30: string,
    31: string,
    32: string,
    33: string,
    34: string,
    35: string,
    36: string,
    37: string,
    38: string,
    39: string,
    40: string,
    41: string,
    42: string,
    43: string
}

interface evaluationDetails {
    parameter: string,
    value: number,
}
export interface TableSearch {
   detailsTable: Array<TableDetails>

}
// Initial state for Table search
const initialState : TableSearch = {
    detailsTable: [],
};
export { initialState };