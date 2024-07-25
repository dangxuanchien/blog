import Chart from '@/components/BenefitPurchase/Chart/ChartPages';
import AppDateRangePicker from '@/components/Inputs/AppDateRangePicker/AppDateRangePicker';
import { OptionDate } from '@/containers/SearchForSupplier/SearchForSupplier.constants';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { compareCompanies } from '@/redux/appSearchForSupplier/resultSearchCompany/dispatcher';
import {
    selectCheckedCompanies,
    selectCompareCompanies,
} from '@/redux/appSearchForSupplier/resultSearchCompany/selector';
import appMemo from '@/utils/appMemo';
import { Box, Grid } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCompanyCompareStyle } from './CompanyCompare.style';
interface CompanyCompareProps {}
const CompanyCompare: FC<CompanyCompareProps> = () => {
    const { t } = useTranslation();
    const classes = useCompanyCompareStyle();

    const dispatch = useAppDispatch();
    const selectedData = useAppSelector(selectCheckedCompanies);
    const compareData = useAppSelector(selectCompareCompanies);

    const [dateRangePicker, setDateRangePicker] = useState<OptionDate>({
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        endDate: new Date(),
    });

    useEffect(() => {
        // TODO: Consider making changes when integrating a new API.
        const request = {
            from: dateRangePicker.startDate,
            to: dateRangePicker.endDate,
            itemId: selectedData[0].items[0].itemId,
            companyIds: selectedData.map((element) => element.companyId),
        };
        dispatch(compareCompanies(request));
    }, []);

    // TODO: Consider making changes when integrating a new API.
    // useEffect(() => {
    // }, [dateRangePicker.startDate, dateRangePicker.endDate]);

    const onChangeDateRangePicker = ({ startDate, endDate }) => {
        setDateRangePicker({
            startDate,
            endDate,
        });
    };
    return (
        <Grid className={classes.modelPriceComparison}>
            <Grid item>
                <Box className={classes.labelCompanySearchResults}>
                    {t('searchForSupplierNew.priceInformationComparison')}
                </Box>
                <Box className={classes.dataPicker}>
                    <AppDateRangePicker
                        onChange={onChangeDateRangePicker}
                        value={[dateRangePicker.startDate, dateRangePicker.endDate]}
                        maxEndDate={new Date()}
                    />
                </Box>
                <Chart dataSelect={selectedData} priceTransition={compareData} />
            </Grid>
        </Grid>
    );
};

export default appMemo(CompanyCompare);
