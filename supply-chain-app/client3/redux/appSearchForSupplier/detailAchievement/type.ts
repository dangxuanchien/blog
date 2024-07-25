export enum ActionType {
    POST_COMPANY_EVALUATION_PARAMETER_DETAIL = 'DetailAchievements/POST_COMPANY_EVALUATION_PARAMETER_DETAIL',
}

export type DetailAchievementsState = {
    detailAchievementsTabParams: CompanyEvaluationParameterDetail[];
    optionsDate: OptionsDate;
};

export type OptionsDate = {
    startDate: Date;
    endDate: Date;
};

export type ChartData = {
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
