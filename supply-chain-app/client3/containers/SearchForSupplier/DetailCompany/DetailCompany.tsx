import React, { FC, useContext } from 'react';
import { Box, Grid, Link, Tooltip } from '@material-ui/core';
import TextTable from '@/components/Table/TextTable/TextTable';
import { Column } from '@material-table/core';
import { useTranslation } from 'react-i18next';
import { FaUser } from 'react-icons/fa';
import { ThemContext } from 'context/ThemeContext';
import { clsx } from 'clsx';
import { DateUtils } from 'utils/convertdate.utils';
import Image from 'next/image';
import AppRadarChart from '@/components/Chart/AppRadarChart/AppRadarChart';
import { getLabelCharts, getSupplierDetailRowConfig } from './DetailCompany.const';
import Achievement from './Achivement/Achivement';
import { useDetailCompanyStyle } from './DetailCompany.style';

interface SupplierDetailItemProps {
    dataSupplierDetail?: any[];
    mediumLine?: number[];
    handleClickRadarChart?: (index: number, data: any) => void;
    customCss: any;
    isShowMediumLine?: boolean;
    isShowLabelScore?: boolean;
    labelRada?: string;
}

export class DetailsTable {
    public id?: string;
    public item?: string;
    public detail?: string;
}

const DetailCompany: FC<SupplierDetailItemProps> = ({
    dataSupplierDetail,
    mediumLine,
    handleClickRadarChart,
    customCss,
    isShowMediumLine = false,
    isShowLabelScore = false,
    labelRada,
}) => {
    const { t } = useTranslation();
    const supplierDetailRowConfig = getSupplierDetailRowConfig(t);
    const labelCharts = getLabelCharts(t);
    const style = useDetailCompanyStyle();
    const { firstHeaderColumn, headerStyleFirst, cellStyleFirst, cellStyle } = customCss;
    const { getMode } = useContext(ThemContext);

    const cellStyleFirstCustom: React.CSSProperties = {
        boxSizing: 'border-box',
        position: 'sticky',
        fontWeight: '600',
        padding: '0px 5px',
        left: 0,
        zIndex: 2,
        borderRight: '1px solid black',
        borderBottom: '1px solid var(--silver-grey)',
        textAlign: 'center',
    };
    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '0 5px',
        fontWeight: '600',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        boxSizing: 'border-box',
        minWidth: '129px',
    };

    const tableOptions = {
        headerStyle: {
            ...headerStyle,
            background: getMode === 'light' ? 'var(--grey)' : 'var(--darkmodeItem)',
            borderBottom: getMode === 'light' ? '2px solid var(--black)' : '2px solid var(--white)',
        },
        rowStyle: () => {
            return cellStyle;
        },
        maxBodyHeight: '474px',
        overflowY: 'visible',
        sorting: false,
    };

    /**convert data and config chart*/
    const convertDataChart = (companyName, companyId, item) => {
        return {
            labels: labelCharts,
            datasets: [
                {
                    label: companyName ?? '',
                    companyId: companyId ?? '',
                    data: item ?? [],
                    fill: true,
                    backgroundColor: 'transparent',
                    borderColor: getMode === 'light' ? '#666666' : 'rgba(255, 176, 57, 1)',
                    pointBackgroundColor: 'rgba(255, 176, 57, 1)',
                    pointBorderColor: 'rgba(255, 176, 57, 1)',
                    pointHoverBackgroundColor: 'rgba(255, 176, 57, 1)',
                    pointHoverBorderColor: 'rgba(255, 176, 57, 1)',
                },
                {
                    label: t('supplierdetails.industrystandard'),
                    data: mediumLine,
                    backgroundColor: 'transparent',
                    borderColor: getMode === 'light' ? '#666666' : '#2be200',
                    borderDash: [4, 6],
                },
            ],
        };
    };

    /**convert data for Product table with object */
    const convertProductTableData = (tableData: any) => {
        const productData = tableData?.map((item) => {
            return {
                0: item.parameter,
                1: item.value,
            };
        });
        const detailsData = productData?.map((item: DetailsTable, index: string) => {
            const detailsItem = new DetailsTable();
            detailsItem.id = index;
            detailsItem.item = item[0];
            detailsItem.detail = item[1];
            return detailsItem;
        });
        return detailsData;
    };

    // header company Name
    const mappingHeaderCompany = dataSupplierDetail.map((item) => {
        return {
            title: `${item['companyName']} / ${item['companyId']}`,
            field: item['companyName'],
            sorting: false,
            cellStyle: (data, rowData) => {
                return {
                    ...cellStyle,
                    maxWidth: '380px',
                    borderBottom: [0, 1, 20].includes(rowData?.tableData?.index)
                        ? '1px solid var(--silver-grey)'
                        : 'none',
                };
            },
        };
    });

    const createHeaderTableColumns = (title = '') => {
        const columns: Array<Column<any>> = [
            {
                title: t(title),
                cellStyle: (data, rowData) => {
                    return {
                        ...cellStyleFirstCustom,
                        ...cellStyleFirst,
                        borderRightColor: getMode === 'light' ? 'var(--silver-grey)' : 'var(--white)',
                        backgroundColor: getMode === 'light' ? 'var(--white)' : 'var(--darkmodeItem)',
                        borderBottom: [0, 1, 20].includes(rowData?.tableData?.index)
                            ? '1px solid var(--silver-grey)'
                            : 'none',
                        maxWidth: '134px',
                    };
                },
                headerStyle: headerStyleFirst,
                render: (rowData) => (
                    <Grid
                        container
                        direction="column"
                        style={{ width: '130px' }}
                        className={clsx({
                            [style.underlineHeader]: rowData.tableData.index >= 2 && rowData.tableData.index <= 25,
                        })}
                    >
                        <span>{`${rowData.verticalHeader}`}</span>
                        {rowData.tableData.index === 1 ? <span>{t('')}</span> : null}
                        {rowData.tableData.index === 0 ? <span>{t('supplierdetails.score')}</span> : null}
                    </Grid>
                ),
                sorting: false,
            },
            ...mappingHeaderCompany,
        ];
        return columns;
    };

    const radarChartCellRender = (data: any) => {
        return (
            <Grid className={style.wrapperContentTable}>
                <Grid item className={style.wrapperLabel}>
                    <p className={style.textLabelOverallScore}>{t('supplierdetails.overallScore')}</p>
                    <span className={style.overallScoreLabelWrapper}>
                        <strong className={style.overallScoreLabel}>{data?.overalScore}</strong>/100
                    </span>
                </Grid>
                <Grid item className={style.customChart}>
                    <AppRadarChart
                        data={convertDataChart(data.companyName, data.companyId, [
                            data.qualityScore,
                            data.costScore,
                            data.deliveryScore,
                            data.financeScore,
                            data.environmentScore,
                            data.laborScore,
                            data.ethicsScore,
                            data.sustainableScore,
                        ])}
                        handleClickRadarChart={handleClickRadarChart}
                        label={labelRada}
                        height={'21.5rem'}
                        width={'20rem'}
                    />
                    {isShowLabelScore && (
                        <Grid item className={style.lineScore}>
                            <p className={style.textLabel}>{t('supplierdetails.score')}</p>
                        </Grid>
                    )}
                    {isShowMediumLine && (
                        <Grid item className={style.lineMedium}>
                            <p className={style.textLabel}>{t('supplierdetails.industrystandard')}</p>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        );
    };

    const achievementCellRender = (data: any) => {
        return (
            <Grid item className={style.wrapperTransactionTable}>
                <Grid container direction="column">
                    <Grid item>
                        <Achievement
                            data={convertProductTableData(data?.achivements)}
                            boxShadow
                            companyName={data?.companyName}
                            companyId={data?.companyId}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    const companyIntroductionRender = (data: any) => {
        return (
            <Grid>
                <Grid item>
                    <ul>
                        {data?.companyIntroduction
                            ? data?.companyIntroduction.split('・').map((item, index) => {
                                  if (item !== '') {
                                      return <li key={index}>{item}</li>;
                                  }
                              })
                            : ''}
                    </ul>
                </Grid>
                <Grid item className={style.imageIntroduce}>
                    <Image src={`/images/${data?.imagePath}.png`} width="260" height="150" alt="image" />
                </Grid>
            </Grid>
        );
    };

    const supplierDetailsLinkRender = (data: any) => {
        return (
            <Tooltip
                title={data?.hpLink}
                arrow
                classes={{
                    tooltip: style.tooltip,
                    arrow: style.arrowTooltip,
                }}
            >
                <Box className={style.containerLink}>
                    <Link href={data?.hpLink} color="inherit">
                        {data?.hpLink}
                    </Link>
                </Box>
            </Tooltip>
        );
    };

    const supplyDetailWordInChargeRender = (data: any) => {
        return (
            <Grid container direction="row" wrap="nowrap">
                <Grid item className={style.iconUser}>
                    <FaUser size={70} />
                </Grid>
                <Grid item className={style.chatBubble}>
                    <Box className={style.chatIcon}>
                        <Tooltip
                            title={data?.staffMessage}
                            arrow
                            classes={{
                                tooltip: style.tooltip,
                                arrow: style.arrowTooltip,
                            }}
                        >
                            <Box className={style.textOnChatBox}>
                                {data?.staffMessage.length > 50
                                    ? data?.staffMessage.substring(0, 48) + '...'
                                    : data?.staffMessage}
                            </Box>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        );
    };

    const cellDetailRender = (verticalHeader: string, cellDetail: any) => {
        switch (verticalHeader) {
            case t('supplierdetails.company'):
                return cellDetail && radarChartCellRender(cellDetail);
            case t('supplierdetails.tableDetail'):
                return cellDetail && achievementCellRender(cellDetail);
            case t('supplierdetails.companyIntroduction'):
                return cellDetail && companyIntroductionRender(cellDetail);
            case t('supplierdetails.link'):
                return cellDetail && supplierDetailsLinkRender(cellDetail);
            case t('supplierdetails.aWordInCharge'):
                return cellDetail && supplyDetailWordInChargeRender(cellDetail);
            case t('supplierdetails.updateDate'):
                return cellDetail?.updateDate && DateUtils.toDotString(cellDetail.updateDate as string);
            case t('supplierdetails.updateYear'):
                return cellDetail?.updateYear ?? '';
            case t('supplierdetails.headquartersLocation'):
                return cellDetail?.headquartersLocation ?? '';
            case t('supplierdetails.capitalRatio'):
                return cellDetail?.capitalRatio ?? '';
            case t('supplierdetails.industryCode'):
                return cellDetail?.businessTypeCode ?? '';
            case t('supplierdetails.numberOfEmployees'):
                return cellDetail?.numberOfEmployees ?? '';
            case t('supplierdetails.established'):
                return cellDetail?.establishmentYear ?? '';
            case t('supplierdetails.customer'):
                return cellDetail?.regularCustomer ?? '';
            case t('supplierdetails.qualityScore'):
                return cellDetail?.qualityScore ?? '';
            case t('supplierdetails.cost'):
                return cellDetail?.costScore ?? '';
            case t('supplierdetails.capital'):
                return cellDetail?.capital ?? '';
            case t('supplierdetails.representative'):
                return cellDetail?.representative ?? '';
            case t('supplierdetails.sales'):
                return cellDetail?.sales ?? '';
            case t('supplierdetails.deliveryScore'):
                return cellDetail?.deliveryScore ?? '';
            case t('searchForSupplier.financeScore'):
                return cellDetail?.financeScore ?? '';
            case t('detailSupplier.environment'):
                return cellDetail?.environmentScore ?? '';
            case t('supplierdetails.ethicsScore'):
                return cellDetail?.ethicsScore ?? '';
            case t('supplierdetails.laborScore'):
                return cellDetail?.laborScore ?? '';
            case t('supplierdetails.sustainableScore'):
                return cellDetail?.sustainableScore ?? '';
            default:
                return '';
        }
    };

    const getSupplierDetailRows = () => {
        return supplierDetailRowConfig.map((row) => {
            const { verticalHeader } = row;
            const companyColumnsDetail = dataSupplierDetail.map((companyDetail) => {
                return { [companyDetail['companyName']]: cellDetailRender(verticalHeader, companyDetail) ?? '' };
            });
            const rowDetail = Object.assign({ verticalHeader }, ...(companyColumnsDetail ?? []));
            return rowDetail;
        });
    };

    return (
        <Grid className={dataSupplierDetail.length > 2 ? style.mainContent : style.mainContent2}>
            <TextTable
                boxShadow={getMode === 'light'}
                options={tableOptions}
                columns={createHeaderTableColumns(firstHeaderColumn?.title)}
                data={getSupplierDetailRows()}
            />
        </Grid>
    );
};
export default DetailCompany;
