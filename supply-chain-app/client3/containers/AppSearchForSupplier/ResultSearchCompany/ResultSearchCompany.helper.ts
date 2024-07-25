import {
    AppCornerInfoRadarChart,
    CornerInfoRadarChart,
    RadarChartData,
} from '@/components/Chart/AppRadarChart/AppRadarChart';
import { CompanyInformation } from '@/redux/appSearchForSupplier/ResultSearchCompany/types';
import {
    ResultSettingSearchConditionItem,
    SearchBusinessConditions,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/types';
import { SearchForSupplierCases } from '@/types';

enum ComparisonType {
    VOID,
    TRUST_COMPARISON,
    PRICE_COMPARISON,
}

// TODO: Consider making changes when integrating a new API.
function convertDataTableSearch(searchResult: CompanyInformation[]) {
    return searchResult.map((rowData, index) => {
        const itemNameDraft = rowData.itemName?.map((item) => item.itemName).join(', ') || '';
        const originalItemNameDraft = rowData.originalItemName?.map((item) => item.itemName).join(', ') || '';
        const itemCategoryDraft = rowData.itemCategory?.join(', ') || '';
        const itemCategoryGroupDraft = rowData.productCategoryGroup?.join(', ') || '';

        return {
            ...rowData,
            id: index + 1,
            itemName: itemNameDraft,
            itemCategory: itemCategoryDraft,
            originalItemName: originalItemNameDraft,
            productCategoryGroup: itemCategoryGroupDraft,
        };
    });
}

function convertDataCompareChart(response) {
    const data = response.flatMap((current) =>
        current.transactions.map((transaction) => ({
            updateDate: transaction.updateDate,
            companyId: current.companyId,
            actualPrice: transaction.actualPrice,
            orderQuantity: transaction.orderQuantity,
            proposedPrice: transaction.proposedPrice,
        }))
    );
    return data;
}

const calculateMediumLine = (dataTableSearch: CompanyInformation[]) => {
    const len = dataTableSearch?.length;

    if (len > 0) {
        let qualityScore = 0;
        let costScore = 0;
        let deliveryScore = 0;
        let financeScore = 0;
        let environmentScore = 0;
        let laborScore = 0;
        let ethicsScore = 0;
        let sustainableScore = 0;
        let mediumLine = [];

        dataTableSearch.forEach((item: any) => {
            const mediumQuality = Math.floor((qualityScore += item.qualityScore) / len);
            const mediumCost = Math.floor((costScore += item.costScore) / len);
            const mediumDelivery = Math.floor((deliveryScore += item.deliveryScore) / len);
            const mediumFinance = Math.floor((financeScore += item.financeScore) / len);
            const mediumEnvironment = Math.floor((environmentScore += item.environmentScore) / len);
            const mediumLabor = Math.floor((laborScore += item.laborScore) / len);
            const mediumEthicsScore = Math.floor((ethicsScore += item.ethicsScore) / len);
            const mediumSustainable = Math.floor((sustainableScore += item.sustainableScore) / len);

            mediumLine = [
                mediumQuality,
                mediumCost,
                mediumDelivery,
                mediumFinance,
                mediumEnvironment,
                mediumLabor,
                mediumEthicsScore,
                mediumSustainable,
            ];
        });

        return mediumLine;
    }

    return null;
};

// TODO: Refactor again when intergrate with new API
const convertDataRadarChart = (rawData: RadarChartData): Array<AppCornerInfoRadarChart> => {
    const { label: companyName, data, companyId } = rawData.datasets[0];
    const labels = rawData.labels;
    const result = data.map((item, index) => ({
        score: item,
        label: labels[index],
        companyName,
        peakScore: index,
        companyId,
    }));
    return result;
};

// TODO: Refactor again when intergrate with new API
const getConditionSearch = (conditionSearch: SearchBusinessConditions) => {
    let typeSearch = '';

    if (
        conditionSearch.itemCategoryGroupOptions.length > 0 &&
        conditionSearch.itemCategoryOptions.length > 0 &&
        conditionSearch.itemNameOptions.length > 0
    ) {
        typeSearch = SearchForSupplierCases.ITEM_NAME;
    } else if (conditionSearch.itemCategoryGroupOptions.length > 0 && conditionSearch.itemCategoryOptions.length > 0) {
        typeSearch = SearchForSupplierCases.CATEGORY;
    } else if (conditionSearch.itemCategoryGroupOptions.length > 0) {
        typeSearch = SearchForSupplierCases.GROUP;
    }
    return typeSearch;
};

export {
    convertDataTableSearch,
    convertDataCompareChart,
    calculateMediumLine,
    ComparisonType,
    convertDataRadarChart,
    getConditionSearch,
};
