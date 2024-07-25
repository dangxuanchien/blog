import { Box, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Chart from '@/components/BenefitPurchase/Chart/ChartPages';
import AppButton from '@/components/Button/AppButton/AppButton';
import DetailCompany from 'containers/SearchForSupplier/DetailCompany/DetailCompany';

import IconOutlineArrowDown from '@/assets/icons/IconOutlineArrowDown.svg';
import IconOutlineArrowUp from '@/assets/icons/IconOutlineArrowUp.svg';
import AppDateRangePicker from '@/components/Inputs/AppDateRangePicker/AppDateRangePicker';
import { ComparisonType } from '@/containers/SearchForSupplier/UseTab/helpers';
import { customCss } from '../../TabContent.constants';
import { useSearchResultStyle } from './SearchResult.style';
import TableSearchForSupplier from './tableResult/TableSearchForSupplier';
import { OptionDate } from '@/containers/SearchForSupplier/UseTab/useEnterpriseSearch';

//CLASS FOR A RECORD IN TABLE

type stateButtonsType = {
    isActivePriceCompareButton: boolean;
    isActiveDetailButton: boolean;
    isActiveSearchButton: boolean;
};

type SearchResultProps = {
    onClickRadarChart?: any;
    onShowPriceComparison: () => void;
    onShowCompanyDetail: () => void;
    dataDetailCompany: any[];
    mediumLineDetailCompany: any[];
    optionDateChart: OptionDate;
    onChangeDateRangePicker: ({ startDate, endDate }) => void;
    dataSelectChart: any[];
    compareData: any[];
    onSelectCheckboxTable: (arr: any[]) => void;
    comparisonType: ComparisonType;
    isShowMoreTable: boolean;
    stateButtons: stateButtonsType;
    isDisplayShowMore: boolean;
    totalRowTable: number;
    dataSearchTable: any[];
    onShowMoreTable: () => void;
    rowSelected: any[];
};

const SearchResult: FC<SearchResultProps> = ({
    onClickRadarChart,
    onShowPriceComparison,
    onShowCompanyDetail,
    dataDetailCompany,
    mediumLineDetailCompany,
    optionDateChart,
    onChangeDateRangePicker,
    dataSelectChart,
    compareData,
    onSelectCheckboxTable,
    comparisonType,
    isShowMoreTable,
    stateButtons: { isActivePriceCompareButton, isActiveDetailButton },
    isDisplayShowMore,
    totalRowTable,
    dataSearchTable,
    onShowMoreTable,
    rowSelected,
}) => {
    const { t } = useTranslation();
    const style = useSearchResultStyle();

    const showModelInDetail = () => {
        if (dataDetailCompany.length > 0) {
            return (
                <Grid className={style.modelDetails}>
                    <Box className={style.labelDetail}>
                        {t('searchForSupplierNew.comparisonOfCorporateTrustAndDetailedInformation')}
                    </Box>
                    <DetailCompany
                        dataSupplierDetail={dataDetailCompany}
                        mediumLine={mediumLineDetailCompany}
                        handleClickRadarChart={onClickRadarChart}
                        customCss={customCss}
                        isShowLabelScore
                        isShowMediumLine
                    />
                </Grid>
            );
        }
    };

    const showModelPriceComparison = () => {
        return (
            <Grid className={style.modelPriceComparison}>
                <Grid item>
                    <Box className={style.labelCompanySearchResults}>
                        {t('searchForSupplierNew.priceInformationComparison')}
                    </Box>
                    <Box className={style.dataPicker}>
                        <AppDateRangePicker
                            onChange={onChangeDateRangePicker}
                            value={[optionDateChart.startDate, optionDateChart.endDate]}
                            maxEndDate={new Date()}
                        />
                    </Box>
                    <Chart dataSelect={dataSelectChart} priceTransition={compareData} />
                </Grid>
            </Grid>
        );
    };

    const comparisonContent = {
        [ComparisonType.VOID]: <></>,
        [ComparisonType.TRUST_COMPARISON]: showModelInDetail(),
        [ComparisonType.PRICE_COMPARISON]: showModelPriceComparison(),
    };

    return (
        <Grid className={style.container} container direction="column" alignItems="center">
            <Grid className={style.containerContent}>
                <Grid className={style.containerTable}>
                    <Grid className={style.table}>
                        <Grid className={style.label}>
                            <Box className={style.labelCompanySearchResults}>
                                {t('searchForSupplierNew.companySearchResults')}:
                                <label className={style.labelCountCompany}>
                                    <label className={style.labelNumber}>{totalRowTable}</label>
                                    {t('searchForSupplierNew.company')}
                                </label>
                            </Box>
                        </Grid>
                        <TableSearchForSupplier
                            onChecked={onSelectCheckboxTable}
                            data={dataSearchTable}
                            dataSelected={rowSelected}
                            isShowMore={isShowMoreTable}
                        />
                    </Grid>
                </Grid>
                <Grid container className={style.containerButton}>
                    <Grid className={style.buttonDetail}>
                        <AppButton
                            className={style.buttonTrustComparison}
                            color={isActiveDetailButton ? 'secondary' : 'default'}
                            onClick={onShowCompanyDetail}
                            disabled={isActiveDetailButton}
                        >
                            {t('searchForSupplierNew.trustComparison')}
                        </AppButton>
                        <AppButton
                            className={style.buttonPriceComparison}
                            color={isActivePriceCompareButton ? 'secondary' : 'default'}
                            onClick={onShowPriceComparison}
                            disabled={isActivePriceCompareButton}
                        >
                            {t('searchForSupplierNew.priceComparison')}
                        </AppButton>
                    </Grid>
                    {isDisplayShowMore && (
                        <Grid className={style.buttonShowMore}>
                            <Box className={style.iconShowMore} onClick={onShowMoreTable}>
                                {isShowMoreTable ? (
                                    <IconOutlineArrowUp />
                                ) : (
                                    <IconOutlineArrowDown className={style.iconShowMoreDown} />
                                )}
                            </Box>
                        </Grid>
                    )}
                </Grid>
                <Grid className={style.containerComparison} style={{ height: 10 }}>
                    <Grid className={style.containerChart}>{comparisonContent[comparisonType]}</Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SearchResult;
