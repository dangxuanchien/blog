import { CornerInfoRadarChart } from '@/components/Chart/CustomRadarChart/CustomRadarChart';
import DateRangePicker, { OnChangeState } from '@/components/Inputs/DateRangePicker/DateRangePicker';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Box, Grid, Typography } from '@material-ui/core';
import { TimeUnit } from 'chart.js';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DetailQcdService from 'service/companyService/detailQcd/detailQcd.service';
import ScoreChart from '../ScoreChart/ScoreChart';
import { useScoreTransitionStyle } from './ScoreTransition.style';

type ScoreTransitionProps = {
    supplierInfo: CornerInfoRadarChart;
};

const formatDate = (date: Date) => (!date ? '' : moment(date).format('YYYY.MM.DD'));

const ScoreTransition: FC<ScoreTransitionProps> = ({ supplierInfo }) => {
    const { t } = useTranslation();
    const classes = useScoreTransitionStyle();
    const [dataRelevantChart, setDataRelevantChart] = useState([]);
    const [dataParameterChart, setDataParameterChart] = useState([]);
    const [displayUnit, setDisplayUnit] = useState<TimeUnit>('month');
    const dataSearch = useAppSelector((state: any) => state.filterSearchForSupplierReducer.filters);

    const [dateRange, setDateRange] = useState<OnChangeState>({
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        endDate: new Date(),
    });

    const optionsDisplayUnit = [
        {
            name: t('detailSupplier.week'),
            value: 'week',
        },
        {
            name: t('detailSupplier.month'),
            value: 'month',
        },
        {
            name: t('detailSupplier.quarter'),
            value: 'quarter',
        },
        {
            name: t('detailSupplier.year'),
            value: 'year',
        },
    ];
    const handleChangeDisplayUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDisplayUnit(e.currentTarget.value as TimeUnit);
    };

    useEffect(() => {
        const getDataLineChart = async () => {
            const params = {
                from: dateRange.startDate,
                to: dateRange.endDate,
                type: supplierInfo.conditionSearch,
                companyId: supplierInfo.companyId,
                relevantScore: supplierInfo.relevantScore,
                itemCategoryGroup: dataSearch.itemCategoryGroup,
                categoryIds: dataSearch.itemCategory,
                itemNameIds: dataSearch.itemName,
            };

            // call api get green, yellow line for line chart
            const [dataRelevant, dataParameter] = await Promise.all([
                DetailQcdService.qcdChartRelevant(params),
                DetailQcdService.qcdChartParameter(params),
            ]);
            setDataRelevantChart(dataRelevant);
            setDataParameterChart(dataParameter);
        };
        getDataLineChart();
    }, [dateRange.startDate, dateRange.endDate, supplierInfo.relevantScore]);

    const dataChart = {
        dataRelevantChart: dataRelevantChart,
        dataParameterChart: dataParameterChart,
    };

    return (
        <Box className={classes.chartContainer}>
            <Typography style={{ fontWeight: 'bold' }} variant="h6">
                {t('detailSupplier.scoreTransition')}
            </Typography>
            <Grid
                container
                spacing={4}
                wrap="nowrap"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.wrapChartInfo}
            >
                <Grid item style={{ marginRight: '50px' }}>
                    <DateRangePicker value={[dateRange.startDate, dateRange.endDate]} onChange={setDateRange} />
                </Grid>
                <Grid item className={classes.dropdownLable}>
                    <Grid item>
                        <Box className={classes.dropdown}>
                            <Typography>{t('detailSupplier.displayUnit')}</Typography>
                            <select defaultValue={displayUnit} onChange={handleChangeDisplayUnit}>
                                {optionsDisplayUnit.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </Box>
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                        <Grid item style={{ width: 180 }} container wrap="nowrap">
                            <Typography style={{ width: 90 }}>{t('detailSupplier.tradingStartDate')}</Typography>
                            <Typography>{formatDate(dateRange.startDate)}</Typography>
                        </Grid>
                        <Grid item style={{ width: 180 }} container wrap="nowrap">
                            <Typography style={{ width: 90 }}>{t('detailSupplier.tradingLastDate')}</Typography>
                            <Typography>{formatDate(dateRange.endDate)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box className={classes.chart}>
                <ScoreChart data={dataChart} displayUnit={displayUnit} />
            </Box>
        </Box>
    );
};

export default ScoreTransition;
