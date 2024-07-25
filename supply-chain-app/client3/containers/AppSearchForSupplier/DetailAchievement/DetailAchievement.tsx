import useSearchForSupplierTab from '@/containers/SearchForSupplier/SearchForSupplierTabContext';
import CurverChartCustom from '@/containers/SearchForSupplier/TabContent/DetailAchievements/CurverChartCustom/CurverChartCustom';
import { useAppSelector } from '@/hooks/useAppSelector';
import useDeepMemo from '@/hooks/useDeepMemo';
import { useWindowSize } from '@/hooks/useWindowSize';
import {
    selectDetailAchievementTabParams,
    selectOptionDateParameter,
} from '@/redux/appSearchForSupplier/detailAchievement/selectors';
import { CompanyEvaluationParameterDetail, OptionsDate } from '@/redux/appSearchForSupplier/detailAchievement/type';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './DetailAchievement.style';
import moment from 'moment';

const DetailAchievement = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const {
        tab: { labelTab: companyName },
    } = useSearchForSupplierTab();

    const [width] = useWindowSize();
    const isResize = width < 1600;

    const optionDate: OptionsDate = useAppSelector(selectOptionDateParameter);
    const detailAchievementsTabParams = useAppSelector(selectDetailAchievementTabParams);

    const companiesEvaluationSelected = useDeepMemo(() => {
        return detailAchievementsTabParams.reduce((prev, currentValue) => {
            if (currentValue.selected) {
                const chartFiltered = currentValue.chartData.filter((element) => {
                    if (moment(element.x).isBetween(moment(optionDate.startDate), moment(optionDate.endDate))) {
                        return element;
                    }
                });
                return [...prev, {
                    ...currentValue,
                    id: currentValue.id,
                    parameter: currentValue.parameter,
                    selected: currentValue.selected,
                    chartData: chartFiltered
                }];
            }
            return prev;
        }, [] as CompanyEvaluationParameterDetail[]);
    }, [detailAchievementsTabParams, optionDate]);

    const renderDetailParameterChart = (companyEvaluationList: CompanyEvaluationParameterDetail[]) => {
        return companyEvaluationList.map((element, index) => {
            return (
                <Grid key={element.id} item className={isResize ? classes.renderChart : classes.renderChart2}>
                    {/* show title */}
                    {index === 0 && (
                        <Typography className={isResize ? classes.detailTitle : classes.detailTitle2}>
                            {t('achievementDetails.title') + ` : ${companyName}`}
                        </Typography>
                    )}
                    <Box className={classes.layerChart}>
                        <CurverChartCustom
                            data={element.chartData}
                            isResize={isResize}
                            label={element.parameter}
                        ></CurverChartCustom>
                    </Box>
                </Grid>
            );
        });
    };

    return (
        <>
            {companiesEvaluationSelected.length > 0 && (
                <Grid container className={isResize ? classes.containerChart : classes.containerChart2}>
                    {renderDetailParameterChart(companiesEvaluationSelected)}
                </Grid>
            )}
        </>
    );
};

export default DetailAchievement;
