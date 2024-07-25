export type DetailAchievementsState = {
    selectedCompanyId: string;
    detailAchievementsTabParams: CompanyEvaluationParameterDetail[];
    dataChart: any;
};

type ChartData = {
    x: Date;
    y: number;
    score: number;
};

export type CompanyEvaluationParameterDetail = {
    id: number;
    parameter: string;
    selected: boolean;
    chartData: Array<ChartData>;
};

export type CompanyInfos = {
    companyId: string;
    itemCategoryGroup: any;
    itemNameIds: any;
    categoryIds: any;
};

export enum ActionType {
    POST_COMPANY_EVALUATION_PARAMETER_DETAIL = 'POST_COMPANY_EVALUATION_PARAMETER_DETAIL',
}
