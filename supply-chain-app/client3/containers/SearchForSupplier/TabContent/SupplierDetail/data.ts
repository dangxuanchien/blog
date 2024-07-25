type CorporateEvaluationDetailData = {
    [key: string]: any;
    score: number;
    companyNumber: number;
};

type Score = {
    date: string;
    score: number;
};
type LineChartDataList = {
    parameter: string;
    scoreList: Score[];
};

export const corporateEvaluationDetailData: CorporateEvaluationDetailData[] = [
    {
        id: 1,
        score: 20,
        companyNumber: 70,
    },
    {
        id: 2,
        score: 40,
        companyNumber: 45,
    },
    {
        id: 3,
        score: 60,
        companyNumber: 78,
    },
    {
        id: 4,
        score: 80,
        companyNumber: 90,
    },
    {
        id: 5,
        score: 100,
        companyNumber: 43,
    },
];

const cDD = (date: string, score: number): Score => ({ date, score });

export const lineChartDataList: LineChartDataList[] = [
    {
        parameter: '品質スコア',
        scoreList: [
            cDD('2022-01-01', 50),
            cDD('2022-02-01', 50),
            cDD('2022-03-01', 90),
            cDD('2022-06-01', 70),
            cDD('2022-09-1', 90),
            cDD('2022-12-1', 90),
        ],
    },
    {
        parameter: '納品時の不良率の低さ',
        scoreList: [
            cDD('2022-01-01', 60),
            cDD('2022-02-01', 60),
            cDD('2022-03-01', 80),
            cDD('2022-06-01', 70),
            cDD('2022-09-1', 70),
            cDD('2022-12-1', 60),
        ],
    },
    {
        parameter: 'XXXX',
        scoreList: [
            cDD('2022-01-01', 40),
            cDD('2022-02-01', 60),
            cDD('2022-03-01', 80),
            cDD('2022-06-01', 60),
            cDD('2022-09-1', 70),
            cDD('2022-12-1', 60),
        ],
    },
    {
        parameter: 'XXXX',
        scoreList: [
            cDD('2022-01-01', 70),
            cDD('2022-02-01', 70),
            cDD('2022-03-01', 70),
            cDD('2022-06-01', 65),
            cDD('2022-09-1', 76),
            cDD('2022-12-1', 34),
        ],
    },
];

export const dataTable = [
    {
        score: 72,
        evaluation: '納品時の不良率の低さ​',
    },
    {
        score: 80,
        evaluation: 'xxx​',
    },
    {
        score: 80,
        evaluation: 'xxxx​',
    },
    {
        score: 80,
        evaluation: 'xxxxx',
    },
];