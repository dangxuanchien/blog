export interface RangeCompanyValue {
    conditionValue: number;
    companyNumber: number;
}

export interface DataBarChart {
    rangeCompanyValue: RangeCompanyValue[];
    min: number;
    max: number;
    step: number;
}

export const convertDataBarChart = (rawData: number[]): DataBarChart => {
    const range = 5;
    const max = Math.ceil(Math.max(...rawData) / range) * range;
    const min = Math.floor(Math.min(...rawData) / range) * range;
    const step = (max - min) / range;

    const getCondition = (index) => {
        return min + step * index;
    };

    const rangeCompanyValue: RangeCompanyValue[] = [];

    // create form array
    for (let i = 0; i < range; i++) {
        rangeCompanyValue.push({
            conditionValue: getCondition(i + 1),
            companyNumber: 0,
        });
    }

    // count company number
    rawData.forEach((item) => {
        // check if number of rawData <= conditionValue
        const indexElement = rangeCompanyValue.findIndex((element) => item <= element.conditionValue);

        // if it exist, +1 for companyNumber
        if (indexElement !== -1) {
            rangeCompanyValue[indexElement].companyNumber += 1;
        }
    });
    return {
        rangeCompanyValue,
        min,
        max,
        step,
    };
};
