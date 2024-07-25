import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import RightChart from './components/RightChart';
import LeftChart from './components/LeftChart';
import { useChartPagesStyle } from './ChartPages.style';

interface Chart {
    dataSelect: any[];
    priceTransition: any[];
}

const Chart: FC<Chart> = ({ dataSelect, priceTransition }) => {
    const style = useChartPagesStyle();
    const { t } = useTranslation();

    /** 
     * @return Data of LEFT chart
     *  Model: Object[];
        { 
            x: date (string) , //example : 2022-01-15
            y: price (string || number),
            quantity: quantity (string || number),
            no?: no (string || number),  // If line is blue line, it has field "No.1, No.2,..."
        }
    */
    // Actual line (LEFT chart)
    const actualLine = dataSelect.map(() => {
        return priceTransition
            .filter((data) => data.actualPrice !== null)
            .map((data) => ({
                x: data.updateDate,
                y: data.actualPrice,
                quantity: data.orderQuantity,
            }));
    }); // data for draw pink line

    // Proposed line (LEFT chart)
    const proposedLine = dataSelect.map((element) => {
        return priceTransition
            .filter((data) => element.companyId === data.companyId && data.proposedPrice !== null)
            .map((data) => ({
                x: data.updateDate,
                y: data.proposedPrice,
                quantity: data.orderQuantity,
                no: element.id,
            }));
    });

    /** 
     * @return Data of RIGHT chart
     *  Model: Object[];
        { 
            x: quantity (string || number),
            y: price (string || number),
            date: string , //example : 2022-01-15
            no?: (string || number),  // If line is blue line, it has field "No.1, No.2,..."
        }
    */
    const pointData = dataSelect.map((element) => {
        return priceTransition
            .filter((data) => element.companyId === data.companyId && data.actualPrice !== null)
            .map((data) => ({
                x: data.orderQuantity,
                y: data.actualPrice,
                date: data.updateDate,
                no: element.id,
            }));
    }); // data for draw blue points (No.1, No.2,...) (right chart)

    return (
        <Grid container direction="row" spacing={4} className={style.main}>
            {/* Left chart */}
            <Grid item md={12} lg={6}>
                <Grid item className={style.chart}>
                    <Grid item className={style.chart__label}>
                        {t('benefitpurchase.time_series_comparison')}
                    </Grid>
                    <Grid item className={style.lableY}>
                        {t('benefitpurchase.unit')}
                    </Grid>
                    <LeftChart actualLine={actualLine} proposedLine={proposedLine} />
                    <Grid item className={style.lableX}>
                        {t('benefitpurchase.period')}
                    </Grid>
                </Grid>
            </Grid>
            {/* Right chart */}
            <Grid item md={12} lg={6}>
                <Grid item className={style.chart}>
                    <Grid item className={style.chart__label}>
                        {t('benefitpurchase.unit')}
                    </Grid>
                    <Grid item className={style.lableYRight}>
                        {t('benefitpurchase.time_series_comparison')}
                    </Grid>
                    <RightChart pointData={pointData || []} />
                    <Grid item className={style.lableX}>
                        {t('benefitpurchase.quantityTitle')}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Chart;
