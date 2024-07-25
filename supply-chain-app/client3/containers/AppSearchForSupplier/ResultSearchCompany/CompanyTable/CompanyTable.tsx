import IconOutlineArrowDown from '@/assets/icons/IconOutlineArrowDown.svg';
import IconOutlineArrowUp from '@/assets/icons/IconOutlineArrowUp.svg';
import AppButton from '@/components/Button/AppButton/AppButton';
import AppTable from '@/components/Table/AppTable/AppTable';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useDeepCallback from '@/hooks/useDeepCallback';
import { detailCompanies } from '@/redux/appSearchForSupplier/resultSearchCompany/dispatcher';
import {
    changeStatusCompareButtons,
    changeStatusControlDisplay,
    setCheckedCompanies,
    toggleShowMoreTable,
} from '@/redux/appSearchForSupplier/resultSearchCompany/reducer';
import {
    selectCheckedCompanies,
    selectControlDisplay,
    selectSearchedCompanies,
} from '@/redux/appSearchForSupplier/resultSearchCompany/selector';
import { CompanyInformation } from '@/redux/appSearchForSupplier/resultSearchCompany/types';
import { Order } from '@/types';
import appMemo from '@/utils/appMemo';
import { Box, Grid } from '@material-ui/core';
import _isEqual from 'lodash/isEqual';
import { FC, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LIMITED_SHOW_MORE } from 'utils/constants';
import { convertDataTableSearch } from '../ResultSearchCompany.helper';
import { useCompanyTableStyle } from './CompanyTable.style';
import { initColumnsTable } from './InitColumnsCompanyTable';
import { columnCompanyTableCss, options } from './InitColumnsCompanyTable.style';
import useDeepMemo from '@/hooks/useDeepMemo';
const CompanyTable: FC = () => {
    const { t } = useTranslation();
    const classes = useCompanyTableStyle();

    // Selector
    const dispatch = useAppDispatch();
    const searchResult = useAppSelector(selectSearchedCompanies);
    const checkedCompanyData = useAppSelector(selectCheckedCompanies);
    const controlDisplay = useAppSelector(selectControlDisplay);
    const {
        compareButtons: { isActivePriceButton, isActiveTrustButton },
        compareDisplay: { isDisplayMoreTable },
    } = controlDisplay;

    const { MIN, MAX, HEIGHT_ROW } = LIMITED_SHOW_MORE;
    const maxBodyHeight = isDisplayMoreTable ? options.maxBodyHeight + (MAX - MIN) * HEIGHT_ROW : options.maxBodyHeight;

    // Hook
    const rowCheckedRef = useRef<CompanyInformation[]>(checkedCompanyData);

    // Handle function
    const mapDataForRender = useDeepMemo(() => convertDataTableSearch(searchResult), [searchResult]);

    // Function handle
    const onClickCheckbox = useDeepCallback(() => {
        dispatch(
            changeStatusCompareButtons({
                isActiveTrustButton: false,
                isActivePriceButton: false,
            })
        );
    }, []);

    const configColumns = useMemo(() => initColumnsTable(t, rowCheckedRef, onClickCheckbox), []);

    const handleShowCompanyDetail = () => {
        const isEqualPreviousRowChecked = _isEqual(checkedCompanyData, rowCheckedRef.current);
        if (!isEqualPreviousRowChecked || !checkedCompanyData.length) {
            dispatch(setCheckedCompanies(rowCheckedRef.current));
            dispatch(detailCompanies());
        }
        dispatch(
            changeStatusControlDisplay({
                compareButtons: {
                    isActiveTrustButton: true,
                    isActivePriceButton: false,
                },
                compareDisplay: {
                    isDisplayPrice: false,
                    isDisplayTrust: true,
                    isDisplayMoreTable,
                },
            })
        );
    };

    const handleShowCompanyCompare = () => {
        dispatch(setCheckedCompanies(rowCheckedRef.current));
        // Is selected companies have the same item name.
        const isSameItemName =
            rowCheckedRef.current.length > 1 &&
            rowCheckedRef.current.every((element) => element.itemName === rowCheckedRef.current[0].itemName);
        if (isSameItemName) {
            dispatch(
                changeStatusControlDisplay({
                    compareButtons: {
                        isActiveTrustButton: false,
                        isActivePriceButton: true,
                    },
                    compareDisplay: {
                        isDisplayPrice: true,
                        isDisplayTrust: false,
                        isDisplayMoreTable,
                    },
                })
            );
        } else {
            dispatch(
                changeStatusControlDisplay({
                    compareButtons: {
                        isActiveTrustButton: false,
                        isActivePriceButton: true,
                    },
                    compareDisplay: {
                        isDisplayPrice: false,
                        isDisplayTrust: false,
                        isDisplayMoreTable,
                    },
                })
            );
        }
    };

    return (
        <>
            <Grid className={classes.containerTable}>
                <Grid className={classes.table}>
                    <Grid className={classes.label}>
                        <Box className={classes.labelCompanySearchResults}>
                            {t('searchForSupplierNew.companySearchResults')}:
                            <label className={classes.labelCountCompany}>
                                <label className={classes.labelNumber}>{searchResult?.length ?? 0}</label>
                                {t('searchForSupplierNew.company')}
                            </label>
                        </Box>
                    </Grid>
                    <AppTable
                        columns={configColumns}
                        data={mapDataForRender}
                        headerHeight={85}
                        defaultOrderBy={{ field: 'qualityScore', order: Order.desc }}
                        maxBodyHeight={maxBodyHeight}
                        tableStyle={columnCompanyTableCss.tableStyle}
                    />
                </Grid>
            </Grid>
            <Grid container className={classes.containerButton}>
                <Grid className={classes.buttonDetail}>
                    <AppButton
                        className={classes.buttonTrustComparison}
                        onClick={handleShowCompanyDetail}
                        isActive={isActiveTrustButton}
                    >
                        {t('searchForSupplierNew.trustComparison')}
                    </AppButton>
                    <AppButton
                        className={classes.buttonPriceComparison}
                        onClick={handleShowCompanyCompare}
                        isActive={isActivePriceButton}
                    >
                        {t('searchForSupplierNew.priceComparison')}
                    </AppButton>
                </Grid>
                <Grid className={classes.buttonShowMore}>
                    <Box
                        className={classes.iconShowMore}
                        onClick={() => dispatch(toggleShowMoreTable(!isDisplayMoreTable))}
                    >
                        {isDisplayMoreTable ? (
                            <IconOutlineArrowUp />
                        ) : (
                            <IconOutlineArrowDown className={classes.iconShowMoreDown} />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default appMemo(CompanyTable);
