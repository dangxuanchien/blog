import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';

import { LIMITED_SHOW_MORE } from '@/utils/constants';
import { TypeSearch } from '@/utils/enum';
import compareAPI from '@/service/priceCompare.service';
import WeightService from '@/service/weight/weight.service';
import { addFilter, setPercents } from '@/redux/filterSearchForSupplier/reducer';
import { setSearchButton, settingConditionButton } from '@/redux/button/reducer';
import { detailButton, priceCompareButton, resetButton } from '@/redux/button/reducer';
import { detailCompanyAPI } from '@/redux/searchForSupplier/detailCompany/apiDetailCompany';

import SearchMenuBar from '../ControlBar/SearchMenuBar/SearchMenuBar';
import Search from '@/assets/icons/company-search.svg';
import { searchSupplier } from 'redux/searchForSupplier/ResultSearchCompany/apiSearchForSupplier';

import { SearchForSupplierTabContainer } from '../SearchForSupplier.constants';
import { useSearchForSupplierContainer } from '../SearchForSupplier.style';
import SearchButton from '../ControlBar/SearchControlBar/SearchButton/SearchButton';
import SearchCondition from '../ControlBar/SearchControlBar/SearchCondition/SearchCondition';
import SearchSlider from '../ControlBar/SearchControlBar/SearchSlider/SearchSlider';
import SearchResult from '../TabContent/EnterpriseSearch/SearchResult/SearchResult';
import DetailSearchCondition from '../TabContent/EnterpriseSearch/DetailsSearchCondition​/DetailSearchCondition';
import { convertDataTableSearch, convertDataCompareChart, calculateMediumLine, ComparisonType } from './helpers';

type useEnterpriseSearchProps = {
    handleClickRadarChart: any;
    handleReloadDetail: any;
    isReloadDetail: boolean;
};

export type OptionDate = {
    startDate: Date;
    endDate: Date;
};

