import React, { FC, useContext } from 'react';
import { Options } from '@material-table/core';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ThemContext } from 'context/ThemeContext';
import TextTable from '@/components/Table/TextTable/TextTable';
import useSearchForSupplierTab from '../../SearchForSupplierTabContext';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/redux/hooks/redux';
import { postCompanyEvaluationDetail } from '@/redux/searchForSupplier/detailAchievements/dispatcher';
import { getColumns, useAchievementStyles as useAchievementStyles } from './Achivement.style';
import { DetailsTable } from '../DetailCompany';

interface SupplierDetailsProps {
    /**data Supplier table  */
    data?: DetailsTable[];
    options?: Options<any>;
    boxShadow: boolean;
    companyName?: string;
    companyId?: string;
}

const Achievement: FC<SupplierDetailsProps> = (props) => {
    const { data, boxShadow, options = { sorting: false }, companyName, companyId } = props;
    const { t } = useTranslation();
    const { getMode } = useContext(ThemContext);
    const { setTab, tab } = useSearchForSupplierTab();
    const classes = useAchievementStyles();
    const dispatch = useAppDispatch();
    const { itemCategory, itemCategoryGroup, itemName } = useAppSelector(
        (state) => state.filterSearchForSupplierReducer.filters
    );
    const isLightMode = getMode === 'light';

    const columns = getColumns(isLightMode, t);

    const onClickButton = async () => {
        const param = {
            companyId: companyId,
            itemCategoryGroup: itemCategoryGroup,
            itemNameIds: itemName,
            categoryIds: itemCategory,
        };
        await dispatch(postCompanyEvaluationDetail(param));
        setTab({
            ...tab,
            tabId: 2,
            labelTab: companyName,
        });
    };
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" style={{ gap: 10 }}>
            {/* Table */}
            <Grid item className={classes.table}>
                <TextTable columns={columns} options={{ ...options }} data={data} boxShadow={boxShadow} />
            </Grid>
            {data?.length && (
                <Button className={classes.btn} onClick={onClickButton}>
                    {t('supplierdetails.btnDetailAchivement ')}
                </Button>
            )}
        </Grid>
    );
};
export default Achievement;
