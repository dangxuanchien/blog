import { color, cssConstant } from '@/components/CSSConstant/css.constant';
import VerticalBarChartCustom from '@/components/Chart/BarChart/VerticalBarChart';
import BoxPlotChart from '@/components/Chart/BoxPlotChart/BoxPlotChart';
import { CornerInfoRadarChart } from '@/components/Chart/CustomRadarChart/CustomRadarChart';
import CustomTableNew, { ColumnType } from '@/components/Table/CustomTableNew';
import useSearchForSupplierTab from '@/containers/SearchForSupplier/SearchForSupplierTabContext';
import { Box, Grid, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { usePrevious } from 'hooks/usePrevious';
import { useAppSelector } from '@/hooks/useAppSelector';
import _isEqual from 'lodash/isEqual';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DetailQcdService from 'service/companyService/detailQcd/detailQcd.service';
import { CompanyParameters } from '../SupplierDetail';

const {
    font: { mainTitle },
} = cssConstant;
const ColumnStyle: CSSProperties = {
    border: 'none',
    backgroundColor: '#32363e',
    fontSize: 16,
    wordBreak: 'break-all',
};
const ColumnStyleHeader: CSSProperties = {
    borderBottom: '2px solid #fff',
    backgroundColor: '#32363e',
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 5,
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        companyName: {
            fontSize: `${mainTitle}`,
            fontWeight: 'bold',
        },
        contentContainer: {
            width: '100%',
            height: 'auto',
            padding: '16px 16px 0',
            backgroundColor: theme.palette.primary.light,
            borderRadius: '10px',
            marginBottom: '10px',
            color: theme.palette.text.primary,
            overflowY: 'auto',
        },
        labelScore: {
            fontSize: `${mainTitle}`,
            fontWeight: 'bold',
        },
        typeScore: {
            color: color.yellow,
        },
        score: {
            fontSize: `${mainTitle}`,
            fontWeight: 'bold',
        },
        scoreWithColor: {
            color: '#FFDA0A',
        },
        table: {
            minWidth: 580,
            maxWidth: 630,
            '& tbody tr:last-child td:last-child': {
                overflow: 'hidden',
            },
        },
        tradingDatelabel: {
            display: 'flex',
            justifyContent: 'space-around',
            gap: 18,
            lineHeight: '20px',
        },

        barChart: {
            position: 'relative',
            minWidth: '562px',
            '& canvas': {
                width: '530px !important',
                height: '265px !important',
            },
        },
        chartTop: {
            height: 'calc(100% - 58px)',
            marginTop: 0,
            marginBottom: 0,
            padding: '0px 20px',
            display: 'flex',
        },
        wrapTableBarChart: {
            padding: '8px 20px 20px 20px',
        },
    })
);

type CorporateTrustEvaluationDetailsProps = {
    supplierInfo: CornerInfoRadarChart;
};

const CorporateTrustEvaluationDetails: FC<CorporateTrustEvaluationDetailsProps> = ({ supplierInfo }) => {
    const { t } = useTranslation();
    const style = useStyles();
    const [barChartData, setBarChartData] = useState<number[]>(null);
    const [dataTable, setDataTable] = useState([]);
    const [shouldDisplayBarChart, setShouldDisplayBarChart] = useState(false);
    const [tableRowSelected, setTableRowSelected] = useState<CompanyParameters>({});
    const prevSupplierInfo = usePrevious(supplierInfo);
    const {
        tab: {
            info: { relevantScore },
        },
    } = useSearchForSupplierTab();
    const dataSearch = useAppSelector((state: any) => state.filterSearchForSupplierReducer.filters);
    const tableHeight = '272px';

    const columns: ColumnType[] = [
        {
            title: t('detailSupplier.evaluation'),
            field: 'parameter',
            width: '28%',
            minWidth: '30px',
            style: ColumnStyle,
            styleHeader: ColumnStyleHeader,
        },
        {
            title: t('detailSupplier.value'),
            field: 'value',
            align: 'center',
            width: '20%',
            minWidth: '30px',
            style: { ...ColumnStyle, color: color.yellow },
            styleHeader: ColumnStyleHeader,
        },
        {
            title: t('detailSupplier.industryPosition'),
            field: 'groupscore',
            width: '52%',
            minWidth: '240px',
            style: ColumnStyle,
            styleHeader: ColumnStyleHeader,
            renderRow(_, row) {
                return <BoxPlotChart data={row} showMedium checkpoint={row.value} width={250} />;
            },
        },
    ];

    useEffect(() => {
        if (!_isEqual(prevSupplierInfo, supplierInfo)) {
            setShouldDisplayBarChart(true);
        }
        setShouldDisplayBarChart(false);
        setTableRowSelected({});
    }, [supplierInfo]);

    const handleClickRow = (row) => {
        if (!_isEqual(tableRowSelected, row)) {
            setShouldDisplayBarChart(true);
            setTableRowSelected(row);
            setBarChartData(row.companyValueList);
        }
    };

    const getTitle = (relevantScore) => {
        switch (relevantScore) {
            case 'quality_score':
                return t('supplierdetails.quality');
            case 'cost_score':
                return t('supplierdetails.cost');
            case 'delivery_score':
                return t('supplierdetails.deliveryDate');
            default:
                break;
        }
    };

    useEffect(() => {
        const getData = async () => {
            const repsonse = await DetailQcdService.getCompanyDetail({
                type: supplierInfo.conditionSearch,
                companyId: supplierInfo.companyId,
                companyIds: supplierInfo.companyIds,
                relevantScore: supplierInfo.relevantScore,
                itemCategoryGroup: dataSearch.itemCategoryGroup,
                categoryIds: dataSearch.itemCategory,
                itemNameIds: dataSearch.itemName,
            });
            const formatData = repsonse.companyDetail.map((el) => {
                return {
                    ...el,
                    value: el.value.toFixed(3),
                };
            });
            setDataTable(formatData);
        };
        getData();
    }, [supplierInfo]);

    return (
        <Box className={style.contentContainer}>
            <Typography className={style.companyName}>{`${t('detailSupplier.corporateTrustEvaluationDetails')}: ${
                supplierInfo.companyName
            }`}</Typography>
            <Box className={style.wrapTableBarChart}>
                <Typography className={style.labelScore}>
                    <span className={style.typeScore}>{getTitle(relevantScore)}</span>
                    {t('detailSupplier.score')}
                    <span className={style.score}>
                        :<span className={style.scoreWithColor}>{supplierInfo.score}</span>
                        /100
                    </span>
                </Typography>
                <Grid container wrap="nowrap" spacing={4} className={style.chartTop}>
                    <Grid className={style.table} item xs={7} md={7} style={{ padding: '16px 8px' }}>
                        <CustomTableNew
                            columns={columns}
                            data={dataTable}
                            onRowClick={handleClickRow}
                            height={tableHeight}
                            stickyHeader
                            padding="checkbox"
                        />
                    </Grid>
                    <Grid className={style.barChart} item xs={5} md={5}>
                        {shouldDisplayBarChart && (
                            <VerticalBarChartCustom data={barChartData} selected={tableRowSelected} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CorporateTrustEvaluationDetails;
