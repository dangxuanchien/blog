const converTableSearch = (response: any) => {
    const result = response.map((item, index) => {
        return {
            companyId: item?.companyId,
            companyName: item?.companyName,
            productCategoryGroup: item?.itemCategoryGroups,
            itemCategory: item?.itemCategories,
            itemName: item?.items,
            originalItemName: item?.originalItemNames,
            qualityScore: item?.qualityScore,
            costScore: item?.costScore,
            deliveryScore: item?.deliveryScore,
            financeScore: item?.financeScore,
            environmentScore: item?.environmentScore,
            laborScore: item?.laborScore,
            ethicsScore: item?.ethicsScore,
            sustainableScore: item?.sustainableScore,

            isSelect: false,
            locationArea: item?.locationArea,

            headquartersLocation: item?.headquartersLocation,
            businessTypeId: item?.businessTypeId,
            businessTypeName: item?.businessTypeName,
            capital: item?.capital,
            regularCustomer: item?.regularCustomer,
            establishmentYear: item?.establishmentYear,
            numberOfEmployees: item?.numberOfEmployees,
            representative: item?.representative,
            operatingProfit: item?.operatingProfit,
            capitalRatio: item?.capitalRatio,
            companyIntroduction: item?.companyIntroduction,
            hpLink: item?.hpLink,
            imagePath: item?.imagePath,
            staffMessage: item?.staffMessage,
            updateDate: item?.updateDate,
            updateYear: item?.updateYear,

            sales: item?.sales,
        };
    });
    return result;
};

export { converTableSearch };
