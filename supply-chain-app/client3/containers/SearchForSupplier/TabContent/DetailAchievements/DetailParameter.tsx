import { Grid, Box, Typography } from '@material-ui/core';
import { FC, useEffect, useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CurverChartCustom from './CurverChartCustom/CurverChartCustom';
import { useStyles } from './DetailParameter.style';
import useSearchForSupplierTab from '../../SearchForSupplierTabContext';

export interface ChartData {
    x: Date;
    y: number;
    score: ChartDetail[];
}
export interface ChartDetail {
    id: number;
    parameter: string;
    selected: boolean;
    chartData: ChartData[];
}

type DetailParameterProps = {
    label?: string;
    handleReloadDetail?: any;
    data?: any;
};

const DetailParameter: FC<DetailParameterProps> = ({ handleReloadDetail, data }) => {
    const style = useStyles();
    const { t } = useTranslation();
    const {
        tab: { labelTab: companyName },
    } = useSearchForSupplierTab();
    const useWindowSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    };
    const [width, height] = useWindowSize();
    const isResize = width < 1600;

    useEffect(() => {
        handleReloadDetail(true);
    });

    const renderDetailParameterChart = (data: ChartDetail[]) => {
        if (!data) {
            return;
        }
        const firstParameter = data.findIndex((el) => el.selected === true);
        return data.map((element, index) => {
            if (element.selected) {
                return (
                    <Grid key={element.id} item className={isResize ? style.renderChart : style.renderChart2}>
                        {/* show title */}
                        {index === firstParameter && (
                            <Typography className={isResize ? style.detailTitle : style.detailTitle2}>
                                {t('achievementDetails.title') + ` : ${companyName}`}
                            </Typography>
                        )}
                        <Box className={style.layerChart}>
                            <CurverChartCustom
                                data={element.chartData}
                                isResize={isResize}
                                label={element.parameter}
                            ></CurverChartCustom>
                        </Box>
                    </Grid>
                );
            }
        });
    };
    return (
        <Grid container className={isResize ? style.containerChart : style.containerChart2}>
            {renderDetailParameterChart(data)}
        </Grid>
    );
};
export default DetailParameter;