const useEnterpriseSearch = ({ handleClickRadarChart }: useEnterpriseSearchProps): SearchForSupplierTabContainer => {
    const style = useSearchForSupplierContainer();
    const { t } = useTranslation();

    const dispatch = useDispatch<any>();
    const [isConditionKeyWordChange, setIsConditionKeyWordChange] = useState(false);
    const { filters, percents } = useAppSelector((state) => state.filterSearchForSupplierReducer);

    const {
        searchButton: isActiveSearchButton,
        detailButton: isActiveDetailButton,
        priceCompareButton: isActivePriceCompareButton,
        settingConditionButton: isActiveConditionButton,
    } = useSelector((state: any) => state.stateButtonReducer);

    const dataDropdown = useAppSelector(
        (state) => state.companySearchConditionDetailsReducer.dropdownList.itemCategoryGroup
    );
    const [activeClickSearch, setActiveClickSearch] = useState(false);

    useEffect(() => {
        filters.itemCategoryGroup.length <= 0 && dataDropdown.length <= 0
            ? setActiveClickSearch(true)
            : setActiveClickSearch(false);
    }, [filters.itemCategoryGroup.length, dataDropdown.length]);

    const handleControlBarClickSearch = () => {
        const searchObj = {
            ...filters,
            ...percents,
        };
        dispatch(setSearchButton());
        dispatch(searchSupplier(searchObj));
    };
    const handleConditionButton = () => {
        dispatch(settingConditionButton());
    };

    const dataSearchCondition = { ...filters, ...percents };
    const { itemCategoryGroup: itemCategoryGroupFilterSelected, itemCategory: itemCategoryFilterSelected } = filters;

    const dataConditionDropdown = useAppSelector((state) => state.companySearchConditionDetailsReducer.dropdownList);

    const dataCategories = dataConditionDropdown?.itemCategory.filter((element) => {
        if (itemCategoryGroupFilterSelected.includes(element?.id)) {
            return true;
        }
    });

    const dataItemName = dataConditionDropdown?.itemName.filter((element) => {
        if (itemCategoryFilterSelected.includes(element?.id)) {
            return true;
        }
    });

    const weightService = new WeightService();

    useEffect(() => {
        const convertData = dataCategories.map((item) => {
            return item?.value;
        });
        dispatch(addFilter({ itemCategory: convertData }));
    }, [itemCategoryGroupFilterSelected]);

    useEffect(() => {
        const convertData = dataItemName.map((item) => {
            return item?.value;
        });
        dispatch(addFilter({ itemName: convertData }));
    }, [itemCategoryFilterSelected]);

    const handleConditionDropdownChange = (dropdownValue) => {
        const data = {
            ...dataSearchCondition,
            ...dropdownValue,
        };
        dispatch(addFilter({ ...data }));
    };

    const handleConditionKeyWordChange = () => {
        setIsConditionKeyWordChange(true);
    };

    const handleConditionKeyWordBlur = (event) => {
        if (isConditionKeyWordChange) {
            const { name, value } = event.target;
            setIsConditionKeyWordChange(false);
            const data = {
                ...dataSearchCondition,
                [name]: value,
            };
            dispatch(addFilter({ ...data }));
            handleConditionDropdownClose();
        }
    };

    const handleConditionDropdownClose = () => {
        if (isActiveSearchButton) {
            dispatch(resetButton());
        }
    };

    useEffect(() => {
        (async function () {
            const getWeight = await weightService.getWeight();
            const dataWeight = getWeight.find((element) => element);
            dispatch(setPercents(dataWeight));
        })();
        console.log('dataWeight');
    }, []);

    const handleSliderSaveWeight = async () => {
        try {
            await weightService.saveWeight(percents);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSliderScoreChange = (valueScore) => {
        const data = {
            ...filters,
            ...valueScore,
        };
        dispatch(addFilter({ ...data }));
        handleConditionDropdownClose();
    };
    const handleSliderWeightChange = (valueWeight) => {
        const data = {
            ...percents,
            ...valueWeight,
        };
        dispatch(setPercents({ ...data }));
    };

    //SEARCH RESULTS
    const [comparisonTypeSearchResult, setComparisonTypeSearchResult] = useState(ComparisonType.VOID);

    const [rowSelectedSearchResult, setRowSelectedSearchResult] = useState([]);
    const [isShowMoreTableSearchResult, setIsShowMoreTableSearchResult] = useState(false); // need init = false
    const [isDisplayShowMoreSearchResult, setIsDisplayShowMoreSearchResult] = useState(false); // need init = false

    const [compareDataSearchResult, setCompareDataSearchResult] = useState([]);
    const [dataSelectChartSearchResult, setDataSelectChartSearchResult] = useState([]);

    const [optionDateChartSearchResult, setOptionDateChartSearchResult] = useState<OptionDate>({
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        endDate: new Date(),
    });

    const dataDetailCompanySearchResult = useSelector((state: any) => state.detailCompanyReducer.detailsTable);
    const searchResult = useSelector((state: any) => state.searchForSupplierReducer.tableSearchData);

    const handleSelectCheckboxTableSearchResult = (listSelected: any[]) => {
        if (isActivePriceCompareButton || isActiveDetailButton) {
            dispatch(resetButton());
        }
        setRowSelectedSearchResult(listSelected);
        console.log('Check select render', listSelected);
    };

    const handleShowCompanyDetailSearchResult = () => {
        //Reset data of chart
        setDataSelectChartSearchResult([]);
        setCompareDataSearchResult([]);

        if (rowSelectedSearchResult.length < 1) {
            setComparisonTypeSearchResult(ComparisonType.VOID);
            return;
        }

        setComparisonTypeSearchResult(ComparisonType.TRUST_COMPARISON);

        const {
            itemCategoryGroup,
            itemCategory,
            itemName,
            qualityScore,
            costScore,
            deliveryScore,
            financeScore,
            environmentScore,
            laborScore,
            ethicsScore,
            sustainableScore,
        } = filters;

        let typeSearch: string;
        switch (true) {
            case itemCategoryGroup?.length > 0 && itemCategory?.length > 0 && itemName.length > 0:
                typeSearch = TypeSearch.ITEM_NAME;
                break;
            case itemCategoryGroup?.length > 0 && itemCategory?.length > 0:
                typeSearch = TypeSearch.CATEGORY;
                break;
            case itemCategoryGroup?.length > 0:
                typeSearch = TypeSearch.GROUP;
                break;
            default:
                typeSearch = '';
        }

        dispatch(
            detailCompanyAPI({
                type: typeSearch,
                data: {
                    companies: rowSelectedSearchResult,
                    itemCategoryGroupIds: itemCategoryGroup,
                    categoryIds: itemCategory,
                    itemIds: itemName,
                    // 8 score
                    qualityScore,
                    costScore,
                    deliveryScore,
                    financeScore,
                    environmentScore,
                    laborScore,
                    ethicsScore,
                    sustainableScore,
                    // 8 weight
                    ...percents,
                },
            })
        );
        dispatch(detailButton());
    };

    /**implement button comparison price, navigate to screen price compare*/
    const itemIds = rowSelectedSearchResult.flatMap((select) =>
        searchResult
            .filter((item) => select.companyId === item.companyId)
            .flatMap((item) => item.itemName.map((item) => item.itemId))
    );
    console.log(searchResult);
    const handleShowPriceComparisonSearchResult = () => {
        const itemDiff = itemIds.filter((item) => item !== itemIds[0]);

        if (rowSelectedSearchResult.length >= 1) {
            dispatch(priceCompareButton());
        }

        if (rowSelectedSearchResult.length >= 1 && itemDiff.length === 0) {
            handlePriceCompare();
            setComparisonTypeSearchResult(ComparisonType.PRICE_COMPARISON);
        } else {
            //Reset data of chart
            setDataSelectChartSearchResult([]);
            setCompareDataSearchResult([]);
            setComparisonTypeSearchResult(ComparisonType.VOID);
        }

        setDataSelectChartSearchResult([...rowSelectedSearchResult]);
    };

    const companyIds = rowSelectedSearchResult.map((item) => {
        return item?.companyId;
    });

    const handlePriceCompare = async () => {
        const priceCompareObj = {
            from: optionDateChartSearchResult.startDate,
            to: optionDateChartSearchResult.endDate,
            itemId: itemIds[0],
            companyIds: companyIds,
        };
        console.log('priceCompareObj', priceCompareObj);
        const dataCompare = await compareAPI.comparison(priceCompareObj);
        // console.log(dataCompare);
        setCompareDataSearchResult(convertDataCompareChart(dataCompare));
    };

    const handleChangeDateRangePickerSearchResult = ({ startDate, endDate }) => {
        setOptionDateChartSearchResult({
            startDate,
            endDate,
        });
    };

    const handleShowMoreTableSearchResult = () => {
        setIsShowMoreTableSearchResult((pre) => !pre);
    };

    useEffect(() => {
        rowSelectedSearchResult?.length > 0 && handlePriceCompare();
    }, [optionDateChartSearchResult.startDate, optionDateChartSearchResult.endDate]);

    useEffect(() => {
        if (isActiveSearchButton) {
            // reset data when click search
            setRowSelectedSearchResult([]);
            setIsShowMoreTableSearchResult(false);
            setComparisonTypeSearchResult(ComparisonType.VOID);
        }
    }, [isActiveSearchButton]);

    useEffect(() => {
        console.log('searchResult', searchResult);
        if (searchResult && comparisonTypeSearchResult === ComparisonType.VOID) {
            setIsDisplayShowMoreSearchResult(searchResult.length > LIMITED_SHOW_MORE.MIN);
        }
    }, [isActiveSearchButton, searchResult]);

    return {
        controlTab: (
            <Tab
                className={style.tab}
                label={
                    <>
                        {t('searchForSupplierNew.exploreConditions')}
                        <Search className={style.searchIcon} />
                    </>
                }
                value={0}
            />
        ),
        controlBar: (
            <SearchMenuBar>
                <SearchMenuBar>
                    <SearchButton
                        isActiveButton={isActiveSearchButton}
                        handleControlBarClickSearch={handleControlBarClickSearch}
                        handleConditionButton={handleConditionButton}
                        activeClickSearch={activeClickSearch}
                    />
                    <SearchCondition
                        handleConditionDropdownChange={handleConditionDropdownChange}
                        handleConditionKeyWordChange={handleConditionKeyWordChange}
                        handleConditionKeyWordBlur={handleConditionKeyWordBlur}
                        handleConditionDropdownClose={handleConditionDropdownClose}
                        dataCategoryGroup={dataConditionDropdown.itemCategoryGroup}
                        dataCategories={dataCategories}
                        dataItemName={dataItemName}
                        filtersCondition={filters}
                    />
                    <SearchSlider
                        handleSoresChange={handleSliderScoreChange}
                        handleWeightChange={handleSliderWeightChange}
                        handleSubmit={handleSliderSaveWeight}
                    />
                </SearchMenuBar>
            </SearchMenuBar>
        ),
        content: isActiveConditionButton ? (
            <DetailSearchCondition />
        ) : (
            <SearchResult
                onClickRadarChart={handleClickRadarChart}
                onShowPriceComparison={handleShowPriceComparisonSearchResult}
                onShowCompanyDetail={handleShowCompanyDetailSearchResult}
                dataDetailCompany={dataDetailCompanySearchResult}
                mediumLineDetailCompany={
                    dataDetailCompanySearchResult?.length > 0 ? calculateMediumLine(searchResult) : []
                }
                optionDateChart={optionDateChartSearchResult}
                onChangeDateRangePicker={handleChangeDateRangePickerSearchResult}
                dataSelectChart={dataSelectChartSearchResult}
                compareData={compareDataSearchResult}
                onSelectCheckboxTable={handleSelectCheckboxTableSearchResult}
                comparisonType={comparisonTypeSearchResult}
                isShowMoreTable={isShowMoreTableSearchResult}
                stateButtons={{ isActivePriceCompareButton, isActiveDetailButton, isActiveSearchButton }}
                isDisplayShowMore={isDisplayShowMoreSearchResult}
                totalRowTable={searchResult?.length ?? 0}
                dataSearchTable={searchResult?.length >= 0 ? convertDataTableSearch(searchResult) : []}
                onShowMoreTable={handleShowMoreTableSearchResult}
                rowSelected={rowSelectedSearchResult}
            />
        ),
    };
};

export default useEnterpriseSearch;
